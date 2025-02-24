import { IMeta } from '../../../types/common';
import { baseApi } from '../../api/baseApi';
import { tagTypes } from '../../tag-types';

const URL = '/order';

export const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllOrder: build.query({
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
      providesTags: [tagTypes.Order],
    }),
    getOrderDashboard: build.query({
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
      providesTags: [tagTypes.Order],
    }),

    getSingleOrder: build.query({
      query: (id: string | string[] | undefined) => {
        return {
          url: `${URL}/${id}`,
          method: 'GET',
        };
      },
      transformResponse: (response: any) => ({ data: response }),
      providesTags: [tagTypes.Order],
    }),

    addOrder: build.mutation({
      query: (data) => {
        return {
          url: URL,
          method: 'POST',
          data: data,
        };
      },
      invalidatesTags: [tagTypes.Order],
    }),

    updateOrder: build.mutation({
      query: ({ data, id }: { data: any; id: string }) => {
        return {
          url: `${URL}/${id}`,
          method: 'PATCH',
          data: data,
          //   contentType: 'multipart/form-data',
        };
      },
      invalidatesTags: [tagTypes.Order],
    }),

    deleteOrder: build.mutation({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.Order],
    }),
  }),
});

export const {
  useAddOrderMutation,
  useDeleteOrderMutation,
  useGetAllOrderQuery,
  useGetSingleOrderQuery,
  useUpdateOrderMutation,
  //
  useGetOrderDashboardQuery,
} = orderApi;
