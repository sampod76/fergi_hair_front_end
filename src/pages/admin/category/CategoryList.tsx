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
import { ConfirmModal, ErrorModal, SuccessModal } from '@utils/modalHook';
import { Button, Dropdown, Input, Space, TableProps, Tooltip } from 'antd';
import { useState } from 'react';
import { AiTwotonePlusCircle } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { IMeta } from '../../../types/common';
export default function CategoryList() {
  const user = useAppSelector(selectCurrentUser);
  //
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(100);
  const [sortBy, setSortBy] = useState<string>('serialNumber');
  const [sortOrder, setSortOrder] = useState<string>('asc');
  //
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [categoryType, setCategoryType] = useState<string>('profile');
  //
  const query: Record<string, any> = {};
  query['limit'] = size;
  query['page'] = page;
  query['sortBy'] = sortBy;
  query['sortOrder'] = sortOrder;
  query['categoryType'] = categoryType;
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
  let allData = data?.data || [];

  const meta = (data?.meta as IMeta) || [];

  const columns: TableProps<any>['columns'] = [
    {
      title: 'S/N',
      ellipsis: true,
      width: 200,
      dataIndex: 'serialNumber',
      render: (data: any) => (
        <div className="flex items-center justify-between gap-2">
          <p>S/N-{data}</p>
        </div>
      ),
    },
    {
      title: 'Title',
      ellipsis: true,
      render: (record: any) => (
        <div className="flex items-center justify-start gap-2">
          {record?.images?.length && (
            <CustomImageTag
              src={record?.images[0]}
              width={550}
              height={550}
              preview={true}
              className="h-8 w-8 rounded-full shadow-lg md:h-12 md:w-12"
              alt=""
            />
          )}
          <Tooltip title={record.label}>
            <p className="truncate">{record.label}</p>
          </Tooltip>
        </div>
      ),
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
                    Edit/View
                  </Button>
                }
              >
                <CategoryModal initialValues={record} />
              </ModalComponent>
            ),
          },
          // {
          //   key: 'delete',
          //   label: (
          //     <Button
          //       className="!w-20"
          //       type="default"
          //       loading={dLoading}
          //       onClick={() => handleDelete(record._id)}
          //     >
          //       Delete
          //     </Button>
          //   ),
          // },
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
    setCategoryType('');
  };

  return (
    <div>
      <h1 className="text-center text-3xl font-bold capitalize">
        Manage Hair Identity
      </h1>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <ModalComponent
            button={
              <p className="mx-2 flex cursor-pointer items-center justify-center gap-1 rounded-xl border px-3 text-lg font-bold text-gray-600">
                <AiTwotonePlusCircle /> Create
              </p>
            }
          >
            <CategoryModal />
          </ModalComponent>
          {/* <ModalComponent
            button={
              <p className="mx-2 flex cursor-pointer items-center justify-center rounded-xl border px-3 text-lg font-bold text-blue-400">
                <IoCreate /> Update S/N
              </p>
            }
            width={400}
          >
            <div className="mx-2">
              <Select
                // onChange={(value) => setCompany(value)}
                placeholder="Select Category Serial Number"
                allowClear
                size="large"
              >
                <Select.Option value="companyDocumentSubmit">
                  <Link
                    to={`/${user?.role}/category-update/companyDocumentSubmit`}
                  >
                    Company Document Submit
                  </Link>
                </Select.Option>
                <Select.Option value="driverDocumentSubmit">
                  <Link
                    to={`/${user?.role}/category-update/driverDocumentSubmit`}
                  >
                    Driver Document Submit
                  </Link>
                </Select.Option>
              </Select>
            </div>
          </ModalComponent> */}
        </div>

        <ActionBar>
          {/* <div className="mx-2">
            <Select
              onChange={(value) => setCategoryType(value)}
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
          </div> */}
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
