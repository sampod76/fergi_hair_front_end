import { IEarningData } from '@components/DemoData/EarningData';
import CustomImageTag from '@components/ui/CustomTag/CustomImage';

export default function EarningInfoModal({ data }: { data: IEarningData }) {
  return (
    <div className="w-full rounded-xl p-5">
      <div className="flex items-center justify-center py-10">
        {/* Card */}
        <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
          {/* Profile Image */}
          <div className="flex flex-col items-center">
            <CustomImageTag
              src={data.profileImage}
              width={120}
              height={120}
              preview={true}
              className="h-24 w-24 rounded-full shadow-lg"
              alt="Profile Picture"
            />
            <h2 className="mt-4 text-lg font-bold text-gray-800">
              {data?.name?.firstName + ' ' + data?.name?.lastName}
            </h2>
          </div>

          {/* User Info */}
          <div className="mt-6 space-y-4">
            <div className="flex justify-between">
              <span className="font-medium">Serial Number:</span>
              <span>{data.serial}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Email:</span>
              <span>{data.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Acc Number:</span>
              <span>{data.acc_number}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Amount:</span>
              <span>{data.amount}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Time & Date:</span>
              <span>{data.time_date}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Payment Method:</span>
              <span>{data.payment_method}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
