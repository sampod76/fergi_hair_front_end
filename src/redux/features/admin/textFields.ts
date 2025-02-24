import { baseApi } from '../../api/baseApi';
import { tagTypes } from '../../tag-types';

const TEXT_FIELDS = '/all-text-fields';

export const textFieldsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all academic departments
    getAllTextFiled: build.query({
      query: (arg) => {
        return {
          url: TEXT_FIELDS,
          method: 'GET',
          params: arg,
        };
      },
      transformResponse: (response: any[], meta) => {
        return {
          data: response,
          meta,
        };
      },
      providesTags: [tagTypes.allTextFieldFilters],
    }),
    // get single academic department
    getSingleTextFiled: build.query({
      query: (id) => {
        // console.log(id);
        return {
          url: `${TEXT_FIELDS}/${id}`,
          method: 'GET',
        };
      },

      providesTags: [tagTypes.allTextFieldFilters],
    }),

    // create a new academic department
    addTextFiled: build.mutation({
      query: (data) => {
        // console.log(data, "cacccc");
        return {
          url: TEXT_FIELDS,
          method: 'POST',
          data,
        };
      },
      invalidatesTags: [tagTypes.allTextFieldFilters],
    }),
    // update ac department
    updateTextFiled: build.mutation({
      query: ({ data, id }) => {
        // console.log(data, "AllTextFiled data");
        return {
          url: `${TEXT_FIELDS}/${id}`,
          method: 'PATCH',
          data: data,
        };
      },
      invalidatesTags: [tagTypes.allTextFieldFilters],
    }),

    // delete ac department
    deleteTextFiled: build.mutation({
      query: (id) => ({
        url: `${TEXT_FIELDS}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.allTextFieldFilters],
    }),
  }),
});

export const {
  useAddTextFiledMutation,
  useDeleteTextFiledMutation,
  useGetAllTextFiledQuery,
  useGetSingleTextFiledQuery,
  useUpdateTextFiledMutation,
} = textFieldsApi;
