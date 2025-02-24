import CustomImageTag from '@components/ui/CustomTag/CustomImage';

export default function EarningInfoModal({ data }: any) {
  // console.log('🚀 ~ EarningInfoModal ~ data:', data);
  const userInfo = data?.author?.details;
  return (
    <div className="w-full rounded-xl p-5">
      <div className="flex items-center justify-center py-10">
        {/* Card */}
        <div className="w-full rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
          {/* Header */}
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Transaction Details</h2>
            </div>

            <CustomImageTag
              src={userInfo?.profileImage}
              width={900}
              height={900}
              preview={true}
              className="mt-2 h-8 w-8 rounded-full shadow-lg md:h-24 md:w-24"
              alt="Profile Picture"
            />
          </div>

          {/* User Info */}
          <div className="space-y-2 *:border-b-2 *:border-b-gray-300 *:pb-1">
            <div className="flex justify-between">
              <span className="font-medium">Transaction ID:</span>
              <span>{data?.pi_id || 'N/A'}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Date & Time:</span>
              <span>
                {userInfo?.createdAt
                  ? new Date(data.createdAt).toLocaleString()
                  : 'N/A'}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">User Name:</span>
              <span>
                {userInfo?.name?.firstName
                  ? `${userInfo.name.firstName} ${userInfo?.name?.lastName}`
                  : 'N/A'}
              </span>
            </div>
            {/* <div className="flex justify-between">
              <span className="font-medium">User ID:</span>
              <span>{data?.userUniqueId || 'N/A'}</span>
            </div> */}

            <div className="flex justify-between">
              <span className="font-medium">Payment account email:</span>
              <span>{data?.customer_details?.email || 'N/A'}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Payment account Holder name:</span>
              <span>{data?.customer_details?.name || 'N/A'}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Transaction Amount:</span>
              <span>{data?.amount || 'N/A'}</span>
            </div>
            {/* 
            <div className="flex justify-between">
              <span className="font-medium">Fees:</span>
              <span>{data?.fees || 'N/A'}</span>
            </div> */}

            <div className="flex justify-between">
              <span className="font-medium">Payment:</span>
              <span>{data?.payment_method_types[0] || 'N/A'}</span>
            </div>
          </div>
          {/* <div className="mt-2 flex space-x-4">
            <button className="w-full rounded-full border-2 border-blue-500 px-4 py-2 text-blue-500 transition-colors duration-300 hover:bg-blue-500 hover:text-white">
              Download
            </button>

            <button className="w-full rounded-full bg-blue-500 px-4 py-2 text-white transition-colors duration-300 hover:bg-blue-600">
              Print
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}
