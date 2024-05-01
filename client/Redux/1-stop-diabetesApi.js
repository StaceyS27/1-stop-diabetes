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
        // GET /api/doctors - get all doctors with specialty and facility
        getDoctors: builder.query({
            query: () => "/api/doctors",
            providesTags: ["doctors"]
        }),
        // GET /api/doctors - get single doctor by ID
        getSingleDoctor: builder.query({
            query: (doctorId) => `/api/doctors/${doctorId}`,
            providesTags: ["singleDoctor"]
        }),

        //-----------------FACILITY ENDPOINTS----------------------//
        // GET /api/facility - get all facilities with associated doctors
        getFacilities: builder.query({
            query: () => "/api/facility",
            providesTags: ["facilities"]
        }),
        // GET /api/facility - get single facility w/ doctors
        getSingleFacility: builder. query({
            query: (facilityId) => `/api/facility/${facilityId}`,
            providesTags: ["singleFacility"]
        }),

        //----------------SPECIALTY ENDPOINTS--------------------//
        // GET /api/specialty - get all specialties w/ respective doctors
        getSpecialties: builder.query({
            query: () => "/api/specialty",
            providesTags: ["specialties"]
        }),
        // GET /api/specialty/:specialtyId - get single specialty w/ doctors
        getSingleSpecialty: builder.query({
            query: (specialtyId) => `/api/specialty/${specialtyId}`,
            providesTags: ["singleSpecialty"]
        }),

        //---------------APPOINTMENT ENDPOINTS------------------//
        // GET /api/appointments - get all appointments by userId (req.user.id)
        getUserAppointments: builder.query({
            query: () => "/api/appointments",
            providesTags: ["userAppointments"]
        }),
        // POST /api/appointments - post new appointments
        addAppointment: builder.mutation({
            query: (appointment) => ({
                url: "/api/appointments",
                method: "POST",
                body: appointment,
            }),
            invalidatesTags: ["userAppointments"]
        }),
        // PUT /api/appointments/:appointmentId - edit appointment details
        updateAppointment: builder.mutation({
            query: (appointmentId, appointment) => ({
                url: `/api/appointments/:${appointmentId}`,
                method: "PUT",
                body: appointment
            }),
            invalidatesTags: ["userAppointments"]
        }),
        // DELETE /api/appointments/:appointmentId - delete appointment
        deleteAppointment: builder.mutation({
            query: (appointmentId) => ({
                url: `/api/appointments/${appointmentId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["userAppointments"]
        })
    })
});

export default stopDiabetesApi;
export const {
    useGetUserQuery,
    useRegisterUserMutation,
    useLoginUserMutation,

    useGetDoctorsQuery,
    useGetSingleDoctorQuery,

    useGetFacilitiesQuery,
    useGetSingleFacilityQuery,

    useGetSpecialtiesQuery,
    useGetSingleSpecialtyQuery,

    useGetUserAppointmentsQuery,
    useAddAppointmentMutation,
    useUpdateAppointmentMutation,
    useDeleteAppointmentMutation

} = stopDiabetesApi