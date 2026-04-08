import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(
          `https://job-portal-backend-ax7n.onrender.com/api/jobs/${id}`
        );

        if (!res.ok) throw new Error("Failed");

        const data = await res.json();
        setJob(data);
      } catch (err) {
        console.error("Error fetching job:", err);
      }
    };

    fetchJob();
  }, [id]);

  if (!job) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold">{job.title}</h1>
      <p className="text-gray-600">{job.company}</p>
      <p className="mt-2">{job.location}</p>
      <p className="mt-4">{job.description}</p>

      <a
        href={job.applyLink}
        target="_blank"
        rel="noreferrer"
        className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Apply Now
      </a>
    </div>
  );
};

export default JobDetails;