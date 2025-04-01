interface PaginationProps {
  setLimit: (event: number) => void;
  setPagination: (event: number) => void;
  start: number;
  limit: number;
  total: number;
}

export default PaginationProps;
