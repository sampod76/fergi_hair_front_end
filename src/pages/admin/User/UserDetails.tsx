import CustomImageTag from '@components/ui/CustomTag/CustomImage';
import LoadingSkeleton from '@components/ui/Loading/LoadingSkeleton';
import { useGetAllCategoryQuery } from '@redux/features/admin/categoryApi';
import { useGetSingleGeneralUserQuery } from '@redux/features/admin/generalUsersApi';
import { selectCurrentUser } from '@redux/features/auth/authSlice';
import { useAppSelector } from '@redux/hooks';
import { DateFormatterDayjs } from '@utils/DateFormateClass';
import { Tabs } from 'antd';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import UserLogs from './AllTabs/UserLogs';
import UserProducts from './AllTabs/UserProducts';
import UserPurchase from './AllTabs/UserPurchase';
import UserRoutings from './AllTabs/UserRoutings';
export default function UserDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userRoleBaseId } = useParams();
  console.log('🚀 ~ UserDetails ~ params:', userRoleBaseId);
  const searchParams = new URLSearchParams(location.search);
  const mainTab = searchParams.get('mainTab');

  const currentUser = useAppSelector(selectCurrentUser);

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
  const items = [
    {
      key: '1',
      label: 'Logs',
      children: <UserLogs roleBaseUserId={userRoleBaseId as string} />,
    },
    {
      key: '2',
      label: 'Routines',
      children: <UserRoutings roleBaseUserId={userRoleBaseId as string} />,
    },
    {
      key: '3',
      label: 'Products',
      children: <UserProducts roleBaseUserId={userRoleBaseId as string} />,
    },
    {
      key: '3',
      label: 'Purchase',
      children: <UserPurchase roleBaseUserId={userRoleBaseId as string} />,
    },
  ];
  const handleMainTabChange = (activeKey: string) => {
    const currentParams = new URLSearchParams(location.search);
    currentParams.set('mainTab', activeKey);
    navigate(`${location.pathname}?${currentParams.toString()}`, {
      replace: true,
    });
  };
  return (
    <div>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        <div className="col-span-1 mx-auto w-full rounded-lg bg-bgd2 p-5 shadow-lg">
          {/* Header and Profile Image */}
          <div className="mb-6 flex flex-col items-center">
            <CustomImageTag
              src={userData?.profileImage}
              width={900}
              height={900}
              preview={true}
              className="h-24 w-24 rounded-full shadow-lg"
              alt="Profile Image"
            />
            <div className="mt-2 flex justify-between">
              <h1>{`${userData?.name?.firstName} ${userData?.name?.lastName}`}</h1>
            </div>
          </div>

          {/* Left Side: User Information */}
          <div className="space-y-4 rounded-lg p-4">
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
              <span className="font-medium">Joining Date:</span>
              <span>
                {new DateFormatterDayjs(userData?.createdAt!).format(
                  'D MMM YYYY'
                )}
              </span>
            </div>
          </div>
        </div>
        <div className="col-span-2 rounded-lg bg-bgd2 p-5 shadow-lg">
          <h3 className="text-center">My Hair Identity</h3>
          <div className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-4">
            {user?.category?.map((category) => {
              return (
                <div
                  key={category.uid}
                  className="rounded-xl border-2 border-indigo-700 p-2"
                >
                  <p className="text-base">
                    {category.label?.replace('Choose', '').replace('your', '')}
                  </p>
                  <p>➡️{category?.children?.label}</p>
                  <p className=""> ➡️{category?.children?.children?.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="mt-4 rounded-lg border p-5 shadow-md">
        <Tabs
          onChange={handleMainTabChange}
          centered
          activeKey={mainTab || '1'}
          defaultActiveKey="1"
          items={items}
        />
      </div>
    </div>
  );
}
