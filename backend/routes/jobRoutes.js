const express = require("express");
const router = express.Router();

// ✅ Import ALL controllers together (clean)
const {
  getJobs,
  getJobById,
  addJob,
  deleteJob,
  getExternalJobs,
} = require("../controllers/jobController");

// ✅ ROUTES
router.get("/", getJobs);
router.get("/external", getExternalJobs); // 🔥 must be BEFORE :id
router.get("/:id", getJobById);
router.post("/", addJob);
router.delete("/:id", deleteJob);

module.exports = router;