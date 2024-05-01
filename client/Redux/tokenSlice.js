import {createSlice} from "@reduxjs/toolkit";
import stopDiabetesApi from "./1-stop-diabetesApi";

const tokenSlice = createSlice({
    name: "token",
    initialState: null,
    reducers: {
        setToken: (state, {payload}) => {
            return payload.token
        }
    },

    extraReducers: (builder) => {
        builder.addMatcher(
            stopDiabetesApi.endpoints.registerUser.matchFulfilled,
            (state, {payload}) => payload.token
        );

        builder.addMatcher(
            stopDiabetesApi.endpoints.loginUser.matchFulfilled,
            (state, {payload}) => payload.token
        );
    }
});

export default tokenSlice.reducer;

export const {setToken} = tokenSlice.actions;