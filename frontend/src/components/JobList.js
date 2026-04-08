import { useEffect, useState } from "react";
import JobCard from "./JobCard";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";

const API = "https://job-portal-backend-ax7n.onrender.com";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [view, setView] = useState("grid");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`${API}/api/jobs`);
        const data = await res.json();

        setJobs(data);
        setLoading(false);

        try {
          const extRes = await fetch(`${API}/api/jobs/external`);
          if (extRes.ok) {
            const extData = await extRes.json();
            setJobs((prev) => [...prev, ...extData]);
          }
        } catch {
          console.log("External failed");
        }

      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const searchText = search.toLowerCase();

    return (
      (job.title || "").toLowerCase().includes(searchText) ||
      (job.company || "").toLowerCase().includes(searchText)
    );
  });

  if (loading) {
    return <p className="text-center mt-10">Loading jobs...</p>;
  }

  return (
    <div>

      {/* SEARCH + FILTER */}
      <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-lg mb-6 flex flex-col md:flex-row gap-3">
        <SearchBar search={search} setSearch={setSearch} />
        <FilterBar filter={filter} setFilter={setFilter} />
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job, index) => (
          <JobCard key={job._id || index} job={job} />
        ))}
      </div>

    </div>
  );
};

export default JobList;