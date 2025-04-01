import { FaPlus } from "react-icons/fa"; // Using react-icons for the Add icon
import type TitleType from "@/components/Title/types";

function Title({ title, description, action, btntitle, hidebtn }: TitleType) {
  return (
    <div className="flex justify-between">
      <div>
        <p className="text-xl font-semibold">{title}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <div>
        {!hidebtn && (
          <button
            className="flex items-center border border-green-500 text-green-500 rounded-lg py-2 px-4 hover:bg-green-50"
            onClick={() => action()}
          >
            <FaPlus className="mr-2" size={16} />
            {btntitle}
          </button>
        )}
      </div>
    </div>
  );
}

export default Title;
