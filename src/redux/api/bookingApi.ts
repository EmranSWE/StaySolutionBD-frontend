import { IMeta } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";
const BOOKING_URL = "/bookings";

export const BookingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    bookings: build.query({
      query: (arg: Record<string, any>) => ({
        url: BOOKING_URL,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.booking],
    }),
    singleBooking: build.query({
      query: (id) => ({
        url: `${BOOKING_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.booking],
    }),
    singleUserBooking: build.query({
      query: (id) => ({
        url: `${BOOKING_URL}/my-Booking/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.booking],
    }),
    addBooking: build.mutation({
      query: (data) => ({
        url: BOOKING_URL,
        method: "POST",
        data: data,
      }),
      transformResponse: (response, meta: IMeta) => {
        return {
          properties: response,
          meta,
        };
      },
      invalidatesTags: [tagTypes.booking],
    }),
    updateBooking: build.mutation({
      query: (data) => ({
        url: `${BOOKING_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.booking],
    }),
    deleteBooking: build.mutation({
      query: (id) => ({
        url: `${BOOKING_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.booking],
    }),
  }),
});

export const {
  useBookingsQuery,
  useSingleBookingQuery,
  useAddBookingMutation,
  useDeleteBookingMutation,
  useUpdateBookingMutation,
  useSingleUserBookingQuery,
} = BookingApi;
