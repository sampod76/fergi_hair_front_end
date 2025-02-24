import CustomImageTag from '@components/ui/CustomTag/CustomImage';

export default function ViewUserInfoModal({ data }: any) {
  console.log('🚀 ~ ViewUserInfoModal ~ data:', data);
  return (
    <div className="w-full rounded-xl p-5">
      <div className="flex items-center justify-center py-10">
        {/* Card */}
        <div className="w-full rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
          {/* Header */}
          <div className="flex flex-col items-center justify-center">
            <h3 className="mb-4 text-lg font-semibold">User Details</h3>
            <CustomImageTag
              src={data?.profileImage}
              width={900}
              height={900}
              preview={true}
              className="h-8 w-8 rounded-full shadow-lg md:h-24 md:w-24"
              alt=""
            />
          </div>

          {/* User Info */}
          <div className="space-y-2 *:border-b-2 *:border-b-bgd *:pb-1">
            <div className="flex justify-between">
              <span className="font-medium">User Name:</span>
              <span>{`${data?.name?.firstName} ${data?.name?.lastName}`}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Company Name:</span>
              <span>{`Mostajeer`}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Date:</span>
              <span>{new Date(data?.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Address:</span>
              <span>{data?.address?.area}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Email:</span>
              <span>{data?.email}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Phone Number:</span>
              <span>{data?.contactNumber}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">User ID:</span>
              <span>{data?.userUniqueId}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Package:</span>
              <span>Gold</span>
            </div>
            {/* {categoryData.map((category: any) => {
              return (
                <div key={category.id}>
                  <div className="flex justify-between">
                    <p className="font-medium">{category.title}:</p>
                    <Link
                      to={
                        '/admin/show-user-submissions' +
                        `/${data?._id}?` +
                        `category=${category?._id}&categoryName=${category?.title}`
                      }
                      className="!rounded-lg !bg-[#a4272d] !px-2 !py-1 !text-white"
                    >
                      Click here
                    </Link>
                  </div>
                </div>
              );
            })} */}
          </div>
          <div className="mt-2 flex space-x-4">
            <button className="w-full rounded-full border-2 px-4 py-2 text-bgd transition-colors duration-300">
              Download
            </button>

            <button className="w-full rounded-full bg-bgd px-4 py-2 text-white transition-colors duration-300">
              Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
