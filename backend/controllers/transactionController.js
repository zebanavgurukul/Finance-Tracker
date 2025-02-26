const Transaction = require('../models/Transaction');

exports.addTransaction = async (req, res) => {
    try {
        const transaction = new Transaction({ ...req.body, userId: req.user.userId });
        await transaction.save();
        res.status(201).json(transaction);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.user.userId });
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
