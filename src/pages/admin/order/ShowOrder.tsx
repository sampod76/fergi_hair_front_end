import ModalComponent from '@components/Modal/ModalComponents';
import EditOrderTime from '@components/Order/EditOrderTime';
import ActionBar from '@components/ui/ActionBar';
import CustomImageTag from '@components/ui/CustomTag/CustomImage';
import UMTable from '@components/ui/UMTable';
import { useGetAllOrderQuery } from '@redux/features/admin/orderApi';
import { Select, TableProps, Tag } from 'antd';
import { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
export default function ShowOrder() {
  const { userId } = useParams();
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [sortOrder, setSortOrder] = useState<string>('decs');
  const [accessType, setAccessType] = useState<string>('freePackage');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const query: Record<string, any> = {};
  query['limit'] = size;
  query['page'] = page;
  query['sortBy'] = sortBy;
  query['sortOrder'] = sortOrder;
  query['authorRoleBaseUserId'] = userId;
  query['accessType'] = accessType;
  query['orderType'] = 'package';
  query['needProperty'] = 'author';
  const { data, isLoading } = useGetAllOrderQuery(query);
  const orderData = data?.data;
  const meta = data?.meta!;
  const columns: TableProps<any>['columns'] = [
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
      title: 'Package',
      dataIndex: ['orderPackage', 'packageName'],
      ellipsis: true,
      render: (data) => {
        let color = '';
        let text = '';

        switch (data) {
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
      title: 'Amount',
      //   dataIndex: ['orderPackage', 'price'],
      ellipsis: true,
      // dataIndex: ['roleInfo'],
      render: (record: any) => {
        return (
          <div className="flex items-center justify-between gap-2">
            <p>$ {!record.isTrial ? record?.orderPackage?.price : 'free'}</p>
          </div>
        );
      },
      width: 100,
    },

    {
      title: 'Expire timeline',
      dataIndex: 'expiryDate',
      ellipsis: true,
      render: (record: any) => {
        return (
          <div className="flex items-start justify-between gap-2">
            <p className="text-center">{new Date(record).toDateString()}</p>
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
              button={<FaEdit className="text-[20px]" />}
              width={700}
            >
              <div className="my-6 flex items-center justify-center">
                <EditOrderTime order={record} />
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
      <ActionBar>
        <div className="mx-2">
          <Select
            onChange={(value) => setAccessType(value)}
            placeholder="Select a Package type"
            allowClear
            size="large"
            value={accessType}
            className="min-w-48"
          >
            <Select.Option value="freePackage ">FreePackage</Select.Option>
            <Select.Option value="purchase">Purchase Package</Select.Option>
          </Select>
        </div>
      </ActionBar>
      <div className="bgd2">
        <UMTable
          loading={isLoading}
          columns={columns}
          dataSource={orderData}
          pageSize={size}
          totalPages={meta?.total || 0}
          showSizeChanger={true}
          onPaginationChange={onPaginationChange}
          onTableChange={onTableChange}
          showPagination={true}
        />
      </div>
    </div>
  );
}
