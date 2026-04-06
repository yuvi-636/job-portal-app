const express = require("express");
const router = express.Router();

const {
  getJobs,
  addJob,
  addMultipleJobs,
  deleteJob,
} = require("../controllers/jobController");

// ✅ Routes
router.get("/", getJobs);
router.post("/", addJob);
router.post("/bulk", addMultipleJobs);
router.delete("/:id", deleteJob);

module.exports = router;