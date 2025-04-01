import * as React from "react";
import Image from "next/image";
import TableProps from "@/components/Table/types";

function Table({ columns, setSelected, selected, rows, load }: TableProps) {
  const handleSelectionChange = (id: string) => {
    let newSelection = [...rows];
    if (newSelection.includes(id)) {
      newSelection = newSelection.filter((item) => item !== id);
    } else {
      newSelection.push(id);
    }
    setSelected(newSelection);
  };

  return (
    <div className="w-full border border-gray-200 rounded-md shadow-md">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-200 text-gray-600 text-sm font-semibold">
            <th className="p-3 w-12 text-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-500"
                onChange={(e) => {
                  const allIds = rows.map((row) => row._id);
                  setSelected(e.target.checked ? allIds : []);
                }}
              />
            </th>
            {columns.map((col) => (
              <th key={col.field} className="p-3">
                {col.headerName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {load ? (
            // Loading Skeleton Rows
            [...Array(10)].map((_, index) => (
              <tr key={index} className="border-b border-gray-500">
                {[...Array(columns.length + 1)].map((_, indexs) => (
                  <td
                    className="px-4 py-3 animate-pulse bg-gray-400 h-10"
                    key={indexs}
                  ></td>
                ))}
              </tr>
            ))
          ) : rows.length === 0 ? (
            // No Data Found
            <tr>
              <td colSpan={columns.length + 1} className="px-6 py-10 text-center">
                <Image
                  src="/no-data-found.png"
                  alt="not found"
                  height={400}
                  width={400}
                  className="mx-auto object-cover"
                />
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr
                key={row._id}
                className="border-b border-gray-200 text-gray-700 text-sm hover:bg-gray-100"
              >
                <td className="p-3 w-12 text-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-500"
                    checked={selected.includes(row._id)}
                    onChange={() => handleSelectionChange(row._id)}
                  />
                </td>
                {columns.map((col) => (
                  <td key={col.field} className="p-3">
                    {col.renderCell ? col.renderCell({ row }) : row[col.field]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
