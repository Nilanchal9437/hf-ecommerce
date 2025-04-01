"use client";

import React, { useMemo } from "react";
import PaginationProps from "@/components/Pagination/types";

const Pagination = ({
  setLimit,
  setPagination,
  start,
  limit,
  total,
}: PaginationProps) => {
  const totalPages = Math.ceil(total / limit);
  const currentPage = start / limit + 1;

  const handlePageChange = (page: number) => {
    setPagination(limit * (page - 1));
  };

  const PaginationComponents = useMemo(
    () => (
      <div className="my-4 flex items-center justify-between">
        <div className="text-sm font-medium">Total: {total}</div>
        <div className="flex items-center space-x-2">
          <button
            className={`px-3 py-1 border rounded-md ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-200"
            }`}
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Prev
          </button>
          {totalPages > 0 && [...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`px-3 py-1 border rounded-md ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className={`px-3 py-1 border rounded-md ${
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-200"
            }`}
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>

        <select
          className="border p-1 rounded-md"
          value={limit}
          onChange={(event) => setLimit(parseInt(event.target.value))}
        >
          {[10, 30, 50, 70, 100].map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </select>
      </div>
    ),
    [start, limit, total]
  );
  return PaginationComponents;
};

export default Pagination;
