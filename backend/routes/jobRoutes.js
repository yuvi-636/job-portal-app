const Job = require("../models/Job");

// ✅ GET ALL JOBS
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ ADD JOB
const addJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (err) {
    console.error("Error adding job:", err);
    res.status(500).json({ message: "Failed to add job" });
  }
};

// ✅ BULK ADD
const addMultipleJobs = async (req, res) => {
  try {
    const jobs = await Job.insertMany(req.body);
    res.status(201).json(jobs);
  } catch (err) {
    console.error("Bulk insert error:", err);
    res.status(500).json({ message: "Failed to add jobs" });
  }
};

// ✅ DELETE JOB
const deleteJob = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Failed to delete job" });
  }
};

module.exports = {
  getJobs,
  addJob,
  addMultipleJobs,
  deleteJob,
};