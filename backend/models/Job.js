const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  company: {
    type: String,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },

  applyLink: {
    type: String,
    required: true,
  },

  experience: {
    type: String,
    default: "fresher", // ✅ important for filter
  },

  type: {
    type: String, // remote / onsite / hybrid
  },

  salary: {
    type: String,
  },

  description: {
    type: String, // ✅ for JobDetails page
  },

  skills: [
    {
      type: String, // ["React", "Node"]
    }
  ],

  postedBy: {
    type: String,
  },

  deadline: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Job", jobSchema);