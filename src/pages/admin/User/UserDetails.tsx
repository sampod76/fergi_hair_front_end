import CustomImageTag from '@components/ui/CustomTag/CustomImage';
import LoadingSkeleton from '@components/ui/Loading/LoadingSkeleton';
import { useGetAllCategoryQuery } from '@redux/features/admin/categoryApi';
import { useGetSingleGeneralUserQuery } from '@redux/features/admin/generalUsersApi';
import { selectCurrentUser } from '@redux/features/auth/authSlice';
import { useAppSelector } from '@redux/hooks';
import { FaArrowRight } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
export default function UserDetails() {
  const currentUser = useAppSelector(selectCurrentUser);
  const { userRoleBaseId } = useParams();

  const { data: user, isLoading: uLoaidng } = useGetSingleGeneralUserQuery(
    userRoleBaseId,
    { skip: !userRoleBaseId }
  );
  const userData = user;

  const { data: AllCategory, isLoading } = useGetAllCategoryQuery({
    limit: 555,

    sortBy: 'asc',
    sortOrder: 'serialNumber',
  });

  if (isLoading || uLoaidng) {
    return <LoadingSkeleton sectionNumber={5} />;
  }

  const categoryData = AllCategory?.data || [];

  return (
    <div className="mx-auto w-full max-w-5xl rounded-lg bg-bgd2 p-5 shadow-lg">
      {/* Header and Profile Image */}
      <div className="mb-6 flex flex-col items-center">
        <h2 className="mb-2 text-2xl font-bold capitalize">
          {userData?.accountType}
        </h2>
        <h3 className="mb-4 text-lg font-semibold">User Details</h3>
        <CustomImageTag
          src={userData?.profileImage}
          width={900}
          height={900}
          preview={true}
          className="h-24 w-24 rounded-full shadow-lg"
          alt="Profile Image"
        />
      </div>

      {/* User Info and Action Buttons Layout */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Left Side: User Information */}
        <div className="space-y-4 rounded-lg p-4">
          <div className="flex justify-between">
            <span className="font-medium">Date:</span>
            <span>
              {userData?.createdAt &&
                new Date(userData?.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">User Name:</span>
            <span>{`${userData?.name?.firstName} ${userData?.name?.lastName}`}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Email:</span>
            <span>{userData?.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Phone Number:</span>
            <span>{userData?.contactNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Address:</span>
            <span>{userData?.address?.area}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">User ID:</span>
            <span>{userData?.userUniqueId}</span>
          </div>
        </div>

        {/* Right Side: Category Buttons with Red Background */}
        <div className="max-h-screen space-y-4 overflow-y-auto">
          {categoryData.map((category: any) => (
            <div
              key={category.id}
              className="flex items-center justify-between"
            >
              {/* <h1 className="font-medium">{category.title}:</h1> */}
              <Link
                to={`/${currentUser?.role}/show-user-submissions/${userData?._id}?category=${category?._id}&categoryName=${category?.title}`}
                className="flex w-full items-center justify-between rounded-lg !bg-bgd px-4 py-2 text-start !text-white transition-colors hover:bg-red-700"
              >
                {category.title} <FaArrowRight />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
