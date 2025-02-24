import { AccountData } from '@components/DemoData/AccountData';
import ModalComponent from '@components/Modal/ModalComponents';
import CustomImageTag from '@components/ui/CustomTag/CustomImage';
import UMTable from '@components/ui/UMTable';
import { selectCurrentUser } from '@redux/features/auth/authSlice';
import { useAppSelector } from '@redux/hooks';
import { Dropdown, Space, TableProps } from 'antd';
import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import AccountView from './AccountView';
export default function AccountDetails() {
  const user = useAppSelector(selectCurrentUser);
  //
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>('serialNumber');
  const [sortOrder, setSortOrder] = useState<string>('desc');
  //
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  //
  const query: Record<string, any> = {};
  query['limit'] = size;
  query['page'] = page;
  query['sortBy'] = sortBy;
  query['sortOrder'] = sortOrder;
  query['company'] = company;
  query['searchTerm'] = searchTerm;
  const columns: TableProps<any>['columns'] = [
    {
      title: 'Serial',
      dataIndex: 'serial',
      key: 'serial',
      ellipsis: true,
      width: 150,
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: 'Name',
      //   dataIndex: 'name',
      key: 'name',
      render: (record: any) => (
        <div className="flex items-center gap-2">
          <CustomImageTag
            src={record?.profileImage}
            width={550}
            height={550}
            preview={true}
            className="h-8 w-8 rounded-full shadow-lg md:h-12 md:w-12"
            alt=""
          />
          <span>{record.name}</span>
        </div>
      ),
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      render: (gender: string) => (
        <span
          className={`rounded-lg px-2 py-1 ${
            gender === 'Male'
              ? 'bg-blue-100 text-blue-700'
              : gender === 'Female'
                ? 'bg-pink-100 text-pink-700'
                : 'bg-green-100 text-green-700'
          }`}
        >
          {gender}
        </span>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ellipsis: true,
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Joined Date',
      dataIndex: 'joinDate',
      key: 'joinDate',
      render: (date: string) => <span>{new Date(date).toLocaleString()}</span>,
    },
    {
      title: 'Action',
      width: 100,
      render: (record: any) => {
        const menuItems = [
          {
            key: 'view',
            label: (
              <ModalComponent
                width={750}
                button={<button className="!w-20">View Details</button>}
              >
                <AccountView user={record} />
              </ModalComponent>
            ),
          },
          {
            key: 'edit',
            label: <button className="!w-20 text-red-600">Block</button>,
          },
        ];

        return (
          <Space size="middle">
            <Dropdown
              placement="bottom"
              arrow
              menu={{ items: menuItems }} // Pass items directly to the menu prop
            >
              <button className="text-blue-700">
                <BsThreeDotsVertical />
              </button>
            </Dropdown>
          </Space>
        );
      },
      fixed: 'right',
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
    setCompany('');
  };

  return (
    <div>
      <h1>Account List</h1>
      <div className="bg-bgd2">
        <UMTable
          loading={false}
          columns={columns}
          dataSource={AccountData}
          pageSize={size}
          totalPages={AccountData.length}
          showSizeChanger={true}
          onPaginationChange={onPaginationChange}
          onTableChange={onTableChange}
          showPagination={true}
        />
      </div>
    </div>
  );
}
