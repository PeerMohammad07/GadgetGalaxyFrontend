import { configureStore } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import userSlice from "./Slices/userSlice"
import adminSlice from "./Slices/adminSlice"

const persistConfigUser = {
  key: "user",
  storage,
};

const persistConfigAdmin = {
  key: "admin",
  storage,
};

export type RootState = ReturnType<typeof store.getState>;

const persistedUserReducer = persistReducer(persistConfigUser, userSlice);
const persistedAdminReducer = persistReducer(persistConfigAdmin,adminSlice)

const store = configureStore({
  reducer : {
    user : persistedUserReducer,
    admin : persistedAdminReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
  }),
})

export const persistor = persistStore(store);
export default store