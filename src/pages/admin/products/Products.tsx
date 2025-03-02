import { ReloadOutlined } from '@ant-design/icons';
import ModalComponent from '@components/Modal/ModalComponents';
import ActionBar from '@components/ui/ActionBar';
import CustomImageTag from '@components/ui/CustomTag/CustomImage';
import LoadingSkeleton from '@components/ui/Loading/LoadingSkeleton';
import UMTable from '@components/ui/UMTable';

import CategoryModal from '@components/Category/CategoryModal';

import {
  useDeleteProductMutation,
  useGetAllProductQuery,
} from '@redux/features/admin/productApi';
import { selectCurrentUser } from '@redux/features/auth/authSlice';
import { useAppSelector } from '@redux/hooks';
import { ConfirmModal, ErrorModal, SuccessModal } from '@utils/modalHook';
import { Button, Dropdown, Input, Space, TableProps, Tooltip } from 'antd';
import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { IMeta } from '../../../types/common';
export default function Product() {
  const user = useAppSelector(selectCurrentUser);
  //
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(20);
  const [sortBy, setSortBy] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');
  //
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  //
  const query: Record<string, any> = {};
  query['limit'] = size;
  query['page'] = page;
  query['sortBy'] = sortBy;
  query['sortOrder'] = sortOrder;
  query['createAtFrom'] = month;
  query['searchTerm'] = searchTerm;
  query['needProperty'] = 'productCategoryId';

  const { data, isLoading } = useGetAllProductQuery(query);
  const [deleteProduct, { isLoading: dLoading }] = useDeleteProductMutation();
  if (isLoading) {
    return <LoadingSkeleton sectionNumber={5} />;
  }
  const handleDelete = (id: string) => {
    ConfirmModal({ message: `Are you sure you want to delete` }).then(
      async (res) => {
        if (res.isConfirmed) {
          try {
            const res = await deleteProduct(id).unwrap();
            SuccessModal('Category Successfully Deleted');
          } catch (error: any) {
            ErrorModal(error.message);
          }
        }
      }
    );
  };
  let allData = data?.data || [];
  const meta = (data?.meta as IMeta) || [];

  const columns: TableProps<any>['columns'] = [
    {
      title: 'S/N',
      ellipsis: true,
      width: 100,
      render: (data: any) => (
        <div className="flex items-center justify-between gap-2 text-lg font-bold">
          <p>S/N -{data.serialNumber}</p>
        </div>
      ),
    },
    {
      title: 'Product Name',
      ellipsis: true,
      render: (record: any) => (
        <div className="flex items-center justify-start gap-2">
          {record?.images && (
            <CustomImageTag
              src={record?.images[0]}
              width={550}
              height={550}
              preview={true}
              className="h-8 w-8 rounded-full shadow-lg md:h-12 md:w-12"
              alt=""
            />
          )}
          <Tooltip title={record.name}>
            <p className="truncate text-lg font-bold">{record.name}</p>
          </Tooltip>
        </div>
      ),
    },

    {
      title: 'Category',
      ellipsis: true,
      dataIndex: 'productCategoryDetails',
      render: (record: any) => (
        <div className="flex items-start justify-between gap-2 text-lg font-bold">
          <p>{record.title}</p>
        </div>
      ),
      width: 200,
    },
    {
      title: 'Status',
      ellipsis: true,
      dataIndex: 'status',
      render: (record: any) => (
        <div className="flex items-start justify-between gap-2 text-lg font-bold">
          <p>{record}</p>
        </div>
      ),
      width: 100,
    },
    {
      title: 'Price',
      ellipsis: true,
      dataIndex: 'pricing',
      render: (record: any) => (
        <div className="flex items-start justify-between gap-2 text-lg font-bold">
          <p>{record.price}</p>
        </div>
      ),
      width: 100,
    },
    {
      title: 'Date',
      ellipsis: true,
      render: (record: any) => (
        <div className="flex items-start justify-between gap-2 text-lg font-bold">
          <p>{new Date(record.createdAt).toDateString()}</p>
        </div>
      ),
      width: 200,
    },
    {
      title: 'Action',
      width: 120,
      render: (record: any) => {
        const menuItems = [
          {
            key: 'view',
            label: (
              <ModalComponent
                button={
                  <Button className="!w-20" type="default">
                    View
                  </Button>
                }
              >
                <CategoryModal initialValues={record} readOnly={true} />
              </ModalComponent>
            ),
          },
          {
            key: 'edit',
            label: (
              <ModalComponent
                button={
                  <Button className="!w-20" type="default">
                    Edit
                  </Button>
                }
              >
                <CategoryModal initialValues={record} />
              </ModalComponent>
            ),
          },
          {
            key: 'delete',
            label: (
              <Button
                className="!w-20"
                type="default"
                loading={dLoading}
                onClick={() => handleDelete(record._id)}
              >
                Delete
              </Button>
            ),
          },
        ];

        return (
          <Space size="middle">
            <Dropdown
              placement="bottom"
              arrow
              menu={{ items: menuItems }} // Pass items directly to the menu prop
            >
              <button className="text-2xl text-blue-700">
                <BsThreeDotsVertical />{' '}
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
    setMonth('');
  };

  return (
    <div>
      <h1 className="text-center text-3xl font-bold capitalize">
        Product list
      </h1>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <h2 className="ml-2">Products</h2>
        </div>

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
      {/* <div>
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-purple-400 to-pink-500">
          <div className="grid grid-cols-2 gap-4 rounded-xl bg-white p-6 shadow-md">
            {allData.map((data) => {
              return (
                <div key={data._id}>
                  <h2 className="mb-2 text-lg font-semibold">{data.title}</h2>
                  <button className="rounded-md bg-purple-600 px-4 py-2 text-white">
                    Edit
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div> */}

      <div className="bg-bgd2">
        <UMTable
          loading={isLoading}
          columns={columns}
          dataSource={allData}
          pageSize={size}
          totalPages={meta?.total}
          showSizeChanger={true}
          onPaginationChange={onPaginationChange}
          onTableChange={onTableChange}
          showPagination={true}
        />
      </div>
      {/* <iframe
        src="https://d43af62ilhxe5.cloudfront.net/others/plate.html"
        width="100%"
        height="500px"
      ></iframe> */}
    </div>
  );
}
