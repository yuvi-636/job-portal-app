const express = require("express");
const router = express.Router();

const {
  getJobs,
  getJobById,
  addJob,
  deleteJob,
} = require("../controllers/jobController");

// ✅ ROUTES
router.get("/", getJobs);
router.get("/:id", getJobById); // 🔥 IMPORTANT
router.post("/", addJob);
router.delete("/:id", deleteJob);

module.exports = router;