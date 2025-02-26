const express = require('express');

const { getReports } = require('../controllers/reportController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, getReports);

module.exports = router;

