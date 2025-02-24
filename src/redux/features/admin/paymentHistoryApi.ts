import { IMeta } from '../../../types/common';
import { I_YN } from '../../../types/globalType';
import { baseApi } from '../../api/baseApi';
import { tagTypes } from '../../tag-types';

const URL = '/payment-history';
export type IPaymentHistory = {
  _id?: string; //
  //
  id: string; // same pi_id not use
  pi_id: string; //pi_3PPQzrAdJu4EQtRS04CaPeUy
  ch_id: string; //latest_charge: 'ch_3PPQzrAdJu4EQtRS0Ioak1tW',
  cs_id: string; //cs_test_a1fKshnHlXhmOAVqZ0J9le7Fx8fNVYEpHyeZP9byDfjTH3qcbkaKXKGVml
  amount: number;
  amount_received: number;
  // payment_method?: any;
  created: number;
  currency: string;
  payment_intent?: string;
  payment_method_types?: any;
  status: 'succeeded' | string;
  //
  fileId?: string;
  packageId?: string;
  orderId: string;
  author: object;
  //
  queue?: {
    jobId: string;
    types: string;
  };
  refund?: {
    isRefund: I_YN;
    stripeRefundId?: string;
    balance_transaction?: string;
    ch_id?: string;
  };

  isDelete?: I_YN;
};
interface IncomeDetail {
  income: number;
}

// Define the AggregationResult interface
interface AggregationResult {
  timeToTotalIncome: IncomeDetail[];
  totalIncome: IncomeDetail[];
}
export const paymentHistoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllPaymentHistory: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: URL,
          method: 'GET',
          params: arg,
        };
      },
      transformResponse: (response: IPaymentHistory[], meta: IMeta) => {
        return {
          data: response,
          meta,
        };
      },
      providesTags: [tagTypes.PaymentHistory],
    }),
    getAllTransaction: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: URL + '/transaction',
          method: 'GET',
          params: arg,
        };
      },
      transformResponse: (response: IPaymentHistory[], meta: IMeta) => {
        return {
          data: response,
          meta,
        };
      },
      providesTags: [tagTypes.PaymentHistory],
    }),
    getAllChatValue: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: URL + '/get-all-chart-value',
          method: 'GET',
          params: arg,
        };
      },
      transformResponse: (
        response: Array<{ month: string; value: number }>,
        meta: IMeta
      ) => {
        return {
          data: response,
          meta,
        };
      },
      providesTags: [tagTypes.PaymentHistory],
    }),
    getAllTimeToGroupValue: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: URL + '/get-all-time-group-amount',
          method: 'GET',
          params: arg,
        };
      },
      transformResponse: (response: AggregationResult, meta: IMeta) => {
        return {
          data: response,
          meta,
        };
      },
      providesTags: [tagTypes.PaymentHistory],
    }),

    getSinglePaymentHistory: build.query({
      query: (id: string | string[] | undefined) => {
        return {
          url: `${URL}/${id}`,
          method: 'GET',
        };
      },
      transformResponse: (response: IPaymentHistory) => ({ data: response }),
      providesTags: [tagTypes.PaymentHistory],
    }),

    updatePaymentHistory: build.mutation({
      query: ({ data, id }) => {
        return {
          url: `${URL}/${id}`,
          method: 'PATCH',
          data: data,
          contentType: 'multipart/form-data',
        };
      },
      invalidatesTags: [tagTypes.PaymentHistory],
    }),

    deletePaymentHistory: build.mutation({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.PaymentHistory],
    }),
  }),
});

export const {
  useDeletePaymentHistoryMutation,
  useGetAllPaymentHistoryQuery,
  useGetSinglePaymentHistoryQuery,
  useUpdatePaymentHistoryMutation,
  useGetAllTimeToGroupValueQuery,
  useGetAllChatValueQuery,
} = paymentHistoryApi;
