import { IMeta } from '../../../types/common';
import { IFileAfterUpload } from '../../../types/globalType';
import { baseApi } from '../../api/baseApi';
import { tagTypes } from '../../tag-types';

const CATEGORY_URL = '/category';
export interface ICategory {
  _id: string;
  title: string;
  subTitle: string;
  company: string;
  image: IFileAfterUpload;
  files: IFileAfterUpload[];
  serialNumber: number;
  status: string;
  isDelete: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllCategory: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: CATEGORY_URL,
          method: 'GET',
          params: arg,
        };
      },
      transformResponse: (response: ICategory[], meta: IMeta) => {
        return {
          data: response,
          meta,
        };
      },
      providesTags: [tagTypes.category],
    }),

    getSingleCategory: build.query({
      query: (id: string | string[] | undefined) => {
        return {
          url: `${CATEGORY_URL}/${id}`,
          method: 'GET',
        };
      },
      transformResponse: (response: ICategory) => ({ data: response }),
      providesTags: [tagTypes.category],
    }),

    addCategory: build.mutation({
      query: (data) => {
        return {
          url: CATEGORY_URL,
          method: 'POST',
          data: data,
          contentType: 'multipart/form-data',
        };
      },
      invalidatesTags: [tagTypes.category],
    }),

    updateCategory: build.mutation({
      query: ({ data, id }: { data: any; id: string }) => {
        return {
          url: `${CATEGORY_URL}/${id}`,
          method: 'PATCH',
          data: data,
          // contentType: 'multipart/form-data',
        };
      },
      invalidatesTags: [tagTypes.category],
    }),
    updateCategorySerialNumber: build.mutation({
      query: ({ data }: { data: Record<string, any> }) => {
        return {
          url: `${CATEGORY_URL}/serialnumber-update`,
          method: 'PATCH',
          data: data,
          // contentType: 'multipart/form-data',
        };
      },
      invalidatesTags: [tagTypes.category],
    }),

    deleteCategory: build.mutation({
      query: (id: string) => ({
        url: `${CATEGORY_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.category],
    }),
  }),
});

export const {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoryQuery,
  useGetSingleCategoryQuery,
  useUpdateCategoryMutation,
  useUpdateCategorySerialNumberMutation,
} = categoryApi;
