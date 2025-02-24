import { IMeta } from '../../../types/common';
import { baseApi } from '../../api/baseApi';
import { tagTypes } from '../../tag-types';
// Interface for a subscription feature
export interface ISubscriptionFeature {
  label: string;
  enumValue: string;
  isBoolean: boolean;
  count?: number; // Optional because it has a default value
  uid: string;
}

// Interface for the Subscription document
export interface ISubscription {
  packageName: string;
  packageType: string;
  title: string;
  days?: number; // Optional because it has a default value
  price?: number; // Optional because it has a default value
  features: ISubscriptionFeature[];
  serialNumber?: number; // Optional if not required
  isDelete?: string; // Optional because it has a default value
  status?: string; // Optional because it has a default value
  createdAt?: Date;
  updatedAt?: Date;
}
const URL = '/subscriptions';

export const subscriptionsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllSubscriptions: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: URL,
          method: 'GET',
          params: arg,
        };
      },
      transformResponse: (response: ISubscription[], meta: IMeta) => {
        return {
          data: response,
          meta,
        };
      },
      providesTags: [tagTypes.subscriptions],
    }),

    getSingleSubscriptions: build.query({
      query: (id: string | string[] | undefined) => {
        return {
          url: `${URL}/${id}`,
          method: 'GET',
        };
      },
      transformResponse: (response: ISubscription) => ({ data: response }),
      providesTags: [tagTypes.subscriptions],
    }),

    addSubscriptions: build.mutation({
      query: (data) => {
        return {
          url: URL,
          method: 'POST',
          data: data,
        };
      },
      invalidatesTags: [tagTypes.subscriptions],
    }),

    updateSubscriptions: build.mutation({
      query: ({ data, id }) => {
        return {
          url: `${URL}/${id}`,
          method: 'PATCH',
          data: data,
        };
      },
      invalidatesTags: [tagTypes.subscriptions],
    }),

    deleteSubscriptions: build.mutation({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.subscriptions],
    }),
  }),
});

export const {
  useAddSubscriptionsMutation,
  useDeleteSubscriptionsMutation,
  useGetAllSubscriptionsQuery,
  useGetSingleSubscriptionsQuery,
  useUpdateSubscriptionsMutation,
} = subscriptionsApi;
