import React from "react";
import { useSearch } from "../Utils/SearchContext"; 

function Header() {
  const { searchTerm, setSearchTerm } = useSearch();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <header className="bg-[#202124] p-4 flex justify-between items-center border-b-2 border-white gap-12">
      <div className="text-3xl font-bold text-white">Notes</div>
      <input
        type="text"
        placeholder="Cari catatan..."
        className="w-96 h-12 py-1 px-2 rounded border bg-[#202124] text-white :placeholder font-semibold"
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </header>
  );
}

export default Header;
