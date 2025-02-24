import AddAdvertisementForm from '@components/AdvertisementAllCom/AdvertisementViewCreate';
import ModalComponent from '@components/Modal/ModalComponents';
import CustomImageTag from '@components/ui/CustomTag/CustomImage';
import UMTable from '@components/ui/UMTable';
import {
  useDeleteTestimonialMutation,
  useGetAllTestimonialQuery,
} from '@redux/features/admin/testimonialsApi';
import { ConfirmModal, ErrorModal, SuccessModal } from '@utils/modalHook';
import { Button, Dropdown, Space } from 'antd';
import { useState } from 'react';

export default function AdvertisementList() {
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
  // query['needProperty'] = 'roleInfo';
  // query['role'] = 'generalUser';
  query['searchTerm'] = searchTerm;
  const { data, isLoading } = useGetAllTestimonialQuery(query);
  const [deleteTestimonial, { isLoading: dloading }] =
    useDeleteTestimonialMutation();
  const allData = data?.data;
  const meta = data?.meta;
  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (data: string) => (
        <div className="flex items-center justify-center">
          <CustomImageTag
            src={data}
            alt="Shop"
            width={150}
            height={150}
            className="w-44 rounded-xl"
          />
        </div>
      ),
    },
    {
      title: 'Company Name',
      dataIndex: 'company',
      key: 'company',
    },
    {
      title: 'Total Views',
      dataIndex: 'totalClickableUsers',
      key: 'totalClickableUsers',
    },
    {
      title: 'Exp Date',
      // dataIndex: 'endDate',
      key: 'endDate',
      render: (data: any) => {
        const date = new Date(data.endDate).toDateString();
        return <p>{date}</p>;
      },
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
                <AddAdvertisementForm initialValues={record} readOnly={true} />
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
                <AddAdvertisementForm initialValues={record} />
              </ModalComponent>
            ),
          },
          {
            key: 'delete',
            label: (
              <Button
                className="!w-20"
                type="default"
                loading={false}
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

  const handleDelete = (id: string) => {
    ConfirmModal({ message: `Are you sure you want to delete` }).then(
      async (res) => {
        if (res.isConfirmed) {
          try {
            const res = await deleteTestimonial(id).unwrap();
            SuccessModal('Successfully Deleted');
          } catch (error: any) {
            ErrorModal(error.message);
          }
        }
      }
    );
  };
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
      <div className="my-3 flex justify-end">
        <ModalComponent
          button={
            <Button className="!bg-bgd !text-white">
              + Add New Advertisement
            </Button>
          }
        >
          <AddAdvertisementForm />
        </ModalComponent>
      </div>
      <UMTable
        loading={isLoading}
        columns={columns}
        dataSource={allData}
        pageSize={size}
        totalPages={meta?.total}
        // totalPages={demoData.length}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />
    </div>
  );
}
