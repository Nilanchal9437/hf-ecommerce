interface SearchProps {
  searchKeyword: string;
  setSearchKeyword: (event: string) => void;
  CallBack: () => void;
  searchBy: string;
  setPagination: (event: number) => void;
  clear: () => void;
}


export default SearchProps;