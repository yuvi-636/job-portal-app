const express = require("express");
const router = express.Router();

const {
  getJobs,
  addJob,
  addMultipleJobs,
  deleteJob,
} = require("../controllers/jobController");

// ✅ TEST ROUTE (IMPORTANT)
router.get("/test", (req, res) => {
  res.json({ message: "jobRoutes working ✅" });
});

// ✅ MAIN ROUTES
router.get("/", getJobs);
router.post("/", addJob);
router.post("/bulk", addMultipleJobs);
router.delete("/:id", deleteJob);

module.exports = router;