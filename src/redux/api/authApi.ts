import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";
const AuthUrl = "/user";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
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

export const { useUserLoginMutation, useUserSignupMutation } = authApi;
