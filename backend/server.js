const express = require("express");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const jobRoutes = require("./routes/jobRoutes");

dotenv.config();
connectDB();

const app = express();

// 🔥 FORCE CORS (NO DEPENDENCY ON cors() PACKAGE)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  next();
});

app.use(express.json());

// ✅ ROUTES
app.use("/api/jobs", jobRoutes);

// ✅ TEST
app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});