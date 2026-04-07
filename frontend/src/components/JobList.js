import { useEffect, useState } from "react";
import JobCard from "./JobCard";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";

// ✅ ONLY THIS (NO ?v=2 HERE)
const API = "https://job-portal-backend-1-ugyh.onrender.com";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [view, setView] = useState("list");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      console.log("🔥 FETCH STARTED");

      try {
        const res = await fetch(`${API}/api/jobs`);

        console.log("🔥 STATUS:", res.status);

        if (!res.ok) {
          throw new Error("API failed");
        }

        const data = await res.json();

        console.log("🔥 DATA:", data);

        setJobs(data);
      } catch (err) {
        console.error("❌ ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // 🔍 FILTER
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

  // ⏳ LOADING
  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Loading jobs...
      </p>
    );
  }

  return (
    <div>
      {/* SEARCH + FILTER */}
      <div className="bg-white p-4 rounded-xl shadow mb-6 flex flex-col md:flex-row gap-3">
        <SearchBar search={search} setSearch={setSearch} />
        <FilterBar filter={filter} setFilter={setFilter} />
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
          <p className="text-center text-gray-500">No jobs found</p>
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