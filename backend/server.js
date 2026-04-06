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

// ✅ FIXED CORS (IMPORTANT)
const allowedOrigins = [
  "http://localhost:3000",
  "https://job-portal-frontend-7n9u.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// ✅ TEST ROUTE
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