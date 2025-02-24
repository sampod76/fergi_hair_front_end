import { ReloadOutlined } from '@ant-design/icons';
import ModalComponent from '@components/Modal/ModalComponents';
import ActionBar from '@components/ui/ActionBar';
import CustomImageTag from '@components/ui/CustomTag/CustomImage';
import LoadingSkeleton from '@components/ui/Loading/LoadingSkeleton';
import UMTable from '@components/ui/UMTable';

import ViewUserInfoModal from '@components/UsersAllComponets/viewUserInfoModal';
import {
  useDeleteVendorMutation,
  useGetAllVendorQuery,
} from '@redux/features/admin/vendorUserApi';
import { selectCurrentUser } from '@redux/features/auth/authSlice';
import { useAppSelector } from '@redux/hooks';
import { ConfirmModal, ErrorModal, SuccessModal } from '@utils/modalHook';
import { Button, Dropdown, Input, Menu, Space, TableProps } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IMeta } from '../../../types/common';
export default function VendorList({ companyType }: { companyType: string }) {
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
  // query['company'] = companyType;
  query['searchTerm'] = searchTerm;

  const { data, isLoading } = useGetAllVendorQuery(query);
  const [deleteVendor, { isLoading: dLoading }] = useDeleteVendorMutation();

  if (isLoading) {
    return <LoadingSkeleton sectionNumber={5} />;
  }

  let resentUser = data?.data || [];
  // console.log('🚀 ~ Company ~ resentUser:', resentUser);
  const meta = (data?.meta as IMeta) || [];

  const columns: TableProps<any>['columns'] = [
    {
      title: 'user id',
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
    {
      title: 'Contact Number',
      dataIndex: ['contactNumber'],
      width: 150,
    },
    // {
    //   title: 'Package',
    //   // dataIndex: ['company'],
    //   width: 150,
    //   render(value, record, index) {
    //     return (
    //       <div className="rounded-xl bg-blue-200 py-2 font-bold text-blue-700">
    //         {'Gold'}
    //       </div>
    //     );
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
          <Space size="middle">
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key="view">
                    <Button
                      // type="link"
                      className="w-full"
                      // icon={<EditOutlined />}
                      //   onClick={() => handleEdit(record._id)}
                    >
                      <div className="flex items-center justify-center gap-3">
                        <ModalComponent
                          button={<button>View</button>}
                          width={700}
                        >
                          <div className="my-6 flex items-center justify-center">
                            <ViewUserInfoModal
                              data={{ ...record, role: 'generalUser' }}
                            />
                          </div>
                        </ModalComponent>
                      </div>
                    </Button>
                  </Menu.Item>
                  <Menu.Item key="submit task">
                    <Button
                      // type="link"
                      className="w-full"
                      // icon={<EditOutlined />}
                    >
                      <Link
                        to={`/${user?.role}/show-user-submissions/${record?._id}?category=${'6763a68e34f47a3c642d7cf1'}&categoryName=Truck Registration-Insurance Card`}
                      >
                        All Doc
                      </Link>
                    </Button>
                  </Menu.Item>
                  <Menu.Item key="see order">
                    <Button
                      // type="link"
                      className="w-full"
                      // icon={<EditOutlined />}
                    >
                      <Link
                        to={`/${user?.role}/show-packages/${record?._id}?userId=${record?._id}`}
                      >
                        Show Packages
                      </Link>
                    </Button>
                  </Menu.Item>
                  <Menu.Item key="sudd">
                    <Button
                      // type="link"
                      className="w-full"
                      // icon={<EditOutlined />}
                      onClick={() => handleDelete(record._id)}
                    >
                      Delete
                    </Button>
                  </Menu.Item>
                </Menu>
              }
            >
              <Button type="link" className="text-blue-700">
                Action
              </Button>
            </Dropdown>
          </Space>
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
  const handleDelete = (id: string) => {
    ConfirmModal({ message: `Are you sure you want to delete` }).then(
      async (res) => {
        if (res.isConfirmed) {
          try {
            const res = await deleteVendor(id).unwrap();
            SuccessModal('Successfully Deleted');
          } catch (error: any) {
            ErrorModal(error.message);
          }
        }
      }
    );
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
