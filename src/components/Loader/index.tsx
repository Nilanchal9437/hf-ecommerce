import React from "react";
import { useAppSelector } from "@/hooks";

function Loader() {
  const universal = useAppSelector((store) => store.universal);

  return (
    <>
      {universal.loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50 bg-black/50">
          <div className="flex flex-col items-center p-3 bg-white rounded-lg shadow-lg inset-shadow-sm inset-shadow-indigo-500/50">
            <div className="animate-spin h-12 w-12 border-t-4 border-blue-500 border-solid rounded-full"></div>
          </div>
        </div>
      )}
    </>
  );
}

export default Loader;
