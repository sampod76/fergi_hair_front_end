import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import ModalComponent from '@components/Modal/ModalComponents';
import SubscriptionsCreateModal from '@components/Subscriptions/SubscriptionsCreateModal';
import LoadingSkeleton from '@components/ui/Loading/LoadingSkeleton';
import {
  ISubscription,
  useGetAllSubscriptionsQuery,
} from '@redux/features/admin/subscriptionsApi';
import React, { useState } from 'react';

const ManageSubscription: React.FC = () => {
  const [isHighlighted, setHighlighted] = useState('');
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>('serialNumber');
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const query: Record<string, any> = {};
  query['limit'] = size;
  query['page'] = page;
  query['sortBy'] = sortBy;
  query['sortOrder'] = sortOrder;
  const { data, isLoading } = useGetAllSubscriptionsQuery(query);
  const plans = data?.data;
  const meta = data?.meta;
  const PricingCard = ({ plan }: { plan: ISubscription }) => {
    return (
      <div
        className={`w-full rounded-2xl p-10 capitalize shadow-lg ${plan.packageName === isHighlighted ? 'bg-[#143A69] text-white' : 'bg-white text-gray-900'}`}
        // style={{ width: '300px' }}
      >
        <h2 className="mb-4 text-center text-4xl font-bold">
          {plan.packageName}
        </h2>
        <hr className="my-6" />
        <div className="mb-4 flex items-center gap-1 text-4xl font-bold">
          ${plan?.price?.toFixed(2)}
          <p className="text-lg font-normal">per user per {plan.packageType}</p>
        </div>
        <div className="mb-6 space-y-6">
          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              {feature.isBoolean ? (
                <CheckCircleFilled
                  style={{
                    fontSize: '20px',
                    color:
                      plan.packageName === isHighlighted
                        ? '#ffffff'
                        : '#143A69',
                  }}
                />
              ) : (
                <CloseCircleFilled
                  style={{ fontSize: '20px', color: '#888888' }}
                />
              )}
              <span
                style={{
                  color: feature.isBoolean
                    ? plan.packageName === isHighlighted
                      ? '#ffffff'
                      : '#000000'
                    : '#888888',
                  fontSize: '16px',
                }}
              >
                {feature.label}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-between space-x-4">
          <ModalComponent
            width={700}
            button={
              <button
                className={`rounded border px-4 py-2 font-semibold ${
                  plan.packageName === isHighlighted
                    ? 'border-white bg-white text-[#143A69]'
                    : 'border-[#143A69] bg-[#143A69] text-white'
                }`}
                style={{ width: '100px' }}
              >
                Edit
              </button>
            }
          >
            <SubscriptionsCreateModal initialValues={plan} />
          </ModalComponent>
          <button
            className={`rounded border px-4 py-2 font-semibold ${
              plan.packageName === isHighlighted
                ? 'border-white text-white'
                : 'border-[#143A69] text-[#143A69]'
            }`}
            style={{
              width: '100px',
              backgroundColor:
                plan.packageName === isHighlighted ? 'transparent' : 'white',
            }}
          >
            Delete
          </button>
        </div>
      </div>
    );
  };
  if (isLoading) {
    return <LoadingSkeleton />;
  }
  return (
    <div>
      <h1 className="text-center text-4xl">Subscriptions</h1>
      <hr className="my-3" />
      <div className="grid grid-cols-1 gap-4 bg-gray-100 p-8 md:grid-cols-2 xl:grid-cols-3 2xl:gap-24">
        {plans?.map((plan, index) => (
          <div key={index} onClick={() => setHighlighted(plan.packageName)}>
            <PricingCard plan={plan} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageSubscription;
