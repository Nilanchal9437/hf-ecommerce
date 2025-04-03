import Axios from "@/libs/Axios";
import { toast } from "react-toastify";
import type { TemplateType } from "@/features/template/types";

const getList = async (
  payload: any
): Promise<{ status: boolean; data: TemplateType[]; total: number }> => {
  try {
    const response = await Axios.get("/api/template", {
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
    console.warn("error in getting template fetching :: ", err);
    return { status: false, data: [], total: 0 };
  }
};

export default getList;
