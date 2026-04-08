import { useEffect, useState } from "react";
import JobCard from "./JobCard";

const API = "https://job-portal-backend-ax7n.onrender.com";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // ✅ DB JOBS
        const res = await fetch(`${API}/api/jobs`);
        const data = await res.json();

        setJobs(data);
        setLoading(false);

        // 🔥 EXTERNAL JOBS (CITY BASED)
        try {
          const cityQuery = location || "india";

          const externalRes = await fetch(
            `${API}/api/jobs/external?city=${cityQuery}`
          );

          if (externalRes.ok) {
            const externalData = await externalRes.json();

            setJobs((prev) => [...prev, ...externalData]);
          }
        } catch (err) {
          console.log("External API failed");
        }

      } catch (err) {
        console.error("Main API error:", err);
        setLoading(false);
      }
    };

    fetchJobs();
  }, [location]); // 🔥 IMPORTANT

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
      <div className="bg-white p-5 rounded-2xl shadow-sm border mb-6">
        <div className="flex flex-col md:flex-row gap-3">

          <input
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="text"
            placeholder="City (Bangalore, Pune...)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full md:w-64 p-3 border rounded-lg"
          />

        </div>
      </div>

      {/* JOBS */}
      <div className="flex flex-col gap-4">
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