const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const jobRoutes = require("./routes/jobRoutes");

dotenv.config();
connectDB();

const app = express();

//
// ✅ 1. FORCE CORS HEADERS (GUARANTEED FIX)
//
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");

  // ✅ Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

//
// ✅ 2. ALSO USE cors() (SAFE BACKUP)
//
app.use(cors());

//
// ✅ 3. PARSE JSON
//
app.use(express.json());

//
// ✅ 4. ROUTES
//
app.use("/api/jobs", jobRoutes);

//
// ✅ 5. TEST ROUTE
//
app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

//
// ✅ 6. START SERVER
//
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});