import { IMeta } from '../../../types/common';
import { baseApi } from '../../api/baseApi';
import { tagTypes } from '../../tag-types';

const URL = '/tips-guideline';

export interface ITipsAndGuid {
  productId: string;
  productTitle: string;
  author: any;
  serialNumber?: number;
  status?: string; // Adjust ENUM_STATUS accordingly
  isDelete?: boolean;
}
export const tipsAndGuidelineApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllProductCategory: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: URL,
          method: 'GET',
          params: arg,
        };
      },
      transformResponse: (response: ITipsAndGuid[], meta: IMeta) => {
        return {
          data: response,
          meta,
        };
      },
      providesTags: [tagTypes.TipsAndGuid],
    }),

    getSingleProductCategory: build.query({
      query: (id: string | string[] | undefined) => {
        return {
          url: `${URL}/${id}`,
          method: 'GET',
        };
      },
      transformResponse: (response: ITipsAndGuid) => response,
      providesTags: [tagTypes.TipsAndGuid],
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
      invalidatesTags: [tagTypes.TipsAndGuid],
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
      invalidatesTags: [tagTypes.TipsAndGuid],
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
      invalidatesTags: [tagTypes.TipsAndGuid],
    }),

    deleteProductCategory: build.mutation({
      query: (id: string) => ({
        url: `${URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.TipsAndGuid],
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
} = tipsAndGuidelineApi;
