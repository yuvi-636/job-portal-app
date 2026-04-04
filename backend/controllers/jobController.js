const Job = require("../models/Job");

// 🔹 Get all jobs
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};

// 🔹 Get job by ID ✅ (NEW)
const getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(job);
  } catch (error) {
    console.error("Error fetching job by ID:", error);
    res.status(500).json({ message: "Failed to fetch job" });
  }
};

// 🔹 Add single job
const addJob = async (req, res) => {
  try {
    const { title, company, location, applyLink, experience, description } = req.body;

    if (!title || !company || !location || !applyLink) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const job = await Job.create({
      title,
      company,
      location,
      applyLink,
      experience: experience || "fresher", // ✅ default
      description: description || "", // ✅ default
    });

    const io = req.app.get("io");
    if (io) io.emit("newJob", job);

    res.status(201).json(job);
  } catch (error) {
    console.error("Error adding job:", error);
    res.status(500).json({ message: "Failed to add job" });
  }
};

// 🔹 Add multiple jobs (bulk insert)
const addMultipleJobs = async (req, res) => {
  try {
    const jobsData = req.body;

    if (!Array.isArray(jobsData) || jobsData.length === 0) {
      return res.status(400).json({ message: "Provide an array of jobs" });
    }

    const jobs = await Job.insertMany(jobsData);

    // 🔥 Emit all jobs at once
    const io = req.app.get("io");
    if (io) io.emit("bulkJobs", jobs);

    res.status(201).json(jobs);
  } catch (error) {
    console.error("Error adding multiple jobs:", error);
    res.status(500).json({ message: "Failed to add jobs" });
  }
};

// 🔹 Delete job
const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findByIdAndDelete(id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // 🔥 Emit delete event
    const io = req.app.get("io");
    if (io) io.emit("deleteJob", id);

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ message: "Failed to delete job" });
  }
};

module.exports = {
  getJobs,
  getJobById, 
  addJob,
  addMultipleJobs,
  deleteJob,
};