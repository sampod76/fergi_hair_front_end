import { IMeta } from '../../../types/common';
import { IFileAfterUpload } from '../../../types/globalType';
import { baseApi } from '../../api/baseApi';
import { tagTypes } from '../../tag-types';
interface Address {
  area: string;
}
interface Author {
  role: string;
  userId: string;
  roleBaseUserId: string;
}
export interface ISubmission {
  _id: string;
  categoryId: string;
  categoryName: string;
  company: string;
  author: Author;
  files: IFileAfterUpload[];
  truckNumber: string;
  trailerNumber: string;
  uploadedDate: string;
  manifestNumber: string;
  dateOfLoading: string;
  address: Address;
  isDelete: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
const URL = '/submissions';

export const submissionsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllSubmissions: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: URL,
          method: 'GET',
          params: arg,
        };
      },
      transformResponse: (response: ISubmission[], meta: IMeta) => {
        return {
          data: response,
          meta,
        };
      },
      providesTags: [tagTypes.Submissions],
    }),

    getSingleSubmissions: build.query({
      query: (id: string | string[] | undefined) => {
        return {
          url: `${URL}/${id}`,
          method: 'GET',
        };
      },
      transformResponse: (response: ISubmission) => ({ data: response }),
      providesTags: [tagTypes.Submissions],
    }),

    addSubmissions: build.mutation({
      query: (data) => {
        return {
          url: URL,
          method: 'POST',
          data: data,
        };
      },
      invalidatesTags: [tagTypes.Submissions],
    }),

    updateSubmissions: build.mutation({
      query: ({ data, id }) => {
        return {
          url: `${URL}/${id}`,
          method: 'PATCH',
          data: data,
        };
      },
      invalidatesTags: [tagTypes.Submissions],
    }),

    deleteSubmissions: build.mutation({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.Submissions],
    }),
  }),
});

export const {
  useAddSubmissionsMutation,
  useDeleteSubmissionsMutation,
  useGetAllSubmissionsQuery,
  useGetSingleSubmissionsQuery,
  useUpdateSubmissionsMutation,
} = submissionsApi;
