const SearchBar = ({ search, setSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search jobs or companies..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  );
};

export default SearchBar;