// @ts-nocheck
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import logger from "redux-logger"; // Example middleware

const middleware = [];
if (process.env.NODE_ENV === "development") {
  middleware.push(logger);
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
  devTools: process.env.NODE_ENV !== "production",
});
