import { IMeta } from '../../../types/common';
import { IFileAfterUpload } from '../../../types/globalType';
import { baseApi } from '../../api/baseApi';
import { tagTypes } from '../../tag-types';

const URL = '/products-category';
export interface IProductCategory {
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
export const productCategoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllProductCategory: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: URL,
          method: 'GET',
          params: arg,
        };
      },
      transformResponse: (response: IProductCategory[], meta: IMeta) => {
        return {
          data: response,
          meta,
        };
      },
      providesTags: [tagTypes.ProductCategory],
    }),

    getSingleProductCategory: build.query({
      query: (id: string | string[] | undefined) => {
        return {
          url: `${URL}/${id}`,
          method: 'GET',
        };
      },
      transformResponse: (response: IProductCategory) => ({ data: response }),
      providesTags: [tagTypes.ProductCategory],
    }),

    addProductCategory: build.mutation({
      query: (data) => {
        return {
          url: URL,
          method: 'POST',
          data: data,
          contentType: 'multipart/form-data',
        };
      },
      invalidatesTags: [tagTypes.ProductCategory],
    }),

    updateProductCategory: build.mutation({
      query: ({ data, id }) => {
        return {
          url: `${URL}/${id}`,
          method: 'PATCH',
          data: data,
          contentType: 'multipart/form-data',
        };
      },
      invalidatesTags: [tagTypes.ProductCategory],
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
      invalidatesTags: [tagTypes.ProductCategory],
    }),

    deleteProductCategory: build.mutation({
      query: (id: string) => ({
        url: `${URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.ProductCategory],
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
} = productCategoryApi;
