import { configureStore } from "@reduxjs/toolkit";
import commissionsReducer from "./features/commissionsSlice";
import authReducer from './features/authSlice';

export const store = configureStore({
  reducer: {
    commissions: commissionsReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
