import Axios from "@/libs/Axios";
import { toast } from "react-toastify";
import type { CountryType } from "@/features/country/types";

const getList = async (
  payload: any
): Promise<{ status: boolean; data: CountryType[]; total: number }> => {
  try {
    const response = await Axios.get("/api/country", {
      params: payload,
    }).then((res) => res.data);

    if (Array.isArray(response?.data)) {
      if (response) {
        return { status: true, data: response?.data, total: response?.total };
      } else {
        return { status: false, data: [], total: 0 };
      }
    } else {
      return { status: false, data: [], total: 0 };
    }
  } catch (err: any) {
    toast.error(err?.response ? err?.response?.data?.message : err?.message, {
      position: "top-right",
    });
    console.log("error in getting country fetching :: ", err);
    return { status: false, data: [], total: 0 };
  }
};

export default getList;
