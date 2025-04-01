import { toast } from "react-toastify";
import Axios from "@/libs/Axios";
import { AppDispatch } from "@/types";
import { setLoading } from "@/reducers/universal";
import type { DeleteType, CountryType } from "@/features/country/types";

const initialResponse = {
  name: "",
  code: "",
};

const getDetail =
  (payload: DeleteType) =>
  async (
    dispatch: AppDispatch
  ): Promise<{ status: boolean; data: CountryType }> => {
    dispatch(setLoading(true));
    try {
      const response = await Axios.post("/api/country", payload).then(
        (res) => res.data
      );

      if (response?.status) {
        return { status: true, data: response.data };
      } else {
        toast.warning(response.message, { position: "top-right" });
        return { status: false, data: initialResponse };
      }
    } catch (err: any) {
      console.log("error in getting country detail:: ", err);
      toast.error(err?.response ? err?.response?.data?.message : err?.message, {
        position: "top-right",
      });
      return { status: false, data: initialResponse };
    } finally {
      dispatch(setLoading(false));
    }
  };

export default getDetail;
