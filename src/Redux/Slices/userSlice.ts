import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IUser, { UserState } from "../../Interfaces/IUserData";

const initialState:UserState = {
  userData : null
}

const userSlice = createSlice({
  name : "user",
  initialState,
  reducers : {
    userLogin : (state,action:PayloadAction<IUser|null>)=>{
      state.userData = action.payload
    },
    userLogout : (state)=>{
      state.userData = null
    }
  }
})

export const {userLogin,userLogout} = userSlice.actions
export default userSlice.reducer