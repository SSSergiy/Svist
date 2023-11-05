import { configureStore } from "@reduxjs/toolkit";
import rideReducer from "./rideReducer";
import authReducer from "./authReducer";
import paymentReducer from "./paymentReducer";

export const store = configureStore({
  reducer: {
    ride: rideReducer,
    auth: authReducer,
    payment: paymentReducer,
  },
});
