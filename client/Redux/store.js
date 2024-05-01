import {configureStore} from "@reduxjs/toolkit";
import stopDiabetesApi from "./1-stop-diabetesApi";
import tokenReducer from "./tokenSlice";

export const store = configureStore({
    reducer: {
        [stopDiabetesApi.reducerPath]: stopDiabetesApi.reducer,
        token: tokenReducer,
    },

    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
        .concat(stopDiabetesApi.middleware)
    }
});

export default store; 