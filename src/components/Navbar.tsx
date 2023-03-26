import Search from "./Search";
import Signin from "./Signin";
import SpotifyIcon from "./SpotifyIcon";

export default function Navbar({
  searchTerm,
  setSearchTerm,
  handleSearch,
  handleClear,
}) {
  return (
    <div className="relative flex items-center justify-between bg-[#152c1e] py-2 px-4">
      <SpotifyIcon />
      <Search
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
        handleClear={handleClear}
      />
      <Signin />
    </div>
  );
}
