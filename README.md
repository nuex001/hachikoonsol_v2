# Hachikoonsol Server

This simple Node.js service fetches a leaderboard from the Helius API, stores it in MongoDB, and exposes it over an HTTP API.

## Setup

1. Install dependencies:

   ```bash
   cd server
   npm install
   ```

2. Create a `.env` file (an example is included) and set the `MONGO_URI` and optionally `HELIUS_URL` and `PORT`.

3. Start the server:

   ```bash
   npm start
   ```

   The service will connect to MongoDB, perform an initial leaderboard fetch, and then refresh every 10 minutes. It also refreshes automatically if someone requests `/leaderboard` and the stored data is older than 10 minutes.

## Endpoints

- `GET /leaderboard` – returns the most recent leaderboard that was saved to MongoDB.
- `GET /leaderboard/refresh` – triggers an immediate fetch from Helius and updates the database (may be rate limited).

## Data model

Leaderboard documents in the `leaderboards` collection look like:

```json
{
  "entries": [
    {
      "wallet": "...",
      "amount": 123.45,
      "tokenAccount": "...",
      "holdingDays": 10,
      "firstTxDate": "2025-09-01"
    }
    // ... up to 100 entries
  ],
  "fetchedAt": "2026-03-06T12:34:56.789Z"
}
```
