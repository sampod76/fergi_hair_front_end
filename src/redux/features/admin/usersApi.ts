import { IFileAfterUpload } from '@local-types/globalType';
import { IMeta } from '../../../types/common';
import { baseApi } from '../../api/baseApi';
import { tagTypes } from '../../tag-types';

const URL = '/users';
export interface ICategory {
  value?: string;
  label?: string;
  uid?: string;
  children?: ICategory & { children: ICategory };
}

export interface IUser {
  _id: string;
  userUniqueId: string;
  userId?: string;
  email: string;
  accountType?: string;
  authUserId?: string; // Vendor reference
  name?: {
    firstName?: string;
    lastName?: string;
  };
  address?: {
    area?: string;
  };
  country?: {
    name?: string;
    flag?: { url?: string };
    isoCode?: string;
  };
  contactNumber?: string;
  dateOfBirth?: Date;
  category?: ICategory[];
  profileImage?: IFileAfterUpload; // Adjust this type accordingly
  verify?: string;
  author?: any; // Adjust this type accordingly
  status?: string;
  isDelete?: boolean;
  createdAt: string;
}

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllUser: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: URL,
          method: 'GET',
          params: arg,
        };
      },
      transformResponse: (response: IUser, meta: IMeta) => {
        return {
          data: response,
          meta,
        };
      },
      providesTags: [tagTypes.User],
    }),
    getDashboard: build.query({
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
      providesTags: [tagTypes.User],
    }),

    getSingleUser: build.query({
      query: (id: string | string[] | undefined) => {
        return {
          url: `${URL}/${id}`,
          method: 'GET',
        };
      },
      transformResponse: (response: IUser) => response,
      providesTags: [tagTypes.User],
    }),

    addUser: build.mutation({
      query: (data) => {
        return {
          url: URL,
          method: 'POST',
          data: data,
        };
      },
      invalidatesTags: [tagTypes.User],
    }),

    updateUser: build.mutation({
      query: ({ data, id }) => {
        return {
          url: `${URL}/${id}`,
          method: 'PATCH',
          data: data,
        };
      },
      invalidatesTags: [tagTypes.User],
    }),

    deleteUser: build.mutation({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.User],
    }),
  }),
});

export const {
  useAddUserMutation,
  useDeleteUserMutation,
  useGetAllUserQuery,
  useGetSingleUserQuery,
  useUpdateUserMutation,
  //
  useGetDashboardQuery,
} = userApi;
