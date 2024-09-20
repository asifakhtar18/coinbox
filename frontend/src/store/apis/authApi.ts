import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://192.168.1.4:3000/api'}),
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: credentials => ({
        url: '/register',
        method: 'POST',
        body: credentials,
      }),
    }),
    verifyEmail: builder.mutation({
      query: credentials => ({
        url: '/verify-email',
        method: 'POST',
        body: credentials,
      }),
    }),
    resendEmail: builder.mutation({
      query: credentials => ({
        url: '/resend-email',
        method: 'POST',
        body: credentials,
      }),
    }),
    forgotPassword: builder.mutation({
      query: credentials => ({
        url: '/forgot-password',
        method: 'POST',
        body: credentials,
      }),
    }),

    resetPassword: builder.mutation({
      query: credentials => ({
        url: '/reset-password',
        method: 'POST',
        body: credentials,
      }),
    }),
    getUserDetails: builder.query({
      query: token => ({
        url: '/user-details',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyEmailMutation,
  useResendEmailMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetUserDetailsQuery,
} = authApi;
