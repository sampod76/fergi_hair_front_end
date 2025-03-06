import { IMeta } from '../../../types/common';
import { baseApi } from '../../api/baseApi';
import { tagTypes } from '../../tag-types';

const URL = '/admin-setting';

export const adminSettingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllAdminSetting: build.query({
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
      providesTags: [tagTypes.admin],
    }),
    getDashboard: build.query({
      query: (arg) => {
        return {
          url: URL + '/admin-dashboard',
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
      providesTags: [tagTypes.admin],
    }),

    getSingleAdminSetting: build.query({
      query: (id: string | string[] | undefined) => {
        return {
          url: `${URL}/${id}`,
          method: 'GET',
        };
      },
      transformResponse: (response: any) => ({ data: response }),
      providesTags: [tagTypes.admin],
    }),

    addAdminSetting: build.mutation({
      query: (data) => {
        return {
          url: URL,
          method: 'POST',
          data: data,
        };
      },
      invalidatesTags: [tagTypes.admin],
    }),

    updateAdminSetting: build.mutation({
      query: ({ data, id }: { id: string; data: any }) => {
        return {
          url: `${URL}/${id}`,
          method: 'PATCH',
          data: data,
        };
      },
      invalidatesTags: [tagTypes.admin],
    }),

    deleteAdminSetting: build.mutation({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.admin],
    }),
  }),
});

export const {
  useAddAdminSettingMutation,
  useDeleteAdminSettingMutation,
  useGetAllAdminSettingQuery,
  useGetSingleAdminSettingQuery,
  useUpdateAdminSettingMutation,
  //
} = adminSettingApi;
