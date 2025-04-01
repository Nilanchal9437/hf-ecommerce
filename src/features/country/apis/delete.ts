import { toast } from "react-toastify";
import Axios from "@/libs/Axios";
import { AppDispatch } from "@/types";
import { setLoading } from "@/reducers/universal";
import type { DeleteType } from "@/features/country/types";

const deleteCountry =
  (payload: DeleteType) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));

    try {
      const response = await Axios.delete("/api/country", {
        params: payload,
      }).then((res) => res.data);

      if (response?.status) {
        toast.success(response.message, { position: "top-right" });
        window.location.href = "/country";
      } else {
        toast.warning(response.message, { position: "top-right" });
      }
    } catch (err: any) {
      console.log("error in delete country :: ", err);
      toast.error(err?.response ? err?.response?.data?.message : err?.message, {
        position: "top-right",
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

export default deleteCountry;
