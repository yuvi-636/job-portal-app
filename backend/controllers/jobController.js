const Job = require("../models/Job");
const fetch = require("node-fetch");

// ✅ GET ALL JOBS
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
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
    res.status(500).json({ message: "Error adding job" });
  }
};

// ✅ DELETE JOB
exports.deleteJob = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Job deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting job" });
  }
};

// 🔥 FIXED EXTERNAL JOBS (NO CRASH VERSION)
exports.getExternalJobs = async (req, res) => {
  try {
    const city = req.query.city || "india";
    const query = `${city} software developer india`;

    console.log("🔍 Fetching jobs for:", query);

    // 🚨 CHECK KEY
    if (!process.env.RAPIDAPI_KEY) {
      console.log("❌ RAPIDAPI_KEY missing");
      return res.json([]); // don't crash
    }

    const response = await fetch(
      `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(
        query
      )}&num_pages=1`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
          "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
        },
      }
    );

    const data = await response.json();

    console.log("✅ API RESPONSE RECEIVED");

    // 🚨 SAFE CHECK
    if (!data || !data.data) {
      console.log("❌ Invalid API response:", data);
      return res.json([]);
    }

    const jobs = data.data;

    const formattedJobs = jobs.map((job) => ({
      _id: job.job_id,
      title: job.job_title,
      company: job.employer_name,
      location: job.job_city || job.job_location || "India",
      applyLink: job.job_apply_link,
      experience: "fresher",
      type: job.job_employment_type || "onsite",
      salary: job.job_salary || "Not disclosed",
      description: job.job_description,
      source: "external",
    }));

    res.json(formattedJobs);

  } catch (error) {
    console.error("❌ External API ERROR:", error.message);
    res.json([]); // ✅ NEVER CRASH
  }
};