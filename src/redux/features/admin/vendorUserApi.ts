import { IMeta } from '../../../types/common';
import { baseApi } from '../../api/baseApi';
import { tagTypes } from '../../tag-types';

const URL = '/vendor';

export const vendorUserApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllVendor: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: URL,
          method: 'GET',
          params: arg,
        };
      },
      transformResponse: (response: any, meta: IMeta) => {
        return {
          data: response,
          meta,
        };
      },
      providesTags: [tagTypes.vendor],
    }),

    getSingleVendor: build.query({
      query: (id: string | string[] | undefined) => {
        return {
          url: `${URL}/${id}`,
          method: 'GET',
        };
      },
      transformResponse: (response: any) => ({ data: response }),
      providesTags: [tagTypes.vendor],
    }),

    addVendor: build.mutation({
      query: (data) => {
        return {
          url: URL,
          method: 'POST',
          data: data,
        };
      },
      invalidatesTags: [tagTypes.vendor],
    }),

    updateVendor: build.mutation({
      query: ({ data, id }: { id: string; data: any }) => {
        return {
          url: `${URL}/${id}`,
          method: 'PATCH',
          data: data,
        };
      },
      invalidatesTags: [tagTypes.vendor],
    }),

    deleteVendor: build.mutation({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.vendor],
    }),
  }),
});

export const {
  useAddVendorMutation,
  useDeleteVendorMutation,
  useGetAllVendorQuery,
  useGetSingleVendorQuery,
  useUpdateVendorMutation,
} = vendorUserApi;
