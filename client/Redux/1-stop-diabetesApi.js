import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const stopDiabetesApi= createApi({
    reducerPath: "stopDiabetesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/",

        prepareHeaders: (headers, {getState}) => {
            headers.set("Content-Type", "application/json");
            const {token} = getState();
            if(token) {
                headers.set("authorization", `Bearer ${token}`)
            }

            return headers;
        },
    }),

    endpoints: (builder) => ({
        //-------------------USER ENDPOINTS-----------------------//
        // GET /api/users/me - get single user information by id (req.user.id)
        getUser: builder.query({
            query: () => "/api/users/me",
            providesTags: ["user"]
        }),
        // POST /api/users/register - register new user
        registerUser: builder.mutation({
            query: (user) => ({
                url: "/api/users/register",
                method: "POST",
                body: user, 
            }),
            invalidatesTag: ["user"]
        }),
        // POST /api/users/login - login existing user
        loginUser: builder. mutation({
            query: (user) => ({
                url: "/api/users/login",
                method: "POST",
                body: user,
            }),
            invalidatesTags: ["user"]
        }),

        //-----------------DOCTOR ENDPOINTS------------------------//
        // GET /api/doctors- get all doctors with specialty and facility
        getDoctors: builder.query({
            query: () => "/api/doctors",
            providesTags: ["doctors"]
        }),
        // GET /api/doctors - get single doctor by ID
        getSingleDoctor: builder.query({
            query: (doctorId) => `/api/doctors/${doctorId}`,
            providesTags: ["singleDoctor"]
        }),

        //------------------FACILITY ENDPOINTS---------------------//


    })
});

export default stopDiabetesApi;
export const {
    useGetUserQuery,
    useRegisterUserMutation,
    useLoginUserMutation,

    useGetDoctorsQuery,
    useGetSingleDoctorQuery,
} = stopDiabetesApi