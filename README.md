# Finance Tracker - Personal Expense Management System
Finance Tracker is a simple and intuitive web application designed to help users manage their personal finances efficiently. Users can register, log in, add income and expenses, and generate insightful financial reports (daily, weekly, and monthly).

## Features:
**User Signup & Login** – Secure authentication using JWT tokens and password hashing with bcrypt.js
**Transactions** – Add, view, and manage income and expenses
**Report Generation** – Generate daily, weekly, and monthly financial insights

## Technologies Used:
**Frontend**: HTML, CSS, JavaScript
**Backend**: Node.js, Express.js
**Database**: MongoDB
**Authentication**: JWT (JSON Web Tokens)
**Security**: bcrypt.js for password hashing

## Prerequisites:
Before running this application, ensure you have the following installed:

**Node.js** (v14.x or higher)
**MongoDB** (Community Edition)

## Configuration
Create a .env file in the project root with the following variables:
- **JWT_SECRET**=*********
- **MONGO_URI**=****
- **PORT**=****

## Project Structure

**backend/**
│── config/         # Database connection setup
│── controllers/    # API logic (authentication, transactions, reports)
│── middlewares/    # JWT authorization middleware
│── models/        # Mongoose models (Users, Transactions)
│── routes/        # API route definitions
│── .env           # Environment variables (PORT, MONGO_URI, JWT_SECRET)
│── server.js      # Main application server setup
│
frontend/
│── assets/        # Stores images and other static assets
│── index.html     # Main HTML file
│── styles.css     # CSS styling
│── script.js      # JavaScript logic
