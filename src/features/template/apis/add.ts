import { toast } from "react-toastify";
import Axios from "@/libs/Axios";
import { AppDispatch } from "@/types";
import { setLoading } from "@/reducers/universal";
import type { TemplateType } from "@/features/template/types";

const create = (payload: TemplateType) => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await Axios.put("/api/template", payload).then(
      (res) => res.data
    );

    if (response?.status) {
      toast.success(response.message, { position: "top-right" });
      window.location.href = "/template";
    } else {
      toast.warning(response.message, { position: "top-right" });
    }
  } catch (err: any) {
    console.warn("error in generating template :: ", err);
    toast.error(err?.response ? err?.response?.data?.message : err?.message, {
      position: "top-right",
    });
  } finally {
    dispatch(setLoading(false));
  }
};

export default create;
