import { toast } from "react-toastify";
import Axios from "@/libs/Axios";
import { AppDispatch } from "@/types";
import { setLoading } from "@/reducers/universal";
import type { CountryType } from "@/features/country/types";

const create = (payload: CountryType) => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await Axios.put("/api/country", payload).then(
      (res) => res.data
    );

    if (response?.status) {
      toast.success(response.message, { position: "top-right" });
      window.location.href = "/country";
    } else {
      toast.warning(response.message, { position: "top-right" });
    }
  } catch (err: any) {
    console.log("error in generating country :: ", err);
    toast.error(err?.response ? err?.response?.data?.message : err?.message, {
      position: "top-right",
    });
  } finally {
    dispatch(setLoading(false));
  }
};

export default create;
