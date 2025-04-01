import React from "react";

function StatusMode({ active }: { active: boolean }) {
  return (
    <div className="flex items-center">
      <div
        className={`w-1.5 h-1.5 mr-1.5 rounded-full ${
          active ? "bg-green-500" : "bg-red-500"
        }`}
      ></div>
      <span className="text-gray-600 font-light">
        {active ? "Active" : "Inactive"}
      </span>
    </div>
  );
}

export default StatusMode;
