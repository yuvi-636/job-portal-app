const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const jobRoutes = require("./routes/jobRoutes");

dotenv.config();
connectDB();

const app = express();

// ✅ CORS MUST BE FIRST
app.use(cors());

// ✅ THEN JSON
app.use(express.json());

// ✅ TEST
app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

// ✅ ROUTES
app.use("/api/jobs", jobRoutes);

// ✅ ERROR HANDLER (optional but useful)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Server error" });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});