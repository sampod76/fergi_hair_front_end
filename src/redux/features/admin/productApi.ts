import { IMeta } from '../../../types/common';
import { IFileAfterUpload } from '../../../types/globalType';
import { baseApi } from '../../api/baseApi';
import { tagTypes } from '../../tag-types';

const URL = '/products';
type Pricing = {
  price: number;
  currency: string;
  discount?: number;
  vat?: number;
};

export interface IProduct {
  _id: string;
  name: string;
  subTitle?: string;
  images?: IFileAfterUpload[]; // Adjust type accordingly
  author: any; // Adjust type accordingly
  description?: string;
  productCategoryId?: string;
  productCategoryName?: string;
  pricing?: Pricing;
  serialNumber?: number;
  status?: string; // Adjust ENUM_STATUS accordingly
  isDelete?: boolean;
}
export const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllProduct: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: URL,
          method: 'GET',
          params: arg,
        };
      },
      transformResponse: (response: IProduct[], meta: IMeta) => {
        return {
          data: response,
          meta,
        };
      },
      providesTags: [tagTypes.Product],
    }),

    getSingleProduct: build.query({
      query: (id: string | string[] | undefined) => {
        return {
          url: `${URL}/${id}`,
          method: 'GET',
        };
      },
      transformResponse: (response: IProduct) => response,
      providesTags: [tagTypes.Product],
    }),

    addProduct: build.mutation({
      query: (data) => {
        return {
          url: URL,
          method: 'POST',
          data: data,
          contentType: 'multipart/form-data',
        };
      },
      invalidatesTags: [tagTypes.Product],
    }),

    updateProduct: build.mutation({
      query: ({ data, id }) => {
        return {
          url: `${URL}/${id}`,
          method: 'PATCH',
          data: data,
          contentType: 'multipart/form-data',
        };
      },
      invalidatesTags: [tagTypes.Product],
    }),
    updateProductSerialNumber: build.mutation({
      query: ({ data }: { data: Record<string, any> }) => {
        return {
          url: `${URL}/serialnumber-update`,
          method: 'PATCH',
          data: data,
          // contentType: 'multipart/form-data',
        };
      },
      invalidatesTags: [tagTypes.Product],
    }),

    deleteProduct: build.mutation({
      query: (id: string) => ({
        url: `${URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.Product],
    }),
  }),
});

export const {
  useAddProductMutation,
  useDeleteProductMutation,
  useGetAllProductQuery,
  useGetSingleProductQuery,
  useUpdateProductMutation,
  useUpdateProductSerialNumberMutation,
} = productApi;
