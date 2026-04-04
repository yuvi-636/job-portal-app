import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  // ✅ Wrapped in useCallback (fixes warning properly)
  const fetchJob = useCallback(async () => {
    try {
      const res = await axios.get(`/api/jobs/${id}`);
      setJob(res.data);
    } catch (err) {
      console.error("Error fetching job:", err);
    }
  }, [id]);

  // ✅ Dependency is now correct
  useEffect(() => {
    fetchJob();
  }, [fetchJob]);

  if (!job) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading job details...
      </div>
    );
  }

  return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 p-6">
  <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8 border border-gray-100">

    <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
    <p className="text-lg text-gray-700 mt-1">{job.company}</p>

    <p className="text-sm text-gray-500 mt-2">
      📍 {job.location}
    </p>

    <p className="text-xs text-gray-400 mt-2">
      Posted on: {new Date(job.createdAt).toLocaleDateString()}
    </p>

    <div className="flex gap-2 mt-4">
      <span className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full">
        {job.experience || "Fresher"}
      </span>
    </div>

    <div className="mt-6">
      <h2 className="text-xl font-semibold">Job Description</h2>
      <p className="text-gray-600 mt-2 leading-relaxed">
        {job.description || "No description available."}
      </p>
    </div>

    <a
      href={job.applyLink}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
    >
      Apply Now →
    </a>
  </div>
</div>
  );
};

export default JobDetails;