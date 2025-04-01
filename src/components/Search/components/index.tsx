import * as React from "react";
import SearchProps from "@/components/Search/types";

function Search({
  searchBy,
  CallBack,
  searchKeyword,
  setSearchKeyword,
  setPagination,
  clear,
}: SearchProps) { 
  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <input
        type="text"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={`Search by ${searchBy}`}
        value={searchKeyword}
        onChange={(event) => setSearchKeyword(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && searchKeyword !== "") {
            CallBack();
            setPagination(1);
          }
        }}
      />
      <div className="flex gap-2">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          disabled={searchKeyword.trim() === ""}
          onClick={() => {
            CallBack();
            setPagination(1);
          }}
        >
          Search
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          onClick={() => clear()}
        >
          CLEAR
        </button>
      </div>
    </div>
  );
}

export default Search;
