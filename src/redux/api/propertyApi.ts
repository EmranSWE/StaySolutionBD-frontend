import { IMeta } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";
const PROPERTY_URL = "/property";

export const propertyApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    properties: build.query({
      query: (arg: Record<string, any>) => ({
        url: PROPERTY_URL,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.property],
    }),
    singleProperty: build.query({
      query: (id) => ({
        url: `${PROPERTY_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.property],
    }),
    featuredProperty: build.query({
      query: () => ({
        url: `${PROPERTY_URL}/featured-property`,
        method: "GET",
      }),
      providesTags: [tagTypes.property],
    }),
    availableProperty: build.query({
      query: () => ({
        url: `${PROPERTY_URL}/available-property`,
        method: "GET",
      }),
      providesTags: [tagTypes.property],
    }),
    bookedProperty: build.query({
      query: () => ({
        url: `${PROPERTY_URL}/booked-property`,
        method: "GET",
      }),
      providesTags: [tagTypes.property],
    }),
    popularCategory: build.query({
      query: () => ({
        url: `${PROPERTY_URL}/popular-category`,
        method: "GET",
      }),
      providesTags: [tagTypes.property],
    }),
    singleUserProperty: build.query({
      query: (id) => ({
        url: `${PROPERTY_URL}/my-property/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.property],
    }),

    singleRenterProperty: build.query({
      query: (id) => ({
        url: `${PROPERTY_URL}/properties/${id}/my-property`,
        method: "GET",
      }),
      providesTags: [tagTypes.property],
    }),
    addProperty: build.mutation({
      query: (data) => ({
        url: PROPERTY_URL,
        method: "POST",
        data,
        contentType: "multipart/form-data",
      }),

      invalidatesTags: [tagTypes.property],
    }),
    updateProperty: build.mutation({
      query: (data) => ({
        url: `${PROPERTY_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.property],
    }),
    deleteProperty: build.mutation({
      query: (id) => ({
        url: `${PROPERTY_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.property],
    }),
  }),
});

export const {
  usePropertiesQuery,
  useFeaturedPropertyQuery,
  useSinglePropertyQuery,
  useAddPropertyMutation,
  useDeletePropertyMutation,
  useUpdatePropertyMutation,
  useSingleUserPropertyQuery,
  useSingleRenterPropertyQuery,
  usePopularCategoryQuery,
  useAvailablePropertyQuery,
  useBookedPropertyQuery,
} = propertyApi;
