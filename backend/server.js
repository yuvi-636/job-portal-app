const path = require("path");

const express = require("express");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const jobRoutes = require("./routes/jobRoutes");
const initSocket = require("./socket/socket");

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// 🔥 Initialize socket and attach io
const io = initSocket(server);
app.set("io", io);

// API Routes
app.use("/api/jobs", jobRoutes);

// ✅ SERVE FRONTEND (IMPORTANT FOR DEPLOYMENT)
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("/", (req, res) => {
  // res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
  res.send("API Running");
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on ${PORT}`));