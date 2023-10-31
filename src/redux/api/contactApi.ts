import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";
const Contact_URL = "/contact";

export const ContactApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    contacts: build.query({
      query: () => ({
        url: Contact_URL,
        method: "GET",
      }),
      providesTags: [tagTypes.contact],
    }),
    singleContact: build.query({
      query: (id) => ({
        url: `${Contact_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.contact],
    }),

    addContact: build.mutation({
      query: (data) => ({
        url: Contact_URL,
        method: "POST",
        data,
      }),

      invalidatesTags: [tagTypes.contact],
    }),
    updateContact: build.mutation({
      query: (data) => ({
        url: `${Contact_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.contact],
    }),
    deleteContact: build.mutation({
      query: (id) => ({
        url: `${Contact_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.contact],
    }),
  }),
});

export const {
  useContactsQuery,
  useSingleContactQuery,
  useAddContactMutation,
  useDeleteContactMutation,
  useUpdateContactMutation,
} = ContactApi;
