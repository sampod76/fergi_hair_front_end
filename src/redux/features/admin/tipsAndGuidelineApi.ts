import { IMeta } from '../../../types/common';
import { baseApi } from '../../api/baseApi';
import { tagTypes } from '../../tag-types';

const URL = '/tips-guideline';

export interface ITipsAndGuid {
  _id: string;
  productId: string;
  productTitle: string;
  author: any;
  serialNumber?: number;
  status?: string; // Adjust ENUM_STATUS accordingly
  isDelete?: boolean;
}
export const tipsAndGuidelineApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllTipsAndGuideline: build.query({
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

    getSingleTipsAndGuideline: build.query({
      query: (id: string | string[] | undefined) => {
        return {
          url: `${URL}/${id}`,
          method: 'GET',
        };
      },
      transformResponse: (response: ITipsAndGuid) => response,
      providesTags: [tagTypes.TipsAndGuid],
    }),

    addTipsAndGuideline: build.mutation({
      query: (data) => {
        return {
          url: URL,
          method: 'POST',
          data: data,
          contentType: 'multipart/form-data',
        };
      },
      invalidatesTags: [tagTypes.TipsAndGuid],
    }),

    updateTipsAndGuideline: build.mutation({
      query: ({ data, id }) => {
        return {
          url: `${URL}/${id}`,
          method: 'PATCH',
          data: data,
          contentType: 'multipart/form-data',
        };
      },
      invalidatesTags: [tagTypes.TipsAndGuid],
    }),
    updateTipsAndGuidelineSerialNumber: build.mutation({
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

    deleteTipsAndGuideline: build.mutation({
      query: (id: string) => ({
        url: `${URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.TipsAndGuid],
    }),
  }),
});

export const {
  useAddTipsAndGuidelineMutation,
  useDeleteTipsAndGuidelineMutation,
  useGetAllTipsAndGuidelineQuery,
  useGetSingleTipsAndGuidelineQuery,
  useUpdateTipsAndGuidelineMutation,
  useUpdateTipsAndGuidelineSerialNumberMutation,
} = tipsAndGuidelineApi;
