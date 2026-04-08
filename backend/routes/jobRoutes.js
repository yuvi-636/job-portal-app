const express = require("express");
const router = express.Router();

const {
  getJobs,
  getJobById,
  addJob,
  deleteJob,
  getExternalJobs,
} = require("../controllers/jobController");

// ✅ ROUTES
router.get("/", getJobs);
router.get("/external", getExternalJobs); // 🔥 IMPORTANT
router.get("/:id", getJobById);
router.post("/", addJob);
router.delete("/:id", deleteJob);

module.exports = router;