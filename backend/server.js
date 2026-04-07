const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// ✅ SIMPLE CORS (REMOVE COMPLEX LOGIC)
app.use(cors());
app.use(express.json());

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

// ✅ TEMP TEST ROUTE (VERY IMPORTANT)
app.get("/api/test", (req, res) => {
  res.json({ message: "API route working ✅" });
});

// ✅ IMPORT ROUTES
const jobRoutes = require("./routes/jobRoutes");

// ✅ USE ROUTES
app.use("/api/jobs", jobRoutes);

// ✅ DEBUG ROUTE LIST
app._router.stack.forEach((r) => {
  if (r.route && r.route.path) {
    console.log("Route:", r.route.path);
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});