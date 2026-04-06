import { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "./JobCard";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [view, setView] = useState("list");
  const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchJobs = async () => {
//   try {
//     const [localRes, externalRes] = await Promise.all([
//       axios.get(`${API}/api/jobs`),
//       axios.get(`${API}/api/jobs/external`)
//     ]);

//     const combinedJobs = [
//       ...localRes.data,
//       ...externalRes.data
//     ];

//     setJobs(combinedJobs);
//   } catch (err) {
//     console.error(err);
//   } finally {
//     setLoading(false);
//   }
// };

//     fetchJobs();
//   }, []);

useEffect(() => {
  const fetchJobs = async () => {
    try {
      // ✅ Fetch DB jobs
      const res = await fetch("https://job-portal-backend-1-ugyh.onrender.com/api/jobs");
      const data = await res.json();

      let externalData = [];

      try {
        // ✅ Try external API (optional)
        const externalRes = await fetch(
          "https://job-portal-backend-1-ugyh.onrender.com/api/jobs/external"
        );
        externalData = await externalRes.json();
      } catch (err) {
        console.log("External API failed, using DB only");
      }

      // ✅ Always show at least DB jobs
      setJobs([...data, ...externalData]);

    } catch (err) {
      console.error("Main API failed:", err);
    }
  };

  fetchJobs();
}, []);
  // 🔍 FILTER LOGIC (FINAL FIXED)
  const filteredJobs = jobs.filter((job) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      (job.title || "").toLowerCase().includes(searchText) ||
      (job.company || "").toLowerCase().includes(searchText);

    const matchesFilter =
      filter === "" ||
      (job.experience || "fresher").toLowerCase() === filter.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  // ⏳ LOADING STATE
  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-500 animate-pulse">
        Loading jobs...
      </p>
    );
  }

  return (
    <div>
      {/* 🔍 SEARCH + FILTER */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 flex flex-col md:flex-row gap-3 items-center">
        
        <div className="w-full md:flex-1">
          <SearchBar search={search} setSearch={setSearch} />
        </div>

        <div className="w-full md:w-56">
          <FilterBar filter={filter} setFilter={setFilter} />
        </div>
      </div>

      {/* 🔘 VIEW TOGGLE */}
      <div className="flex justify-end mb-4 gap-2">
        <button
          onClick={() => setView("list")}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
            view === "list"
              ? "bg-gray-900 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          📋 List
        </button>

        <button
          onClick={() => setView("grid")}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
            view === "grid"
              ? "bg-gray-900 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          🧩 Grid
        </button>
      </div>

      {/* 🧾 JOB LIST */}
      <div
        className={
          view === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4"
            : "flex flex-col gap-4 mt-4"
        }
      >
        {filteredJobs.length === 0 ? (
          <p className="text-center text-gray-500">No jobs found</p>
        ) : (
          filteredJobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))
        )}
      </div>
    </div>
  );
};

export default JobList;