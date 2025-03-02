import { IMeta } from '../../../types/common';
import { baseApi } from '../../api/baseApi';
import { tagTypes } from '../../tag-types';

const URL = '/user-save-products';

export interface IRoutingReminder {
  reminderType?: string;
  scheduleType?: string;
  month?: string;
  pickDate?: Date;
  daysOfWeek?: string[];
  startTime?: string; // HH:mm format
  endTime?: string;
  productUseDetails?: string;
  applicationStepsDetails?: string;
  cornJob?: {
    isActive?: boolean;
    jobId?: string;
  };
  author: any; // Adjust this type accordingly
  serialNumber?: number;
  status?: string;
  isDelete?: boolean;
}
export const routingReminderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllProductCategory: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: URL,
          method: 'GET',
          params: arg,
        };
      },
      transformResponse: (response: IRoutingReminder[], meta: IMeta) => {
        return {
          data: response,
          meta,
        };
      },
      providesTags: [tagTypes.RoutingReminder],
    }),

    getSingleProductCategory: build.query({
      query: (id: string | string[] | undefined) => {
        return {
          url: `${URL}/${id}`,
          method: 'GET',
        };
      },
      transformResponse: (response: IRoutingReminder) => response,
      providesTags: [tagTypes.RoutingReminder],
    }),

    addProductCategory: build.mutation({
      query: (data) => {
        return {
          url: URL,
          method: 'POST',
          data: data,
          // contentType: 'multipart/form-data',
        };
      },
      invalidatesTags: [tagTypes.RoutingReminder],
    }),

    updateProductCategory: build.mutation({
      query: ({ data, id }) => {
        return {
          url: `${URL}/${id}`,
          method: 'PATCH',
          data: data,
          // contentType: 'multipart/form-data',
        };
      },
      invalidatesTags: [tagTypes.RoutingReminder],
    }),
    updateProductCategorySerialNumber: build.mutation({
      query: ({ data }: { data: Record<string, any> }) => {
        return {
          url: `${URL}/serialnumber-update`,
          method: 'PATCH',
          data: data,
          // contentType: 'multipart/form-data',
        };
      },
      invalidatesTags: [tagTypes.RoutingReminder],
    }),

    deleteProductCategory: build.mutation({
      query: (id: string) => ({
        url: `${URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.RoutingReminder],
    }),
  }),
});

export const {
  useAddProductCategoryMutation,
  useDeleteProductCategoryMutation,
  useGetAllProductCategoryQuery,
  useGetSingleProductCategoryQuery,
  useUpdateProductCategoryMutation,
  useUpdateProductCategorySerialNumberMutation,
} = routingReminderApi;
