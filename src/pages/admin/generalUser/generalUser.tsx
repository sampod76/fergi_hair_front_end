import { ReloadOutlined } from '@ant-design/icons';
import ModalComponent from '@components/Modal/ModalComponents';
import ActionBar from '@components/ui/ActionBar';
import CustomImageTag from '@components/ui/CustomTag/CustomImage';
import LoadingSkeleton from '@components/ui/Loading/LoadingSkeleton';
import UMTable from '@components/ui/UMTable';

import ViewUserInfoModal from '@components/UsersAllComponets/viewUserInfoModal';
import { useGetAllGeneralUserQuery } from '@redux/features/admin/generalUsersApi';
import { selectCurrentUser } from '@redux/features/auth/authSlice';
import { useAppSelector, useDebounced } from '@redux/hooks';
import { Button, Input, TableProps } from 'antd';
import { useState } from 'react';
import { GrView } from 'react-icons/gr';
import { TbViewfinder } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { IMeta } from '../../../types/common';
export default function GeneralUser({ roleType }: { roleType: string }) {
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
  query['needProperty'] = 'roleInfo';
  // query['role'] = 'generalUser';
  query['roleType'] = roleType;
  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (debouncedSearchTerm) {
    query['searchTerm'] = debouncedSearchTerm;
  }

  const { data, isLoading } = useGetAllGeneralUserQuery(query);
  if (isLoading) {
    return <LoadingSkeleton sectionNumber={5} />;
  }

  let resentUser = data?.data || [];
  console.log('🚀 ~ GeneralUser ~ resentUser:', resentUser);

  const meta = (data?.meta as IMeta) || [];

  const columns: TableProps<any>['columns'] = [
    {
      title: 'User id',
      // dataIndex: "createdAt",
      ellipsis: true,
      // dataIndex: ['roleInfo'],
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
    // {
    //   title: 'Type',
    //   dataIndex: ['role'],
    //   width: 250,
    //   render: (value, record, index) => {
    //     return value && convertToTitleCase(value);
    //   },
    // },
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
          <div className="flex items-center justify-center gap-3">
            <ModalComponent
              button={<GrView className="text-[20px] text-bgd" />}
              width={700}
            >
              <div className="my-6 flex items-center justify-center">
                <ViewUserInfoModal data={{ ...record, role: 'generalUser' }} />
              </div>
            </ModalComponent>
            <Link to={`/${user?.role}/user-details/${record._id}`}>
              <TbViewfinder className="text-[20px] text-[#27a470]" />
            </Link>
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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold capitalize">Users</h1>
        <ActionBar>
          <Input
            size="large"
            placeholder="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '250px',
            }}
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
      <div className="bg-bgd2">
        <UMTable
          loading={isLoading}
          columns={columns}
          dataSource={resentUser}
          pageSize={size}
          totalPages={meta?.total}
          showSizeChanger={true}
          onPaginationChange={onPaginationChange}
          onTableChange={onTableChange}
          showPagination={true}
        />
      </div>
    </div>
  );
}
