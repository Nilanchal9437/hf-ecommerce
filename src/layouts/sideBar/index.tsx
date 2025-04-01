import Link from "next/link";
import { usePathname } from "next/navigation";

import router from "@/layouts/router";

function SideBar() {
  const pathname = usePathname();

  return (
    <div className="mx-2 mt-3">
      <ul className="space-y-2">
        {router.map((item, index) => {
          const ICON = item.icon; 
          return (
            <li key={index}>
              <Link
                href={item.link}
                className={`flex items-center py-2 px-3 rounded-md ${
                  item.link === pathname
                    ? "bg-green-500 text-white font-medium"
                    : "text-black hover:bg-green-500 hover:text-white"
                }`}
              >
                {item?.icon && (
                  <div className="mr-2">
                    <ICON className="text-sm" />
                  </div>
                )}
                <span className="text-sm">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SideBar;
