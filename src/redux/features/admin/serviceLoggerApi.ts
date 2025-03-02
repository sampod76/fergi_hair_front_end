import { IFileAfterUpload } from '@local-types/globalType';
import { IMeta } from '../../../types/common';
import { baseApi } from '../../api/baseApi';
import { tagTypes } from '../../tag-types';

const URL = '/user-save-products';
interface ICategoryValue {
  label: string;
  value: string;
  uid: string;
}
export interface IServiceLogger {
  _id: string;
  logType?: String;
  logDate?: Date;
  author: any; // Adjust this type accordingly
  images?: IFileAfterUpload[]; // Adjust this type accordingly

  // Log Categories
  Wash_Day_Mood?: ICategoryValue;
  Choice_of_Treatment?: ICategoryValue;
  Post_Wash_Day_Style?: ICategoryValue;
  Hair_Health?: ICategoryValue;

  // Log Style Archive
  What_Style_Did_You_Do?: ICategoryValue;
  Style_Rating?: ICategoryValue;
  Hair_Service_Quality?: ICategoryValue;
  Duration_of_style_wear?: ICategoryValue;
  Maintenance_Routine?: ICategoryValue;

  // Log Trim Tracker
  Haircut_Type?: ICategoryValue;
  Length_Cut?: ICategoryValue;

  serialNumber?: number;
  status?: string;
  isDelete?: boolean;
}
export const serviceLoggerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllServiceLogger: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: URL,
          method: 'GET',
          params: arg,
        };
      },
      transformResponse: (response: IServiceLogger[], meta: IMeta) => {
        return {
          data: response,
          meta,
        };
      },
      providesTags: [tagTypes.ServiceLogger],
    }),

    getSingleServiceLogger: build.query({
      query: (id: string | string[] | undefined) => {
        return {
          url: `${URL}/${id}`,
          method: 'GET',
        };
      },
      transformResponse: (response: IServiceLogger) => response,
      providesTags: [tagTypes.ServiceLogger],
    }),

    addServiceLogger: build.mutation({
      query: (data) => {
        return {
          url: URL,
          method: 'POST',
          data: data,
          // contentType: 'multipart/form-data',
        };
      },
      invalidatesTags: [tagTypes.ServiceLogger],
    }),

    updateServiceLogger: build.mutation({
      query: ({ data, id }) => {
        return {
          url: `${URL}/${id}`,
          method: 'PATCH',
          data: data,
          // contentType: 'multipart/form-data',
        };
      },
      invalidatesTags: [tagTypes.ServiceLogger],
    }),
    updateServiceLoggerSerialNumber: build.mutation({
      query: ({ data }: { data: Record<string, any> }) => {
        return {
          url: `${URL}/serialnumber-update`,
          method: 'PATCH',
          data: data,
          // contentType: 'multipart/form-data',
        };
      },
      invalidatesTags: [tagTypes.ServiceLogger],
    }),

    deleteServiceLogger: build.mutation({
      query: (id: string) => ({
        url: `${URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.ServiceLogger],
    }),
  }),
});

export const {
  useAddServiceLoggerMutation,
  useDeleteServiceLoggerMutation,
  useGetAllServiceLoggerQuery,
  useGetSingleServiceLoggerQuery,
  useUpdateServiceLoggerMutation,
  useUpdateServiceLoggerSerialNumberMutation,
} = serviceLoggerApi;
