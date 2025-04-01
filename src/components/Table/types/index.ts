interface TableProps {
  columns: any[];
  setSelected: (event: any[]) => void;
  selected: any[];
  rows: any[];
  load: boolean;
}

export default TableProps;
