const FilterBar = ({ filter, setFilter }) => {
  return (
    <select
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
    >
      <option value="">All Experience</option>
      <option value="fresher">Fresher</option>
      <option value="1-2">1-2 Years</option>
    </select>
  );
};

export default FilterBar;