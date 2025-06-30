require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const reportRoutes = require('./routes/reportRoutes');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to database
connectDB();

app.get("/", (req, res) => {
  res.send("🎉 Welcome to the Finance Tracker API!");
});

app.use('/auth', authRoutes);
app.use('/transactions', transactionRoutes);
app.use('/reports', reportRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
