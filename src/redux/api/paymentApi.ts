import { IMeta } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";
const PAYMENT_URL = "/payment";

export const PaymentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    payments: build.query({
      query: (arg: Record<string, any>) => ({
        url: PAYMENT_URL,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.payment],
    }),
    singlePayment: build.query({
      query: (id) => ({
        url: `${PAYMENT_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.payment],
    }),
    singleUserPayment: build.query({
      query: (id) => ({
        url: `${PAYMENT_URL}/my-Payment/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.payment],
    }),
    addPayment: build.mutation({
      query: (data) => ({
        url: PAYMENT_URL,
        method: "POST",
        data: data,
      }),
      transformResponse: (response, meta: IMeta) => {
        return {
          properties: response,
          meta,
        };
      },
      invalidatesTags: [tagTypes.payment],
    }),
    addPaymentToStripe: build.mutation({
      query: (data) => ({
        url: "/payment/create-payment-intent",
        method: "POST",
        data: data,
      }),
      transformResponse: (response, meta: IMeta) => {
        return {
          properties: response,
          meta,
        };
      },
      invalidatesTags: [tagTypes.payment],
    }),
    updatePayment: build.mutation({
      query: (data) => ({
        url: `${PAYMENT_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.payment],
    }),
    deletePayment: build.mutation({
      query: (id) => ({
        url: `${PAYMENT_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.payment],
    }),
  }),
});

export const {
  usePaymentsQuery,
  useSinglePaymentQuery,
  useAddPaymentMutation,
  useDeletePaymentMutation,
  useUpdatePaymentMutation,
  useSingleUserPaymentQuery,
  useAddPaymentToStripeMutation,
} = PaymentApi;
