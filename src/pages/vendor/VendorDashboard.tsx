import ModalComponent from '@components/Modal/ModalComponents';
import CustomImageTag from '@components/ui/CustomTag/CustomImage';
import LoadingSkeleton from '@components/ui/Loading/LoadingSkeleton';
import UMTable from '@components/ui/UMTable';
import ViewUserInfoModal from '@components/UsersAllComponets/viewUserInfoModal';
import { ENUM_USER_ROLE_TYPE } from '@local-types/userTypes';
import {
  useGetAllGeneralUserQuery,
  useGetGeneralUserVendorUserQuery,
} from '@redux/features/admin/generalUsersApi';
import { selectCurrentUser } from '@redux/features/auth/authSlice';
import { useAppSelector } from '@redux/hooks';
import { convertToTitleCase } from '@utils/convertToTitleCase';
import { TableProps } from 'antd';
import { GrView } from 'react-icons/gr';
import { IoIosPeople } from 'react-icons/io';
const VendorDashboard = () => {
  const user = useAppSelector(selectCurrentUser);
  const { data: companyData, isLoading: cloading } =
    useGetGeneralUserVendorUserQuery({});
  // const [page, setPage] = useState<number>(1);
  // const [size, setSize] = useState<number>(10);
  // const [sortBy, setSortBy] = useState<string>("createdAt");
  // const [sortOrder, setSortOrder] = useState<string>("decs");
  // const [searchTerm, setSearchTerm] = useState<string>("");
  const query: Record<string, any> = {};
  query['limit'] = 10;
  query['page'] = 1;
  query['sortBy'] = 'createdAt';
  query['sortOrder'] = 'decs';
  query['needProperty'] = 'roleInfo';
  // query['role'] = 'generalUser';
  query['authUserId'] = user?.userId;

  const { data, isLoading } = useGetAllGeneralUserQuery(query);
  if (isLoading || cloading) {
    return <LoadingSkeleton />;
  }

  let resentUser = data?.data || [];

  const columns: TableProps<any>['columns'] = [
    {
      title: 'user id',
      // dataIndex: "createdAt",
      ellipsis: true,
      dataIndex: ['userDetails'],
      render: (record: any) => {
        return (
          <div className="flex items-start justify-between gap-2">
            <p>{record?.userUniqueId}</p>
          </div>
        );
      },
      width: 150,
    },

    {
      title: 'Full Name',
      // dataIndex: ['roleInfo'],
      ellipsis: true,
      render: (record: any) => (
        <div className="flex items-center justify-start gap-1">
          <CustomImageTag
            src={record?.profileImage}
            width={550}
            height={550}
            preview={true}
            className="h-8 w-8 rounded-full shadow-lg md:h-12 md:w-12"
            alt=""
          />
          <p className="truncate">
            {record.name.firstName + ' ' + record.name.lastName}
          </p>
        </div>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      ellipsis: true,
    },
    {
      title: 'Type',
      dataIndex: ['roleType'],
      width: 250,
      render: (value, record, index) => {
        return value && convertToTitleCase(value);
      },
    },
    {
      title: 'Date',
      // dataIndex: "createdAt",
      ellipsis: true,
      render: (record: any) => {
        return (
          <div className="flex items-start justify-between gap-2">
            <p>{new Date(record.createdAt).toDateString()}</p>
          </div>
        );
      },
      width: 200,
    },
    {
      title: 'Action',
      // fixed: "right",

      width: 120,
      render: (record: any) => (
        <>
          <div className="flex items-center justify-center gap-2">
            <ModalComponent
              button={<GrView className="text-[20px] text-bgd" />}
              width={700}
            >
              <div className="my-6 flex items-center justify-center">
                <ViewUserInfoModal
                  data={{
                    ...record,
                    role: record?.userDetails?.role,
                    userUniqueId: record?.userDetails?.userUniqueId,
                  }}
                />
              </div>
            </ModalComponent>
            {/* <Link to={`/admin/user-details/${record._id}`}>
              <TbViewfinder className="text-[20px] text-[#27a470]" />
            </Link> */}
          </div>
        </>
      ),
    },
  ];

  const companyDocumentSubmit = companyData?.data?.find(
    (data: { _id: string }) =>
      data._id === ENUM_USER_ROLE_TYPE.companyDocumentSubmit
  );

  const driverDocumentSubmit = companyData?.data?.find(
    (data: { _id: string }) =>
      data._id === ENUM_USER_ROLE_TYPE.driverDocumentSubmit
  );

  return (
    <div>
      {/* <h1 className="text-center"> Admin Dashboard </h1> */}
      <section className="grid grid-cols-1 gap-4 text-[30px] sm:grid-cols-2 xl:gap-6">
        <div className="flex h-28 w-full items-center justify-start gap-4 rounded-xl border bg-bgd2 p-4 text-black shadow">
          <p className="p-1">
            <IoIosPeople className="text-[50px] text-bgd" />
          </p>
          <div className="space-y-2">
            <p className="lggg:text-lg text-end text-base font-semibold">
              Total Company Documents Users
            </p>

            <div className="text-start font-sans text-2xl font-bold text-bgd">
              <span>{companyDocumentSubmit?.totalUsers}</span>
            </div>
          </div>
        </div>
        <div className="flex h-28 w-full items-center justify-start gap-4 rounded-xl border bg-bgd2 p-4 text-black shadow">
          <p className="p-1">
            <IoIosPeople className="text-[50px] text-bgd" />
          </p>
          <div className="space-y-2">
            <p className="lggg:text-lg text-end text-base font-semibold">
              Total Driver Documents Users
            </p>

            <div className="text-start font-sans text-2xl font-bold text-bgd">
              <span>{driverDocumentSubmit?.totalUsers}</span>
            </div>
          </div>
        </div>
      </section>
      <br />
      <br />
      <div className="bgd2">
        <h1 className="my-2 rounded-2xl text-start text-lg font-bold">
          Latest Users
        </h1>
        <UMTable
          loading={isLoading}
          columns={columns}
          dataSource={resentUser}
          showSizeChanger={false}
          showPagination={false}
        />
      </div>
    </div>
  );
};

export default VendorDashboard;
