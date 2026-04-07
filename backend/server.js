const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const jobRoutes = require("./routes/jobRoutes");

dotenv.config();
connectDB();

const app = express();

// ✅ SIMPLE + CORRECT CORS (NO CUSTOM HEADERS)
app.use(cors());

// ✅ IMPORTANT: handle preflight
app.options("*", cors());

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