import { IMeta } from '@local-types/common';
import { baseApi } from '@redux/api/baseApi';
import { tagTypes } from '@redux/tag-types';

const APP_URL = '/notification';

export const allNotificationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllNotifications: build.query({
      query: (arg) => {
        return {
          url: APP_URL,
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
      providesTags: [tagTypes.Notification],
    }),

    getSingleNotification: build.query({
      query: (id) => {
        return {
          url: `${APP_URL}/${id}`,
          method: 'GET',
        };
      },
      providesTags: [tagTypes.Notification],
    }),

    addNotification: build.mutation({
      query: (data) => {
        return {
          url: APP_URL,
          method: 'POST',
          body: data,
          headers: {
            'Content-Type': 'application/json',
          },
        };
      },
      invalidatesTags: [tagTypes.Notification],
    }),

    updateNotification: build.mutation({
      query: ({ data, id }) => {
        return {
          url: `${APP_URL}/${id}`,
          method: 'PATCH',
          body: data,
          headers: {
            'Content-Type': 'application/json',
          },
        };
      },
      invalidatesTags: [tagTypes.Notification],
    }),

    deleteNotification: build.mutation({
      query: (id) => ({
        url: `${APP_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.Notification],
    }),
  }),
});

export const {
  useAddNotificationMutation,
  useDeleteNotificationMutation,
  useGetAllNotificationsQuery,
  useGetSingleNotificationQuery,
  useUpdateNotificationMutation,
} = allNotificationApi;
