import { IMeta } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";
const MonthlyPayment_URL = "/rent";

export const MonthlyPaymentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    MonthlyPayments: build.query({
      query: (arg: Record<string, any>) => ({
        url: MonthlyPayment_URL,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.monthlyPayment],
    }),
    rentManagement: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${MonthlyPayment_URL}/rent-management`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.monthlyPayment],
    }),
    singleMonthlyPayment: build.query({
      query: (id) => ({
        url: `${MonthlyPayment_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.monthlyPayment],
    }),
    totalMonthlyPayment: build.query({
      query: () => ({
        url: `${MonthlyPayment_URL}/rents/total`,
        method: "GET",
      }),
      providesTags: [tagTypes.monthlyPayment],
    }),
    singleUserMonthlyPayment: build.query({
      query: () => ({
        url: `${MonthlyPayment_URL}/renters/my-rents/`,
        method: "GET",
      }),
      providesTags: [tagTypes.monthlyPayment],
    }),
    currentMonthMonthlyPayment: build.query({
      query: (id) => ({
        url: `${MonthlyPayment_URL}/current-month-rent/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.monthlyPayment],
    }),
    currentBookingStatus: build.query({
      query: () => ({
        url: `${MonthlyPayment_URL}/rents/flat-status`,
        method: "GET",
      }),
      providesTags: [tagTypes.monthlyPayment],
    }),
    addMonthlyPayment: build.mutation({
      query: (data) => ({
        url: `${MonthlyPayment_URL}/monthly-rent-payments`,
        method: "POST",
        data: data,
      }),

      invalidatesTags: [tagTypes.monthlyPayment],
    }),
    addRegularMonthlyPayment: build.mutation({
      query: (data) => ({
        url: `${MonthlyPayment_URL}/regular-monthly-payments`,
        method: "POST",
        data: data,
      }),

      invalidatesTags: [tagTypes.monthlyPayment],
    }),
    monthWiseTotals: build.query({
      query: () => ({
        url: `${MonthlyPayment_URL}/rents/month-wise-totals`,
        method: "GET",
      }),
      providesTags: [tagTypes.property],
    }),
    addMonthlyPaymentToStripe: build.mutation({
      query: (data) => ({
        url: "/MonthlyPayment/create-MonthlyPayment-intent",
        method: "POST",
        data: data,
      }),
      transformResponse: (response, meta: IMeta) => {
        return {
          properties: response,
          meta,
        };
      },
      invalidatesTags: [tagTypes.monthlyPayment],
    }),
    updateMonthlyPayment: build.mutation({
      query: (data) => ({
        url: `${MonthlyPayment_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.monthlyPayment],
    }),
    deleteMonthlyPayment: build.mutation({
      query: (id) => ({
        url: `${MonthlyPayment_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.monthlyPayment],
    }),
  }),
});

export const {
  useMonthlyPaymentsQuery,
  useSingleMonthlyPaymentQuery,
  useAddMonthlyPaymentMutation,
  useAddRegularMonthlyPaymentMutation,
  useDeleteMonthlyPaymentMutation,
  useUpdateMonthlyPaymentMutation,
  useSingleUserMonthlyPaymentQuery,
  useAddMonthlyPaymentToStripeMutation,
  useRentManagementQuery,
  useTotalMonthlyPaymentQuery,
  useCurrentMonthMonthlyPaymentQuery,
  useMonthWiseTotalsQuery,
  useCurrentBookingStatusQuery,
} = MonthlyPaymentApi;
