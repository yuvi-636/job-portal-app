const SearchBar = ({ search, setSearch }) => {
  return (
    <input
  type="text"
  placeholder="🔍 Search company or role..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400"
/>
  );
};

export default SearchBar;