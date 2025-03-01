import { configureStore } from "@reduxjs/toolkit";
import authReducer, { IAuthReducer } from "reducers/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface IApplicationState {
  auth: IAuthReducer
}