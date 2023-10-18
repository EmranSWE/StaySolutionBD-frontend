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
    addProperty: build.mutation({
      query: (data) => ({
        url: PROPERTY_URL,
        method: "POST",
        data,
      }),
      transformResponse: (response, meta: IMeta) => {
        return {
          properties: response,
          meta,
        };
      },
      invalidatesTags: [tagTypes.property],
    }),
  }),
});

export const { usePropertiesQuery, useAddPropertyMutation } = propertyApi;
