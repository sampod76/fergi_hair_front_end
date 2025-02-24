import { IMeta } from '../../../types/common';
import { baseApi } from '../../api/baseApi';
import { tagTypes } from '../../tag-types';

const URL = '/general-users';

export const generalUserApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllGeneralUser: build.query({
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
      providesTags: [tagTypes.GeneralUser],
    }),
    getGeneralUserVendorUser: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: URL + '/dashboard',
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
      providesTags: [tagTypes.GeneralUser],
    }),

    getSingleGeneralUser: build.query({
      query: (id: string | string[] | undefined) => {
        return {
          url: `${URL}/${id}`,
          method: 'GET',
        };
      },
      transformResponse: (response: any) => ({ data: response }),
      providesTags: [tagTypes.GeneralUser],
    }),

    addGeneralUser: build.mutation({
      query: (data) => {
        return {
          url: URL,
          method: 'POST',
          data: data,
        };
      },
      invalidatesTags: [tagTypes.GeneralUser],
    }),

    updateGeneralUser: build.mutation({
      query: ({ data, id }) => {
        return {
          url: `${URL}/${id}`,
          method: 'PATCH',
          data: data,
        };
      },
      invalidatesTags: [tagTypes.GeneralUser],
    }),

    deleteGeneralUser: build.mutation({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.GeneralUser],
    }),
  }),
});

export const {
  useAddGeneralUserMutation,
  useDeleteGeneralUserMutation,
  useGetAllGeneralUserQuery,
  useGetSingleGeneralUserQuery,
  useUpdateGeneralUserMutation,
  useGetGeneralUserVendorUserQuery,
} = generalUserApi;
