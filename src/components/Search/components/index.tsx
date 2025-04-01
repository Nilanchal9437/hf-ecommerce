import * as React from "react";
import SearchProps from "@/components/Search/types";

function Search({
  searchBy,
  CallBack,
  searchKeyword,
  setSearchKeyword,
  setPagination,
}: SearchProps) {
  const [clear, setClear] = React.useState(false);

  React.useEffect(() => {
    if (clear === true) {
      CallBack();
      setClear(false);
    }
  }, [searchKeyword]);

  const SearchComponents = React.useMemo(
    () => (
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
              setPagination(0);
            }
          }}
        />
        <div className="flex gap-2">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={() => {
              CallBack();
              setPagination(0);
            }}
          >
            Search
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            onClick={() => {
              setSearchKeyword("");
              setPagination(0);
              setClear(true);
            }}
          >
            CLEAR
          </button>
        </div>
      </div>
    ),
    [searchKeyword]
  );

  return SearchComponents;
}

export default Search;
