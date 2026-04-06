const path = require("path");
const express = require("express");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const jobRoutes = require("./routes/jobRoutes");

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// ✅ TEST ROUTE (VERY IMPORTANT)
app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

// ✅ JOB ROUTES
app.use("/api/jobs", jobRoutes);

// Start server
const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});