import { IMeta } from '../../../types/common';
import { IFileAfterUpload } from '../../../types/globalType';
import { baseApi } from '../../api/baseApi';
import { tagTypes } from '../../tag-types';

const URL = '/testimonials';
export type CreateTestimonialsFieldBodyDate = {
  title?: string;
  subTitle?: string;
  description?: string;
  image: IFileAfterUpload;
  company: string;
  user?: string;
  startDate?: string | Date;
  endDate?: string | Date;
};
export const testimonialsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllTestimonial: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: URL,
          method: 'GET',
          params: arg,
        };
      },
      transformResponse: (
        response: CreateTestimonialsFieldBodyDate[],
        meta: IMeta
      ) => {
        return {
          data: response,
          meta,
        };
      },
      providesTags: [tagTypes.testimonials],
    }),

    getSingleTestimonial: build.query({
      query: (id: string | string[] | undefined) => {
        return {
          url: `${URL}/${id}`,
          method: 'GET',
        };
      },
      transformResponse: (response: CreateTestimonialsFieldBodyDate) => ({
        data: response,
      }),
      providesTags: [tagTypes.testimonials],
    }),

    addTestimonial: build.mutation({
      query: (data) => {
        return {
          url: URL,
          method: 'POST',
          data: data,
          contentType: 'multipart/form-data',
        };
      },
      invalidatesTags: [tagTypes.testimonials],
    }),

    updateTestimonial: build.mutation({
      query: ({ data, id }: { data: any; id: string }) => {
        return {
          url: `${URL}/${id}`,
          method: 'PATCH',
          data: data,
          contentType: 'multipart/form-data',
        };
      },
      invalidatesTags: [tagTypes.testimonials],
    }),

    deleteTestimonial: build.mutation({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.testimonials],
    }),
  }),
});

export const {
  useAddTestimonialMutation,
  useDeleteTestimonialMutation,
  useGetAllTestimonialQuery,
  useGetSingleTestimonialQuery,
  useUpdateTestimonialMutation,
} = testimonialsApi;
