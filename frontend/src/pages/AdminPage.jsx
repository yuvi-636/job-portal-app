import { useEffect, useState } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

const AdminPage = () => {
  const [jobs, setJobs] = useState([]);

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    applyLink: "",
    experience: "fresher",
    type: "onsite",
    salary: "",
    description: "",
  });

  // 🔹 Fetch jobs
  const fetchJobs = async () => {
    try {
      const res = await axios.get(`${API}/api/jobs`);
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // 🔹 Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Add job
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/api/jobs`, form);
      setForm({
        title: "",
        company: "",
        location: "",
        applyLink: "",
        experience: "fresher",
        type: "onsite",
        salary: "",
        description: "",
      });
      fetchJobs();
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Delete job
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/api/jobs/${id}`);
      fetchJobs();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">

      {/* Title */}
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

      {/* ➕ Add Job Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-5 rounded-xl shadow border mb-8 space-y-4"
      >
        <h2 className="text-lg font-semibold">Add Job</h2>

        <input name="title" value={form.title} onChange={handleChange} placeholder="Job Title" className="w-full border p-2 rounded" required />
        <input name="company" value={form.company} onChange={handleChange} placeholder="Company" className="w-full border p-2 rounded" required />
        <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="w-full border p-2 rounded" required />
        <input name="applyLink" value={form.applyLink} onChange={handleChange} placeholder="Apply Link" className="w-full border p-2 rounded" required />

        <div className="flex gap-3">
          <select name="experience" value={form.experience} onChange={handleChange} className="border p-2 rounded w-full">
            <option value="fresher">Fresher</option>
            <option value="1-2 years">1-2 years</option>
          </select>

          <select name="type" value={form.type} onChange={handleChange} className="border p-2 rounded w-full">
            <option value="onsite">Onsite</option>
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>

        <input name="salary" value={form.salary} onChange={handleChange} placeholder="Salary" className="w-full border p-2 rounded" />

        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full border p-2 rounded" />

        <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
          Add Job
        </button>
      </form>

      {/* 🧾 Job List */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">All Jobs</h2>

        {jobs.map((job) => (
          <div key={job._id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
            <div>
              <p className="font-semibold">{job.title}</p>
              <p className="text-sm text-gray-500">{job.company}</p>
            </div>

            <button
              onClick={() => handleDelete(job._id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};

export default AdminPage;