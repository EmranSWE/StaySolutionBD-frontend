import { IMeta } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";
const MARKETPLACE_URL = "/marketplace";

export const marketplaceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //Get all data
    marketplaces: build.query({
      query: (arg: Record<string, any>) => ({
        url: MARKETPLACE_URL,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.marketplace],
    }),
    // Get single data
    marketplace: build.query({
      query: (id) => ({
        url: `${MARKETPLACE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.marketplace],
    }),
    //Get Single User Data
    singleUserMarketplaceData: build.query({
      query: (id) => ({
        url: `${MARKETPLACE_URL}/my-marketplace/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.marketplace],
    }),
    //Create a new data
    addToMarketplace: build.mutation({
      query: (data) => ({
        url: MARKETPLACE_URL,
        method: "POST",
        data,
        contentType: "multipart/form-data",
      }),
      //   transformResponse: (response, meta: IMeta) => {
      //     return {
      //       properties: response,
      //       meta,
      //     };
      //   },
      invalidatesTags: [tagTypes.marketplace],
    }),
    //Update the data
    updateProperty: build.mutation({
      query: (data) => ({
        url: `${MARKETPLACE_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.marketplace],
    }),
    //Delete the data
    deleteMarketplaceData: build.mutation({
      query: (id) => ({
        url: `${MARKETPLACE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.marketplace],
    }),
  }),
});

export const {
  useAddToMarketplaceMutation,
  useMarketplacesQuery,
  useSingleUserMarketplaceDataQuery,
  useDeleteMarketplaceDataMutation,
} = marketplaceApi;
