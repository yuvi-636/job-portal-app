const Job = require("../models/Job");

const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching jobs" });
  }
};

const addJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: "Error adding job" });
  }
};

const addMultipleJobs = async (req, res) => {
  try {
    const jobs = await Job.insertMany(req.body);
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Error bulk insert" });
  }
};

const deleteJob = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting" });
  }
};

module.exports = {
  getJobs,
  addJob,
  addMultipleJobs,
  deleteJob,
};