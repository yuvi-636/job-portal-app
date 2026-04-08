const FilterBar = ({ filter, setFilter }) => {
  return (
    <select
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      className="p-3 rounded-lg border border-gray-300"
    >
      <option value="">All</option>
      <option value="fresher">Fresher</option>
      <option value="1-2 years">1-2 years</option>
    </select>
  );
};

export default FilterBar;