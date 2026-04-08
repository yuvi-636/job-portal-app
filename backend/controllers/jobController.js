const Job = require("../models/Job");
const axios = require("axios");

// ✅ GET ALL JOBS (MongoDB)
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    console.error("DB Fetch Error:", err.message);
    res.status(500).json({ message: "Error fetching jobs" });
  }
};

// ✅ GET SINGLE JOB
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job);
  } catch (err) {
    console.error("Get Job Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ ADD JOB
exports.addJob = async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    console.error("Add Job Error:", err.message);
    res.status(500).json({ message: "Error adding job" });
  }
};

// ✅ DELETE JOB
exports.deleteJob = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Job deleted" });
  } catch (err) {
    console.error("Delete Job Error:", err.message);
    res.status(500).json({ message: "Error deleting job" });
  }
};

// 🔥 GET EXTERNAL JOBS (RapidAPI - FIXED)
exports.getExternalJobs = async (req, res) => {
  try {
    const response = await axios.get(
      "https://jsearch.p.rapidapi.com/search",
      {
        params: {
          query: "developer jobs",
          page: "1",
          num_pages: "1",
        },
        headers: {
          "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
          "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
        },
      }
    );

    const jobs = response.data?.data || [];

    // ✅ Format for frontend
    const formattedJobs = jobs.map((job) => ({
      title: job.job_title || "No Title",
      company: job.employer_name || "Unknown",
      location: job.job_city || "Remote",
      applyLink: job.job_apply_link || "#",
      experience: "fresher",
      type: "remote",
      salary: "Not specified",
    }));

    res.json(formattedJobs);
  } catch (err) {
    console.error("❌ External API Error FULL:", err.response?.data || err.message);

    // 🔥 IMPORTANT: don't crash frontend
    res.json([]); // return empty array instead of 500
  }
};