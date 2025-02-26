const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    type: String,
    amount: Number,
    category: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', TransactionSchema);
