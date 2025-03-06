import ModalComponent from '@components/Modal/ModalComponents';
import CustomImageTag from '@components/ui/CustomTag/CustomImage';
import LoadingSkeleton from '@components/ui/Loading/LoadingSkeleton';
import UMTable from '@components/ui/UMTable';
import EarningInfoModal from '@components/UsersAllComponets/EarningInfoModalData';

import {
  useGetAllChatValueQuery,
  useGetAllPaymentHistoryQuery,
  useGetAllTimeToGroupValueQuery,
} from '@redux/features/admin/paymentHistoryApi';
import { useGetDashboardQuery } from '@redux/features/admin/usersApi';
import { DatePicker, TableProps } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { FaDollarSign, FaUser } from 'react-icons/fa';
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
  const tQuery: any = {};
  tQuery['time'] = 'daily';

  const { data: tdata, isLoading: tLoading } =
    useGetAllTimeToGroupValueQuery(tQuery);
  if (Cloading || DLoading || tLoading) {
    return <LoadingSkeleton sectionNumber={5} />;
  }

  const dataChart = cData?.data || [];
  const changeData = [
    { name: 'Jan', growth: 0 },
    { name: 'Feb', growth: 0 },
    { name: 'Mar', growth: 0 },
    { name: 'Apr', growth: 0 },
    { name: 'May', growth: 0 },
    { name: 'Jun', growth: 0 },
    { name: 'Jul', growth: 0 },
    { name: 'Aug', growth: 0 },
    { name: 'Sep', growth: 0 },
    { name: 'Oct', growth: 0 },
    { name: 'Nov', growth: 0 },
    { name: 'Dec', growth: 0 },
  ].map((month) => {
    dataChart.forEach((updateMonth) => {
      if (
        updateMonth.month.toLowerCase().slice(0, 3) === month.name.toLowerCase()
      ) {
        month.growth = updateMonth.value;
      }
    });
    return month;
  });

  //********user chate********** */
  const userChart = fullDashboardData?.userChart || [];

  const userchangeData = [
    { name: 'Jan', growth: 0 },
    { name: 'Feb', growth: 0 },
    { name: 'Mar', growth: 0 },
    { name: 'Apr', growth: 0 },
    { name: 'May', growth: 0 },
    { name: 'Jun', growth: 0 },
    { name: 'Jul', growth: 0 },
    { name: 'Aug', growth: 0 },
    { name: 'Sep', growth: 0 },
    { name: 'Oct', growth: 0 },
    { name: 'Nov', growth: 0 },
    { name: 'Dec', growth: 0 },
  ].map((month) => {
    userChart.forEach((updateMonth: any) => {
      if (
        updateMonth.month.toLowerCase().slice(0, 3) === month.name.toLowerCase()
      ) {
        month.growth = updateMonth.value;
      }
    });
    return month;
  });
  console.log('🚀 ~ AdminDashboard ~ userchangeData:', userchangeData);

  // ********************************
  const onChange = (date: any, dateString: any) => {
    console.log(dateString);
    query['yearToQuery'] = dateString;
    setYear(dateString);
  };
  return (
    <div>
      <div className="">
        <div className="grid grid-cols-1 gap-3 p-4 lg:grid-cols-3">
          <div className="flex h-full items-center gap-2 rounded-xl bg-bgd2 p-4 px-6">
            <FaUser className="text-5xl" />
            <div className="px-5">
              <p className="text-2xl font-medium text-gray-700">Total User</p>
              <h3 className="text-3xl font-semibold text-bgd">
                {fullDashboardData?.totalUser.find(
                  (d: any) => d._id === 'generalUser'
                ).totalUsers || 0}
              </h3>
            </div>
          </div>
          <div className="flex h-full items-center gap-2 rounded-xl bg-bgd2 p-4 px-6">
            <FaDollarSign className="text-5xl" />
            <div className="px-4">
              <p className="text-2xl font-medium text-gray-700">
                ToDay Earnings
              </p>
              <h3 className="text-3xl font-semibold text-bgd">
                ${tdata?.data?.timeToTotalIncome[0]?.income || 0}
              </h3>
            </div>
          </div>
          <div className="flex h-full items-center gap-2 rounded-xl bg-bgd2 p-4 px-6">
            <FaDollarSign className="text-5xl" />
            <div className="px-4">
              <p className="text-2xl font-medium text-gray-700">
                Total Earnings
              </p>
              <h3 className="text-3xl font-semibold text-bgd">
                ${tdata?.data?.totalIncome[0]?.income || 0}
              </h3>
            </div>
          </div>
        </div>
      </div>
      {/* <h1 className="text-center"> Admin Dashboard </h1> */}
      <div className="h-full flex-row-reverse justify-between gap-4 p-5 text-[30px] lg:flex lg:flex-row xl:gap-6">
        <div
          className="mt-4 h-full rounded-3xl bg-bgd2"
          style={{ width: '100%' }}
        >
          <div className="pb-4" style={{ width: '100%', height: 400 }}>
            <div className="flex items-center justify-between px-14 py-2">
              <p className="font-semibold">User Overview</p>
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
                data={userchangeData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  //@ts-ignore
                  tick={{ fontSize: 14, angle: 290 }}
                  interval={0} // This ensures that all month names are shown
                  ticks={[
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec',
                  ]} // Manually set all months to show up
                />

                <YAxis tick={{ fontSize: 14 }} />
                <Tooltip />
                <Bar dataKey="growth" fill="var(--bgd)" barSize={20} />
                {/* <ReferenceLine y={5000} stroke="#007BFF" strokeWidth={3} /> */}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
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
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  //@ts-ignore
                  tick={{ fontSize: 14, angle: 290 }}
                  interval={0} // This ensures that all month names are shown
                  ticks={[
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec',
                  ]} // Manually set all months to show up
                />
                <YAxis tick={{ fontSize: 14 }} />
                <Tooltip />
                <Bar dataKey="growth" fill="var(--bgd)" barSize={20} />
                {/* <ReferenceLine y={5000} stroke="#007BFF" strokeWidth={3} /> */}
              </BarChart>
            </ResponsiveContainer>
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
