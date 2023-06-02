import {configureStore} from "@reduxjs/toolkit";
import {reduxBatch} from "@manaflair/redux-batch";
import {rootReducer} from "./rootReducer";

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
    enhancers: [reduxBatch]
})

export default store;
