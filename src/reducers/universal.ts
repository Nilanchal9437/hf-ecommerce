import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type universalType from "@/reducers/types/universal";

const initialState: universalType = {
  loading: false,
};

const universal = createSlice({
  name: "universal",
  initialState: initialState,
  reducers: {
    setLoading: (state: universalType, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = universal.actions;
export default universal.reducer;
