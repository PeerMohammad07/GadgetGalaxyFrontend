// slices/adminSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdminState, IAdmin } from "../../Interfaces/IAdminData";

const initialState: AdminState = {
  adminData: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    adminLogin: (state, action: PayloadAction<IAdmin | null>) => {
      state.adminData = action.payload;
    },
    adminLogout: (state) => {
      state.adminData = null;
    },
  },
});

export const { adminLogin, adminLogout } = adminSlice.actions;
export default adminSlice.reducer;
