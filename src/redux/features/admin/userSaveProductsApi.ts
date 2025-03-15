import { IMeta } from '../../../types/common';
import { IFileAfterUpload } from '../../../types/globalType';
import { baseApi } from '../../api/baseApi';
import { tagTypes } from '../../tag-types';

const URL = '/user-save-products';

export interface IUserSaveProduct {
  _id: string;
  name: string;
  subTitle?: string;
  images?: IFileAfterUpload[]; // Adjust this type accordingly
  author: any; // Adjust this type accordingly
  description?: string;
  productCategoryId?: string;
  serialNumber?: number;
  status?: string;
  isDelete?: boolean;
}
export const userSaveProductsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllUserSaveProducts: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: URL,
          method: 'GET',
          params: arg,
        };
      },
      transformResponse: (response: IUserSaveProduct[], meta: IMeta) => {
        return {
          data: response,
          meta,
        };
      },
      providesTags: [tagTypes.UserSaveProduct],
    }),

    getSingleUserSaveProducts: build.query({
      query: (id: string | string[] | undefined) => {
        return {
          url: `${URL}/${id}`,
          method: 'GET',
        };
      },
      transformResponse: (response: IUserSaveProduct) => response,
      providesTags: [tagTypes.UserSaveProduct],
    }),

    addUserSaveProducts: build.mutation({
      query: (data) => {
        return {
          url: URL,
          method: 'POST',
          data: data,
          // contentType: 'multipart/form-data',
        };
      },
      invalidatesTags: [tagTypes.UserSaveProduct],
    }),

    updateUserSaveProducts: build.mutation({
      query: ({ data, id }) => {
        return {
          url: `${URL}/${id}`,
          method: 'PATCH',
          data: data,
          // contentType: 'multipart/form-data',
        };
      },
      invalidatesTags: [tagTypes.UserSaveProduct],
    }),
    updateUserSaveProductsSerialNumber: build.mutation({
      query: ({ data }: { data: Record<string, any> }) => {
        return {
          url: `${URL}/serialnumber-update`,
          method: 'PATCH',
          data: data,
          // contentType: 'multipart/form-data',
        };
      },
      invalidatesTags: [tagTypes.UserSaveProduct],
    }),

    deleteUserSaveProducts: build.mutation({
      query: (id: string) => ({
        url: `${URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.UserSaveProduct],
    }),
  }),
});

export const {
  useAddUserSaveProductsMutation,
  useDeleteUserSaveProductsMutation,
  useGetAllUserSaveProductsQuery,
  useGetSingleUserSaveProductsQuery,
  useUpdateUserSaveProductsMutation,
  useUpdateUserSaveProductsSerialNumberMutation,
} = userSaveProductsApi;
