const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  walletAddress: {
    type: String,
    required: true,
    unique: true,
  },
  totalAmount: {
    type: Number,
    required: true,
    default: 0,
  },
  transactions: [
    {
      type: { type: String, enum: ['deposit', 'withdraw'], required: true },
      amount: { type: Number, required: true },
      date: { type: Date, default: Date.now },
      vaultName: { type: String, required: true }, // Ensure proper spelling and consistency
    }
  ],
});


module.exports = mongoose.model('Transaction', TransactionSchema);
