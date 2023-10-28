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
    myProfile: build.query({
      query: () => ({
        url: `${AuthUrl}/get-user/my-profile`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    userUpdate: build.mutation({
      query: (data) => ({
        url: `${AuthUrl}/update-profile/${data.id}`,
        method: "PATCH",
        data: data.body,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.user],
    }),
    changePassword: build.mutation({
      query: (data) => ({
        url: `${AuthUrl}/change-password`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.user],
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

export const {
  useUsersQuery,
  useUserLoginMutation,
  useUserSignupMutation,
  useMyProfileQuery,
  useUserUpdateMutation,
  useChangePasswordMutation,
} = authApi;
