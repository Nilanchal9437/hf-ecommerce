import { MdDashboard } from "react-icons/md";
import { MdFlagCircle } from "react-icons/md";

import type { IconBaseProps } from "react-icons";

const router: {
  label: string;
  link: string;
  icon: React.ElementType<IconBaseProps>;
}[] = [
  {
    label: "Dashbaord",
    link: "/",
    icon: MdDashboard,
  },
  {
    label: "Country",
    link: "/country",
    icon: MdFlagCircle,
  },
];

export default router;
