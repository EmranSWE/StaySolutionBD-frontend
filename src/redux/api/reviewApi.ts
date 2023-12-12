import { IMeta } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";
const REVIEW_URL = "/reviews";

export const ReviewApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    reviews: build.query({
      query: (arg: Record<string, any>) => ({
        url: REVIEW_URL,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.reviews],
    }),
    singleReview: build.query({
      query: (id) => ({
        url: `${REVIEW_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.reviews],
    }),
    singleUserReview: build.query({
      query: (id) => ({
        url: `${REVIEW_URL}/my-review/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.reviews],
    }),
    addReview: build.mutation({
      query: (data) => ({
        url: REVIEW_URL,
        method: "POST",
        data,
        contentType: "multipart/form-data",
      }),
      transformResponse: (response, meta: IMeta) => {
        return {
          properties: response,
          meta,
        };
      },
      invalidatesTags: [tagTypes.reviews],
    }),

    updateReview: build.mutation({
      query: (data) => ({
        url: `${REVIEW_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.property],
    }),
    deleteReview: build.mutation({
      query: (id) => ({
        url: `${REVIEW_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.reviews],
    }),
  }),
});

export const {
  useReviewsQuery,
  useSingleReviewQuery,
  useAddReviewMutation,
  useDeleteReviewMutation,
  useUpdateReviewMutation,
  useSingleUserReviewQuery,
} = ReviewApi;
