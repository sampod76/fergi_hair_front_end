import ModalComponent from '@components/Modal/ModalComponents';
import CustomImageTag from '@components/ui/CustomTag/CustomImage';
import LoadingSkeleton from '@components/ui/Loading/LoadingSkeleton';
import UMTable from '@components/ui/UMTable';
import EarningInfoModal from '@components/UsersAllComponets/EarningInfoModalData';

import { useGetDashboardQuery } from '@redux/features/admin/adminSettingApi';
import {
  useGetAllChatValueQuery,
  useGetAllPaymentHistoryQuery,
} from '@redux/features/admin/paymentHistoryApi';
import { useGetAllUsersQuery } from '@redux/features/users/userApi';
import { DatePicker, TableProps } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { GrView } from 'react-icons/gr';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const AdminDashboard = () => {
  const [year, setYear] = useState(new Date().getFullYear());

  //******************************************** */
  const query: Record<string, any> = {};
  query['limit'] = 10;
  query['page'] = 1;
  query['sortBy'] = 'createdAt';
  query['sortOrder'] = 'decs';
  query['needProperty'] = 'roleInfo';
  query['role'] = 'generalUser';
  const { data, isLoading } = useGetAllUsersQuery(query);
  //******************************************** */
  const cQuery: any = {};
  cQuery['yearToQuery'] = year;
  const { data: cData, isLoading: Cloading } = useGetAllChatValueQuery(cQuery);
  //******************************************** */
  const columns: TableProps<any>['columns'] = [
    {
      title: 'Trx ID',
      dataIndex: 'pi_id',
      ellipsis: true,
      // dataIndex: ['roleInfo'],
      // render: (record: any) => {
      //   return (
      //     <div className="flex items-start justify-between gap-2">
      //       <p>{record}</p>
      //     </div>
      //   );
      // },
      width: 300,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      ellipsis: true,
      // dataIndex: ['roleInfo'],
      render: (record: any) => {
        return (
          <div className="flex items-center justify-between gap-2">
            <p>$ {record}</p>
          </div>
        );
      },
      width: 100,
    },

    {
      title: 'User Name',
      // dataIndex: ['author', 'details'],
      ellipsis: true,
      // width: 200,
      render: (data: any) => {
        const record = data?.author?.details;
        return (
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
              {record?.name?.firstName + ' ' + record?.name?.lastName}
            </p>
          </div>
        );
      },
    },
    {
      title: 'Email',
      dataIndex: ['author', 'details', 'email'],
      ellipsis: true,
    },

    {
      title: 'Payment',
      dataIndex: 'payment_method_types',
      render: (data: any) => {
        return (
          <div className="flex items-center justify-start gap-1">
            <p className="truncate">{data[0]}</p>
          </div>
        );
      },
    },

    {
      title: 'Date',
      dataIndex: 'createdAt',
      ellipsis: true,
      render: (record: any) => {
        return (
          <div className="flex items-start justify-between gap-2">
            <p>{new Date(record).toDateString()}</p>
          </div>
        );
      },
    },
    {
      title: 'Action',
      // fixed: "right",

      width: 100,
      render: (record: any) => (
        <>
          <div className="flex items-center justify-center gap-2">
            <ModalComponent
              button={<GrView className="text-[20px]" />}
              width={700}
            >
              <div className="my-6 flex items-center justify-center">
                <EarningInfoModal data={{ ...record, role: 'vendor' }} />
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
  const pquery: Record<string, any> = {};
  pquery['limit'] = 10;
  pquery['page'] = 1;
  pquery['sortBy'] = 'createdAt';
  pquery['sortOrder'] = 'decs';
  pquery['needProperty'] = 'author';

  const { data: paymentData, isLoading: ploading } =
    useGetAllPaymentHistoryQuery(pquery);
  //******************************************** */
  const { data: Ddata, isLoading: DLoading } = useGetDashboardQuery({});

  const fullDashboardData = Ddata?.data;

  //******************************************** */
  if (Cloading || DLoading) {
    return <LoadingSkeleton sectionNumber={5} />;
  }

  let resentUser = data?.data || [];

  const dataChart = cData?.data || [];
  const changeData = [
    { name: 'January', growth: 0 },
    { name: 'February', growth: 0 },
    { name: 'March', growth: 0 },
    { name: 'April', growth: 0 },
    { name: 'May', growth: 0 },
    { name: 'June', growth: 0 },
    { name: 'July', growth: 0 },
    { name: 'August', growth: 0 },
    { name: 'September', growth: 0 },
    { name: 'October', growth: 0 },
    { name: 'November', growth: 0 },
    { name: 'December', growth: 0 },
  ].map((month) => {
    dataChart.forEach((updateMonth) => {
      if (updateMonth.month.toLowerCase() === month.name.toLowerCase()) {
        month.growth = updateMonth.value;
      }
    });
    return month;
  });

  const onChange = (date: any, dateString: any) => {
    console.log(dateString);
    query['yearToQuery'] = dateString;
    setYear(dateString);
  };
  return (
    <div>
      {/* <h1 className="text-center"> Admin Dashboard </h1> */}
      <div className="h-full flex-row-reverse justify-between gap-4 p-5 text-[30px] lg:flex lg:flex-row xl:gap-6">
        <div
          className="mt-4 h-full rounded-3xl bg-bgd2"
          style={{ width: '100%' }}
        >
          <div className="pb-4" style={{ width: '100%', height: 400 }}>
            <div className="flex items-center justify-between px-14 py-2">
              <p className="font-semibold">Earning</p>
              <DatePicker
                defaultValue={dayjs(new Date()).year(new Date().getFullYear())}
                onChange={onChange}
                picker="year"
                className="!bg-bgd2"
              />
            </div>
            <ResponsiveContainer
              width="100%"
              height="100%"
              style={{ paddingBottom: '50px', borderRadius: '10px' }}
            >
              <BarChart
                data={changeData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 14 }} />
                <YAxis tick={{ fontSize: 14 }} />
                <Tooltip />
                <Bar dataKey="growth" fill="var(--bgd)" barSize={20} />
                {/* <ReferenceLine y={5000} stroke="#007BFF" strokeWidth={3} /> */}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="flex h-[27rem] min-w-80 flex-col justify-between space-y-4 p-4">
          <div className="h-full rounded-xl bg-bgd2 p-4 text-center">
            <p className="text-2xl font-medium text-gray-700">Total Earnings</p>
            <h3 className="text-3xl font-semibold text-bgd">
              ${fullDashboardData?.totalEarningAmount || 0}
            </h3>
          </div>
          <div className="h-full rounded-xl bg-bgd2 p-4 text-center">
            <p className="text-2xl font-medium text-gray-700">Total User</p>
            <h3 className="text-3xl font-semibold text-bgd">
              {fullDashboardData?.totalUserCount || 0}
            </h3>
          </div>
          <div className="h-full rounded-xl bg-bgd2 p-4 text-center">
            <p className="text-2xl font-medium text-gray-700">
              Total Subscriptions
            </p>
            <h3 className="text-3xl font-semibold text-bgd">
              {fullDashboardData?.totalSubscriptionsCount}
            </h3>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div className="rootBg w-full">
        <h1 className="my-2 rounded-2xl text-start text-lg font-bold">
          Latest transaction
        </h1>
        <div className="flex-row items-start justify-between gap-10 lg:flex">
          <div className="w-full">
            <UMTable
              loading={ploading}
              columns={columns}
              dataSource={paymentData?.data}
              showSizeChanger={false}
              showPagination={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
