const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  wallet: { type: String, required: true },
  amount: { type: Number, required: true },
  tokenAccount: { type: String, required: true },
  holdingDays: { type: Number },
  firstTxDate: { type: String }
}, { _id: false });

const leaderboardSchema = new mongoose.Schema({
  entries: [entrySchema],
  fetchedAt: { type: Date, default: Date.now }
});

const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);

module.exports = Leaderboard;
