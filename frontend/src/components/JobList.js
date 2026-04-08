import { useEffect, useState } from "react";
import JobCard from "./JobCard";

const API = "https://job-portal-backend-ax7n.onrender.com";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [view, setView] = useState("list");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // ✅ 1. Fetch DB jobs first
        const res = await fetch(`${API}/api/jobs`);
        const data = await res.json();

        setJobs(data);
        setLoading(false);

        // ✅ 2. Fetch external jobs separately (non-blocking)
        try {
          const externalRes = await fetch(`${API}/api/jobs/external`);

          if (externalRes.ok) {
            const externalData = await externalRes.json();

            // merge jobs
            setJobs((prev) => [...prev, ...externalData]);
          }
        } catch (err) {
          console.log("External jobs failed (ignored)");
        }

      } catch (err) {
        console.error("Main API error:", err);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // 🔍 FILTER
  const filteredJobs = jobs.filter((job) => {
    const searchText = search.toLowerCase();
    const locationText = location.toLowerCase();

    return (
      ((job.title || "").toLowerCase().includes(searchText) ||
        (job.company || "").toLowerCase().includes(searchText)) &&
      (location === "" ||
        (job.location || "").toLowerCase().includes(locationText))
    );
  });

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-500 animate-pulse">
        Loading jobs...
      </p>
    );
  }

  return (
    <div>

      {/* SEARCH + LOCATION */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col md:flex-row gap-3">

          <input
            type="text"
            placeholder="Search jobs or companies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="text"
            placeholder="Location (e.g. Bangalore)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full md:w-64 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* VIEW TOGGLE */}
      <div className="flex justify-end mb-4 gap-2">
        <button
          onClick={() => setView("list")}
          className={`px-3 py-1.5 rounded-lg text-sm ${
            view === "list"
              ? "bg-gray-900 text-white"
              : "bg-gray-200"
          }`}
        >
          List
        </button>

        <button
          onClick={() => setView("grid")}
          className={`px-3 py-1.5 rounded-lg text-sm ${
            view === "grid"
              ? "bg-gray-900 text-white"
              : "bg-gray-200"
          }`}
        >
          Grid
        </button>
      </div>

      {/* JOB LIST */}
      <div
        className={
          view === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            : "flex flex-col gap-4"
        }
      >
        {filteredJobs.length === 0 ? (
          <p className="text-center text-gray-500">
            No jobs found
          </p>
        ) : (
          filteredJobs.map((job) => (
            <JobCard key={job._id || job.id} job={job} />
          ))
        )}
      </div>
    </div>
  );
};

export default JobList;