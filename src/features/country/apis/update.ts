import { toast } from "react-toastify";
import Axios from "@/libs/Axios";
import { AppDispatch } from "@/types";
import { setLoading } from "@/reducers/universal";
import type { CountryType } from "@/features/country/types";

const update = (payload: CountryType) => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));

  try {
    const response = await Axios.patch("/api/country", payload).then(
      (res) => res.data
    );

    if (response?.status) {
      toast.success(response.message, { position: "top-right" });
      setTimeout(() => {
        window.location.href = "/country";
      }, 1000);
    } else {
      toast.warning(response.message, { position: "top-right" });
    }
  } catch (err: any) {
    console.warn("error in updateing country :: ", err);
    toast.error(err?.response ? err?.response?.data?.message : err?.message, {
      position: "top-right",
    });
  } finally {
    dispatch(setLoading(false));
  }
};

export default update;
