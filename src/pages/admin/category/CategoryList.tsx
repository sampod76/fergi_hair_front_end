import { ReloadOutlined } from '@ant-design/icons';
import ModalComponent from '@components/Modal/ModalComponents';
import ActionBar from '@components/ui/ActionBar';
import CustomImageTag from '@components/ui/CustomTag/CustomImage';
import LoadingSkeleton from '@components/ui/Loading/LoadingSkeleton';
import UMTable from '@components/ui/UMTable';

import CategoryModal from '@components/Category/CategoryModal';
import {
  useDeleteCategoryMutation,
  useGetAllCategoryQuery,
} from '@redux/features/admin/categoryApi';
import { selectCurrentUser } from '@redux/features/auth/authSlice';
import { useAppSelector } from '@redux/hooks';
import { convertToTitleCase } from '@utils/convertToTitleCase';
import { ConfirmModal, ErrorModal, SuccessModal } from '@utils/modalHook';
import {
  Button,
  Dropdown,
  Input,
  Select,
  Space,
  TableProps,
  Tooltip,
} from 'antd';
import { useState } from 'react';
import { IMeta } from '../../../types/common';
export default function CategoryList() {
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

  const { data, isLoading } = useGetAllCategoryQuery(query);
  const [deleteCategory, { isLoading: dLoading }] = useDeleteCategoryMutation();
  if (isLoading) {
    return <LoadingSkeleton sectionNumber={5} />;
  }
  const handleDelete = (id: string) => {
    ConfirmModal({ message: `Are you sure you want to delete` }).then(
      async (res) => {
        if (res.isConfirmed) {
          try {
            const res = await deleteCategory(id).unwrap();
            SuccessModal('Category Successfully Deleted');
          } catch (error: any) {
            ErrorModal(error.message);
          }
        }
      }
    );
  };
  let resentUser = data?.data || [];
  const meta = (data?.meta as IMeta) || [];

  const columns: TableProps<any>['columns'] = [
    {
      title: '#ID',
      ellipsis: true,
      width: 200,
      render: (data: any) => (
        <div className="flex items-center justify-between gap-2">
          <p>
            {data.company === 'companyOne'
              ? 'O - ' + data.serialNumber
              : 'T - ' + data.serialNumber}
          </p>
        </div>
      ),
    },
    {
      title: 'Title',
      ellipsis: true,
      render: (record: any) => (
        <div className="flex items-center justify-start gap-2">
          <CustomImageTag
            src={record?.image}
            width={550}
            height={550}
            preview={true}
            className="h-8 w-8 rounded-full shadow-lg md:h-12 md:w-12"
            alt=""
          />
          <Tooltip title={record.title}>
            <p className="truncate">{record.title}</p>
          </Tooltip>
        </div>
      ),
    },
    {
      title: 'Type',
      dataIndex: ['company'],
      width: 250,
      render: (value, record, index) => {
        return value && convertToTitleCase(value);
      },
    },
    {
      title: 'Date',
      ellipsis: true,
      render: (record: any) => (
        <div className="flex items-start justify-between gap-2">
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
              <button className="text-blue-700">Action</button>
            </Dropdown>
          </Space>
        );
      },
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <h1 className="text-2xl font-bold capitalize">Category list</h1>
          <ModalComponent
            button={
              <p className="mx-2 cursor-pointer rounded-xl border px-3 text-lg font-bold text-green-400">
                Create Category
              </p>
            }
          >
            <CategoryModal />
          </ModalComponent>
        </div>

        <ActionBar>
          <div className="mx-2">
            <Select
              onChange={(value) => setCompany(value)}
              placeholder="Select a company"
              allowClear
              size="large"
            >
              <Select.Option value="companyDocumentSubmit">
                Company Document Submit
              </Select.Option>
              <Select.Option value="driverDocumentSubmit">
                Driver Document Submit
              </Select.Option>
            </Select>
          </div>
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
