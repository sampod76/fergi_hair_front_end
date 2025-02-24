import ModalComponent from '@components/Modal/ModalComponents';
import CustomImageTag from '@components/ui/CustomTag/CustomImage';
import LoadingSkeleton from '@components/ui/Loading/LoadingSkeleton';
import { FaRegCreditCard } from 'react-icons/fa';

import { ReloadOutlined } from '@ant-design/icons';

import ActionBar from '@components/ui/ActionBar';
import UMTable from '@components/ui/UMTable';
import EarningInfoModal from '@components/UsersAllComponets/EarningInfoModalData';
import { IMeta } from '@local-types/common';
import {
  useGetAllPaymentHistoryQuery,
  useGetAllTimeToGroupValueQuery,
} from '@redux/features/admin/paymentHistoryApi';
import { selectCurrentUser } from '@redux/features/auth/authSlice';
import { useAppSelector } from '@redux/hooks';
import { Button, Input, TableProps, Tag } from 'antd';
import { useState } from 'react';
import { GrView } from 'react-icons/gr';

export default function Earings({ earnType }: { earnType?: string }) {
  // console.log('🚀 ~ Earings ~ earnType:', earnType);
  const user = useAppSelector(selectCurrentUser);
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [sortOrder, setSortOrder] = useState<string>('decs');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const query: Record<string, any> = {};
  query['limit'] = size;
  query['page'] = page;
  query['sortBy'] = sortBy;
  query['sortOrder'] = sortOrder;
  query['earnType'] = earnType;
  query['needProperty'] = 'author';
  // query['role'] = 'generalUser';

  query['searchTerm'] = searchTerm;

  const { data, isLoading } = useGetAllPaymentHistoryQuery(query);
  const tQuery: any = {};
  tQuery['time'] = 'daily';
  tQuery['earnType'] = earnType;
  const { data: tdata, isLoading: tLoading } =
    useGetAllTimeToGroupValueQuery(tQuery);
  if (tLoading) {
    return <LoadingSkeleton sectionNumber={4} />;
  }
  //
  let paymentData = data?.data || [];
  const meta = (data?.meta as IMeta) || [];
  //
  const timeData = tdata?.data;
  const todayIncome = timeData?.timeToTotalIncome[0]?.income;
  const totalIncome = timeData?.totalIncome[0]?.income;

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
      title: earnType === 'package' ? 'Package' : 'Content Type',
      dataIndex: earnType === 'package' ? 'packageName' : 'fileType',
      ellipsis: true,
      render: (data) => {
        let color = '';
        let text = '';

        // Normalize the package name to lowercase for consistent matching
        const normalizedPackage = data?.toLowerCase();

        switch (normalizedPackage) {
          case 'doc':
            color = 'blue'; // Basic package color
            text = 'Documentation';
            break;
          case 'video':
            color = 'green'; // Basic package color
            text = 'Video';
            break;
          case 'plus':
            color = 'cyan'; // Plus package color
            text = 'Plus';
            break;
          case 'premium':
            color = 'gold'; // Premium package color
            text = 'Premium';
            break;
          case 'pro':
            color = 'geekblue'; // Pro package color
            text = 'Pro';
            break;
          case 'ultimate':
            color = 'purple'; // Ultimate package color
            text = 'Ultimate';
            break;
          case 'silver':
            color = 'gray'; // Silver package color
            text = 'Silver';
            break;
          case 'gold':
            color = 'gold'; // Gold package color
            text = 'Gold';
            break;
          case 'platinum':
            color = 'purple'; // Platinum package color
            text = 'Platinum';
            break;
          default:
            color = 'default';
            text = 'Unknown';
        }

        return <Tag color={color}>{text}</Tag>;
      },
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

  const onPaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    //
    setSortBy(field as string);
    setSortOrder(order === 'ascend' ? 'asc' : 'desc');
  };

  const resetFilters = () => {
    setSortBy('');
    setSortOrder('');
    setSearchTerm('');
  };
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 text-[30px] sm:grid-cols-2 xl:gap-6">
        <div className="flex h-32 w-full items-center justify-start gap-4 rounded-3xl !bg-bgd p-4 text-white shadow">
          <p className="p-1">
            <FaRegCreditCard className="text-[50px] text-white" />
          </p>
          <div className="space-y-2">
            <p className="lggg:text-lg text-end text-base font-semibold">
              Total Income
            </p>

            <div className="text-start font-sans text-2xl font-bold text-white">
              <span>$ {totalIncome}</span>
            </div>
          </div>
        </div>
        <div className="flex h-32 w-full items-center justify-start gap-4 rounded-3xl !bg-bgd p-4 text-white shadow">
          <p className="p-1">
            <FaRegCreditCard className="text-[50px] text-white" />
          </p>
          <div className="space-y-2">
            <p className="lggg:text-lg text-end text-base font-semibold">
              Daily income
            </p>

            <div className="text-start font-sans text-2xl font-bold text-white">
              <span>$ {todayIncome || 0}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold capitalize">Earning list</h1>
        <ActionBar>
          <Input
            size="large"
            placeholder="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '250px',
            }}
            value={searchTerm}
          />
          {(!!sortBy || !!sortOrder || !!searchTerm) && (
            <Button
              style={{ margin: '0px 5px' }}
              type="default"
              onClick={resetFilters}
            >
              <ReloadOutlined />
            </Button>
          )}
        </ActionBar>
      </div>
      <div className="bgd2">
        <UMTable
          loading={isLoading}
          columns={columns}
          dataSource={paymentData}
          pageSize={size}
          totalPages={meta.total}
          showSizeChanger={true}
          onPaginationChange={onPaginationChange}
          onTableChange={onTableChange}
          showPagination={true}
        />
      </div>
    </div>
  );
}
