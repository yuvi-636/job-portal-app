const express = require("express");
const router = express.Router();

const {
  getJobs,
  getJobById,   
  addJob,
  addMultipleJobs,
  deleteJob,
} = require("../controllers/jobController");

// 🔹 Order matters
router.get("/", getJobs);
router.get("/:id", getJobById);  // ✅ ADD THIS

router.post("/", addJob);
router.post("/bulk", addMultipleJobs);
router.delete("/:id", deleteJob);

module.exports = router;