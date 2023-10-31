import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";
const Feedback_URL = "/feedback";

export const FeedbackApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    feedbacks: build.query({
      query: () => ({
        url: Feedback_URL,
        method: "GET",
      }),
      providesTags: [tagTypes.feedback],
    }),
    singleFeedback: build.query({
      query: (id) => ({
        url: `${Feedback_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.feedback],
    }),

    addFeedback: build.mutation({
      query: (data) => ({
        url: Feedback_URL,
        method: "POST",
        data,
      }),

      invalidatesTags: [tagTypes.feedback],
    }),
    updateFeedback: build.mutation({
      query: (data) => ({
        url: `${Feedback_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.feedback],
    }),
    deleteFeedback: build.mutation({
      query: (id) => ({
        url: `${Feedback_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.feedback],
    }),
  }),
});

export const {
  useFeedbacksQuery,
  useSingleFeedbackQuery,
  useAddFeedbackMutation,
  useDeleteFeedbackMutation,
  useUpdateFeedbackMutation,
} = FeedbackApi;
