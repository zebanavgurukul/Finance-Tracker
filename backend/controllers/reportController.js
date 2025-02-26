const Transaction = require('../models/Transaction');

exports.getReports = async (req, res) => {
    try {
        const { type } = req.query;
        const userId = req.user.userId;

        let startDate;
        const today = new Date();

        if (type === "daily") {
            startDate = new Date(today.setHours(0, 0, 0, 0));
        } else if (type === "weekly") {
            startDate = new Date(today.setDate(today.getDate() - 7));
        } else if (type === "monthly") {
            startDate = new Date(today.setMonth(today.getMonth() - 1));
        } else {
            return res.status(400).json({ error: "Invalid report type" });
        }

        const transactions = await Transaction.find({ userId, date: { $gte: startDate } });

        const totalIncome = transactions
            .filter(t => t.type.toLowerCase() === "income")
            .reduce((sum, t) => sum + t.amount, 0);

        const totalExpense = transactions
            .filter(t => t.type.toLowerCase() === "expense")
            .reduce((sum, t) => sum + t.amount, 0);

        res.json({ totalIncome, totalExpense, savings: totalIncome - totalExpense });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
