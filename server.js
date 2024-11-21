const express = require("express");
const cors = require("cors");
const connectDB = require("./database/db");
const expenseRoutes = require("./routes/expenses");

const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/expenses", expenseRoutes);

// Start server
app.listen(5000, () => console.log("Server running on http://localhost:5000"));
