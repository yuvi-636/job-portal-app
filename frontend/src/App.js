import { Routes, Route } from "react-router-dom";
import JobList from "./components/JobList";
import JobDetails from "./pages/JobDetails";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">

      {/* HERO */}
      <div className="relative bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 text-white py-16 shadow-lg overflow-hidden">
        
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d')] bg-cover bg-center"></div>

        <div className="relative max-w-5xl mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold">
            Find Your Dream Job 🚀
          </h1>
          <p className="mt-4 text-blue-100 text-lg">
            Discover real-time opportunities from top companies
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <Routes>
          <Route path="/" element={<JobList />} />
          <Route path="/job/:id" element={<JobDetails />} />
        </Routes>
      </div>

    </div>
  );
}

export default App;