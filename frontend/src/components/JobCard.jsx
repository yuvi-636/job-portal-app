import { useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  // fallback logo (first letter)
  const logo = job.company
    ? job.company.charAt(0).toUpperCase()
    : "J";

  return (
    <div
      onClick={() => navigate(`/job/${job._id}`)}
      className="cursor-pointer bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-xl hover:-translate-y-1 transition duration-300"
    >
      {/* TOP SECTION */}
      <div className="flex justify-between items-start gap-4">

        {/* LEFT SIDE */}
        <div className="flex gap-4">

          {/* LOGO */}
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-indigo-100 text-indigo-700 font-bold text-lg">
            {logo}
          </div>

          {/* TEXT */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {job.title}
            </h2>

            <p className="text-sm text-gray-600 mt-1">
              {job.company}
            </p>

            <p className="text-sm text-gray-500">
              📍 {job.location}
            </p>

            <p className="text-xs text-gray-400 mt-1">
              {new Date(job.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* APPLY BUTTON */}
        <a
          href={job.applyLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-sm font-medium text-white bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700 transition whitespace-nowrap"
        >
          Apply →
        </a>
      </div>

      {/* TAGS */}
      <div className="flex flex-wrap gap-2 mt-4">
        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
          {job.type || "Onsite"}
        </span>

        <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
          {job.experience || "Fresher"}
        </span>

        {job.salary && (
          <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
            {job.salary}
          </span>
        )}
      </div>

      {/* SKILLS */}
      {job.skills && job.skills.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {job.skills.map((skill, index) => (
            <span
              key={index}
              className="text-xs border border-gray-300 px-2 py-1 rounded-md text-gray-600 bg-gray-50"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobCard;



// import { useNavigate } from "react-router-dom";

// const JobCard = ({ job }) => {
//   const navigate = useNavigate();

//   // 🎨 Dynamic color for avatar
//   const getColor = (name = "") => {
//     const colors = [
//       "bg-red-100 text-red-700",
//       "bg-blue-100 text-blue-700",
//       "bg-green-100 text-green-700",
//       "bg-purple-100 text-purple-700",
//     ];
//     return colors[name.length % colors.length];
//   };

//   return (
//     <div
//       onClick={() => navigate(`/job/${job._id}`)}
//       className="cursor-pointer bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg hover:-translate-y-1 transition duration-300"
//     >
//       {/* Top */}
//       <div className="flex justify-between items-start">

//         {/* LEFT */}
//         <div className="flex gap-3">

//           {/* 🏢 Avatar */}
//           <div
//             className={`w-10 h-10 flex items-center justify-center rounded-lg font-semibold ${getColor(
//               job.company
//             )}`}
//           >
//             {job.company?.slice(0, 2).toUpperCase()}
//           </div>

//           {/* Info */}
//           <div>
//             <h2 className="text-lg font-semibold text-gray-900">
//               {job.title}
//             </h2>

//             <p className="text-sm text-gray-600 mt-1">
//               {job.company} • {job.location}
//             </p>

//             <p className="text-xs text-gray-400 mt-1">
//               {new Date(job.createdAt).toLocaleDateString()}
//             </p>
//           </div>
//         </div>

//         {/* APPLY BUTTON */}
//         <a
//           href={job.applyLink}
//           target="_blank"
//           rel="noopener noreferrer"
//           onClick={(e) => e.stopPropagation()}
//           className="text-sm font-medium text-white bg-black px-4 py-2 rounded-lg hover:bg-gray-800 transition"
//         >
//           Apply
//         </a>
//       </div>

//       {/* TAGS */}
//       <div className="flex flex-wrap gap-2 mt-4">
        
//         <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
//           {job.type || "Onsite"}
//         </span>

//         <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
//           {job.experience || "Fresher"}
//         </span>

//         {job.salary && (
//           <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
//             {job.salary}
//           </span>
//         )}
//       </div>

//       {/* SKILLS */}
//       {job.skills && job.skills.length > 0 && (
//         <div className="flex flex-wrap gap-2 mt-3">
//           {job.skills.map((skill, index) => (
//             <span
//               key={index}
//               className="text-xs border border-gray-300 px-2 py-1 rounded-md text-gray-600"
//             >
//               {skill}
//             </span>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default JobCard;


