import { IMeta } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";
const ISSUE_URL = "/issues";

export const IssueApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    issues: build.query({
      query: (arg: Record<string, any>) => ({
        url: ISSUE_URL,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.issues],
    }),
    myFlat: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${ISSUE_URL}/my-flat`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.issues],
    }),
    singleIssue: build.query({
      query: (id) => ({
        url: `${ISSUE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.issues],
    }),
    singleUserIssue: build.query({
      query: () => ({
        url: `${ISSUE_URL}/single-renter-issue/`,
        method: "GET",
      }),
      providesTags: [tagTypes.issues],
    }),
    addIssue: build.mutation({
      query: (data) => ({
        url: ISSUE_URL,
        method: "POST",
        data: data,
      }),
      transformResponse: (response, meta: IMeta) => {
        return {
          properties: response,
          meta,
        };
      },
      invalidatesTags: [tagTypes.issues],
    }),
    updateIssue: build.mutation({
      query: (data) => ({
        url: `${ISSUE_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.issues],
    }),
    deleteIssue: build.mutation({
      query: (id) => ({
        url: `${ISSUE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.issues],
    }),
  }),
});

export const {
  useIssuesQuery,
  useSingleIssueQuery,
  useAddIssueMutation,
  useDeleteIssueMutation,
  useUpdateIssueMutation,
  useSingleUserIssueQuery,
  useMyFlatQuery,
} = IssueApi;
