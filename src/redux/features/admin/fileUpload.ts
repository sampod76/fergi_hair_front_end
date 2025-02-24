import { IMeta } from '../../../types/common';
import { IFileAfterUpload } from '../../../types/globalType';
import { baseApi } from '../../api/baseApi';
import { tagTypes } from '../../tag-types';
export enum ENUM_UPLOAD_FILE_TYPE {
  video = 'video',
  doc = 'doc',
}
export type IUploadFileType = keyof typeof ENUM_UPLOAD_FILE_TYPE;
export const I_Upload_File_Array = Object.values(ENUM_UPLOAD_FILE_TYPE);
const URL = '/file';
export type FileUploadFieldBodyDate = {
  title: string;
  subTitle?: string;
  file: IFileAfterUpload;
  coverImage?: IFileAfterUpload;
  price: number;
  author?: string;
  fileType: IUploadFileType;
  description?: string;
};
export const fileUploadApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllFileUpload: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: URL,
          method: 'GET',
          params: arg,
        };
      },
      transformResponse: (response: FileUploadFieldBodyDate[], meta: IMeta) => {
        return {
          data: response,
          meta,
        };
      },
      providesTags: [tagTypes.FileUploads],
    }),

    getSingleFileUpload: build.query({
      query: (id: string | string[] | undefined) => {
        return {
          url: `${URL}/${id}`,
          method: 'GET',
        };
      },
      transformResponse: (response: FileUploadFieldBodyDate) => ({
        data: response,
      }),
      providesTags: [tagTypes.FileUploads],
    }),

    addFileUpload: build.mutation({
      query: (data) => {
        return {
          url: URL,
          method: 'POST',
          data: data,
          contentType: 'multipart/form-data',
        };
      },
      invalidatesTags: [tagTypes.FileUploads],
    }),

    updateFileUpload: build.mutation({
      query: ({ data, id }) => {
        return {
          url: `${URL}/${id}`,
          method: 'PATCH',
          data: data,
          contentType: 'multipart/form-data',
        };
      },
      invalidatesTags: [tagTypes.FileUploads],
    }),

    deleteFileUpload: build.mutation({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.FileUploads],
    }),
    updateFileUploadSerialNumber: build.mutation({
      query: ({ data }: { data: Record<string, any> }) => {
        return {
          url: `${URL}/serialnumber-update`,
          method: 'PATCH',
          data: data,
          // contentType: 'multipart/form-data',
        };
      },
      invalidatesTags: [tagTypes.FileUploads],
    }),
  }),
});

export const {
  useAddFileUploadMutation,
  useDeleteFileUploadMutation,
  useGetAllFileUploadQuery,
  useGetSingleFileUploadQuery,
  useUpdateFileUploadMutation,
  useUpdateFileUploadSerialNumberMutation,
} = fileUploadApi;
