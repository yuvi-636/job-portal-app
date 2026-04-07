const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const jobRoutes = require("./routes/jobRoutes");

dotenv.config();
connectDB();

const app = express();

// ✅ MUST BE FIRST (VERY IMPORTANT)
app.use(cors({
  origin: "*",   // 🔥 allow all (fixes your issue instantly)
  methods: ["GET", "POST", "DELETE"],
}));

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









// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");

// const connectDB = require("./config/db");
// const jobRoutes = require("./routes/jobRoutes"); // ✅ IMPORT FIRST

// dotenv.config();
// connectDB();

// const app = express();

// // ✅ MIDDLEWARE FIRST
// app.use(cors());
// app.use(express.json());

// // ✅ TEST ROUTES
// app.get("/", (req, res) => {
//   res.send("API is working 🚀");
// });

// app.get("/api/test", (req, res) => {
//   res.json({ message: "API route working ✅" });
// });

// // ✅ ACTUAL ROUTES (ONLY ONCE)
// app.use("/api/jobs", jobRoutes);

// const PORT = process.env.PORT || 10000;
// app.listen(PORT, () => {
//   console.log(`Server running on ${PORT}`);
// });