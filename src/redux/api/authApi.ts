import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";
const AuthUrl = "/user";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    users: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${AuthUrl}/get-user`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.user],
    }),
    userLogin: build.mutation({
      query: (loginData) => ({
        url: `${AuthUrl}/login`,
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    userSignup: build.mutation({
      query: (loginData) => ({
        url: `${AuthUrl}/signup`,
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const { useUsersQuery, useUserLoginMutation, useUserSignupMutation } =
  authApi;
