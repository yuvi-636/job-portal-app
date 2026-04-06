const Job = require("../models/Job");
const fetch = require("node-fetch");

// 🔹 Get all jobs (DB)
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};

// 🔹 Get job by ID
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(job);
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({ message: "Failed to fetch job" });
  }
};

// 🔹 Add job
const addJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);

    const io = req.app.get("io");
    if (io) io.emit("newJob", job);

    res.status(201).json(job);
  } catch (error) {
    console.error("Error adding job:", error);
    res.status(500).json({ message: "Failed to add job" });
  }
};

// 🔹 Bulk insert
const addMultipleJobs = async (req, res) => {
  try {
    const jobs = await Job.insertMany(req.body);

    const io = req.app.get("io");
    if (io) io.emit("bulkJobs", jobs);

    res.status(201).json(jobs);
  } catch (error) {
    console.error("Error adding jobs:", error);
    res.status(500).json({ message: "Failed to add jobs" });
  }
};

// 🔹 Delete job
const deleteJob = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);

    const io = req.app.get("io");
    if (io) io.emit("deleteJob", req.params.id);

    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ message: "Failed to delete job" });
  }
};

// 🔥 NEW: External jobs API
const getExternalJobs = async (req, res) => {
  try {
    const response = await fetch(
      "https://jsearch.p.rapidapi.com/search?query=software%20developer%20india&page=1",
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
          "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
        },
      }
    );

    const data = await response.json();

    const formattedJobs = data.data.map((job) => ({
      _id: job.job_id,
      title: job.job_title,
      company: job.employer_name,
      location: job.job_city || "India",
      applyLink: job.job_apply_link,
      experience: "fresher",
      type: job.job_employment_type || "onsite",
      salary: job.job_salary || "Not disclosed",
      description: job.job_description,
      source: "external",
    }));

    res.json(formattedJobs);
  } catch (error) {
    console.error("External API error:", error);
    res.status(500).json({ message: "Failed to fetch external jobs" });
  }
};

module.exports = {
  getJobs,
  getJobById,
  addJob,
  addMultipleJobs,
  deleteJob,
  getExternalJobs,
};