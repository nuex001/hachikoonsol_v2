// server/index.js

// Basic dependencies
const express = require("express");
const axios = require("axios");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// load environment variables from .env if present
dotenv.config();

const Leaderboard = require("./models/Leaderboard");

// configuration
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const HELIUS_URL = process.env.HELIUS_URL;

// Express setup
const app = express();
app.use(
  cors({
    origin: ['https://hachikoonsol.com', 
        // "http://localhost:5173"
    ], 
  }),
);

// helper utilities
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const batchProcess = async (items, batchSize, delayMs, processor) => {
  const results = [];
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(processor));
    results.push(...batchResults);
    if (i + batchSize < items.length) {
      await delay(delayMs);
    }
  }
  return results;
};

// core logic to load the leaderboard from Helius
const loadLeaderboard = async () => {
  // 1. Get all token accounts
  const resp = await axios.post(HELIUS_URL, {
    jsonrpc: "2.0",
    id: 1,
    method: "getProgramAccounts",
    params: [
      "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
      {
        filters: [
          { dataSize: 165 },
          {
            memcmp: {
              offset: 0,
              bytes: "AsrtqZiNYt3c6nNCtkj7abUrVc8APsFF37Wffq45rkVh",
            },
          },
        ],
        encoding: "jsonParsed",
      },
    ],
  });

  // 2. Sort by amount and take top 100
  const allHolders = resp.data.result
    .map((account) => ({
      wallet: account.account.data.parsed.info.owner,
      amount: account.account.data.parsed.info.tokenAmount.uiAmount,
      tokenAccount: account.pubkey,
    }))
    .sort((a, b) => b.amount - a.amount)
    .slice(1, 101);

  // 3. Process in batches of 5, with 500ms between batches to avoid rate limiting
  const holdersWithDates = await batchProcess(
    allHolders,
    5, // batch size — tune down if still hitting 429s
    500, // ms between batches — tune up if still hitting 429s
    async (holder) => {
      try {
        const sigResp = await axios.post(HELIUS_URL, {
          jsonrpc: "2.0",
          id: 1,
          method: "getSignaturesForAddress",
          params: [holder.tokenAccount, { limit: 1000 }],
        });

        const signatures = sigResp.data.result;

        if (!signatures || signatures.length === 0) {
          return { ...holder, holdingDays: null, firstTxDate: null };
        }

        const oldestSig = signatures[signatures.length - 1];
        const firstTxTimestamp = oldestSig.blockTime;

        const now = Math.floor(Date.now() / 1000);
        const holdingDays = Math.floor((now - firstTxTimestamp) / 86400);
        const firstTxDate = new Date(
          firstTxTimestamp * 1000,
        ).toLocaleDateString();

        return { ...holder, holdingDays, firstTxDate };
      } catch (err) {
        console.error(`Failed to fetch tx for ${holder.tokenAccount}:`, err);
        return { ...holder, holdingDays: null, firstTxDate: null };
      }
    },
  );

  // sort by holdingDays descending, nulls/undefined last
  holdersWithDates.sort((a, b) => {
    const da = a.holdingDays == null ? -1 : a.holdingDays;
    const db = b.holdingDays == null ? -1 : b.holdingDays;
    return db - da;
  });

  return holdersWithDates;
};

// save the results to the database (overwriting previous leaderboard)
const updateLeaderboard = async () => {
  try {
    const data = await loadLeaderboard();
    // upsert a single document so we always have just one leaderboard
    await Leaderboard.findOneAndUpdate(
      {},
      { entries: data, fetchedAt: new Date() },
      { upsert: true, new: true },
    );
    console.log("Leaderboard updated with", data.length, "entries");
  } catch (err) {
    console.error("Error updating leaderboard:", err);
  }
};

app.get("/leaderboard", async (req, res) => {
  try {
    let doc = await Leaderboard.findOne().lean();
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    if (!doc || doc.fetchedAt < tenMinutesAgo) {
      // data is stale or nonexistent; refresh synchronously
      await updateLeaderboard();
      doc = await Leaderboard.findOne().lean();
    }
    if (!doc) {
      return res.status(404).json({ error: "no leaderboard data available" });
    }
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: "internal error" });
  }
});

app.get("/leaderboard/refresh", async (req, res) => {
  try {
    let doc = await Leaderboard.findOne().lean();
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);

    if (!doc || doc.fetchedAt < tenMinutesAgo) {
      await updateLeaderboard();
      res.json({ status: "started refresh" });
    } else {
      // 1. Get the time in milliseconds
      const lastFetched = new Date(doc.fetchedAt).getTime();
      // 2. Add 10 minutes (600,000ms)
      const nextAvailable = new Date(lastFetched + 10 * 60 * 1000);

      res.json({
        status: "skipped",
        refreshTime: nextAvailable.toISOString(), // Send as ISO string
      });
    }
  } catch (err) {
    res.status(500).json({ error: "refresh failed" });
  }
});

app.get("/", (req, res) => {
  res.json({ status: "ok" });
});
// connect to Mongo and start listening
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    // immediately update once
    updateLeaderboard();
    // refresh every 10 minutes
    setInterval(updateLeaderboard, 10 * 60 * 1000);
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
