import { Routes, Route, useLocation } from "react-router-dom";
import JobList from "./components/JobList";
import JobDetails from "./pages/JobDetails";
import AdminPage from "./pages/AdminPage";

function App() {
  const location = useLocation();

  const hideHeader = location.pathname === "/admin";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">

      {/* Header (hide on admin) */}
      {!hideHeader && (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-10 shadow-lg">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h1 className="text-4xl font-bold">
              🚀 Fresher Job Openings
            </h1>
            <p className="mt-2 text-blue-100 text-sm">
              Find your first opportunity and kickstart your career
            </p>
          </div>
        </div>
      )}

      {/* Routes */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<JobList />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>

    </div>
  );
}

export default App;