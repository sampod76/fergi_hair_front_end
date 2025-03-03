import { ReloadOutlined } from '@ant-design/icons';
import ModalComponent from '@components/Modal/ModalComponents';
import ActionBar from '@components/ui/ActionBar';
import CustomImageTag from '@components/ui/CustomTag/CustomImage';
import LoadingSkeleton from '@components/ui/Loading/LoadingSkeleton';
import UMTable from '@components/ui/UMTable';

import CreateProduct from '@components/Product/CreateProduct';
import {
  useDeleteProductMutation,
  useGetAllProductQuery,
} from '@redux/features/admin/productApi';
import { selectCurrentUser } from '@redux/features/auth/authSlice';
import { useAppSelector } from '@redux/hooks';
import { ConfirmModal, ErrorModal, SuccessModal } from '@utils/modalHook';
import {
  Button,
  DatePicker,
  Dropdown,
  Flex,
  Input,
  Select,
  Space,
  TableProps,
  Tag,
  Tooltip,
} from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaFilter } from 'react-icons/fa';
import { MdAddToPhotos } from 'react-icons/md';
import { IMeta } from '../../../types/common';
export default function Product() {
  const user = useAppSelector(selectCurrentUser);
  const [filteredInfo, setFilteredInfo] = useState<{ status: string[] }>({
    status: ['active'],
  });

  //
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(20);
  const [sortBy, setSortBy] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');
  //
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  //
  //
  const [dates, setDates] = useState<{
    startDate: string;
    endDate: string;
  }>({ startDate: '', endDate: '' });
  //

  const query: Record<string, any> = {};
  query['limit'] = size;
  query['page'] = page;
  query['sortBy'] = sortBy;
  query['sortOrder'] = sortOrder;
  query['createdAtFrom'] = dates.startDate;
  query['createdAtTo'] = dates.endDate;
  query['searchTerm'] = searchTerm;
  query['needProperty'] = 'productCategoryId';
  query['status'] = filteredInfo.status[0];

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
        <div className="flex items-center justify-between gap-2 text-lg font-normal">
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
            <p className="truncate text-lg font-normal">{record.name}</p>
          </Tooltip>
        </div>
      ),
    },

    {
      title: 'Category',
      ellipsis: true,
      dataIndex: 'productCategoryDetails',
      render: (record: any) => (
        <div className="flex items-start justify-between gap-2 text-lg font-normal">
          <p>{record.title}</p>
        </div>
      ),
      width: 200,
    },
    {
      title: 'Status',
      ellipsis: true,
      dataIndex: 'status',
      filters: [
        { text: 'Active', value: 'active' },
        { text: 'Inactive', value: 'inactive' },
      ],
      filteredValue: filteredInfo.status || null,
      onFilter: (value, record) => record.status.includes(value), // use client-side
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Select
            style={{ width: '100%', marginBottom: 8, display: 'block' }}
            value={selectedKeys[0]}
            onChange={(value) => setSelectedKeys(value ? [value] : [])}
            placeholder="Select a status"

            // filterOption={(input, option) =>
            //   option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            // }
          >
            <Select.Option value="active">Active</Select.Option>
            <Select.Option value="inactive">Inactive</Select.Option>
          </Select>
          <Flex justify="center" align="center" gap={2}>
            <Button
              type="primary"
              onClick={() => confirm()}
              size="small"
              style={{ width: '50%', marginRight: 8 }}
            >
              OK
            </Button>
            <Button
              onClick={() => {
                if (typeof clearFilters === 'function') {
                  clearFilters();
                }
                setFilteredInfo((c: any) => ({ ...c, status: [] }));
              }}
              size="small"
              style={{ width: '50%' }}
            >
              Reset
            </Button>
          </Flex>
        </div>
      ),
      filterIcon: (filtered) => (
        <FaFilter
          style={{ color: filtered ? '#FF00FF' : '#FFFFFF', fontSize: '1rem' }}
        />
      ),
      render: (record: any) => (
        <div className="flex items-start justify-between gap-2 text-lg font-normal">
          {record === 'active' ? (
            <Tag color="green">{record}</Tag>
          ) : (
            <Tag color="red">{record}</Tag>
          )}
        </div>
      ),
      width: 120,
    },
    {
      title: 'Price',
      ellipsis: true,
      dataIndex: 'pricing',
      render: (record: any) => (
        <div className="flex items-start justify-between gap-2 text-lg font-normal">
          <p>$ {record.price}</p>
        </div>
      ),
      width: 100,
    },
    {
      title: 'Date',
      ellipsis: true,
      render: (record: any) => (
        <div className="flex items-start justify-between gap-2 text-lg font-normal">
          <p>{new Date(record.createdAt).toDateString()}</p>
        </div>
      ),
      width: 200,
    },
    {
      title: 'Action',
      width: 90,
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
                <CreateProduct initialValues={record} readOnly={true} />
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
                <CreateProduct initialValues={record} />
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
  const handleFilterChange = (values: Record<string, any>) => {
    let filterValue: Record<string, any> = { ...filteredInfo };
    Object.entries(values).forEach(([key, value]) => {
      filterValue[key] = value;
    });
    //@ts-ignore
    setFilteredInfo(filterValue);
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
    handleFilterChange(filter);
  };

  const resetFilters = () => {
    setSortBy('');
    setSortOrder('');
    setSearchTerm('');
    setMonth('');
  };
  const onChangeDatePicker = (
    dateRange: [Dayjs | null, Dayjs | null] | null,
    dateStrings: string[]
  ) => {
    // console.log(dateRange, 'dateRange'); //["ant-date format"]
    // console.log(dateStrings, 'dateStrings'); // ['2024-10-01 00:00:00', '2024-10-31 23:59:59']
    if (dateRange && dateRange[0] && dateRange[1]) {
      const formattedDate = dateRange.map((date) => date!.toISOString());
      setDates({
        startDate: formattedDate[0],
        endDate: formattedDate[1],
      });
      //  console.log('Selected Dates: ', formattedDate); //iso format ['2024-09-30T18:00:00.000Z', '2024-10-31T17:59:59.999Z']
    } else {
      setDates({
        startDate: '',
        endDate: '',
      });
    }
  };

  return (
    <div>
      <h1 className="text-center text-3xl font-normal capitalize">
        Product list
      </h1>
      <div className="mt-1 flex w-full items-center justify-center gap-1 rounded-xl bg-[#b6549c]">
        <ModalComponent
          button={
            <button className="mx-2 flex w-full cursor-pointer items-center justify-center gap-1 p-2 px-3 text-lg font-bold text-white">
              <MdAddToPhotos className="mt-1" /> Add New Product
            </button>
          }
          width={700}
        >
          <CreateProduct />
        </ModalComponent>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <h2 className="ml-2">Products</h2>
        </div>
        <div className="flex items-start justify-center gap-2">
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
          <DatePicker.RangePicker
            style={{
              fontSize: '25px',
              marginBottom: '15px',
              fontWeight: 'normal',
              marginTop: '10px',
            }}
            /*
           disabledDate={(current) =>
            current && current < dayjs().startOf("day") // Using dayjs to disable past dates
          }
        */
            /* // multiple array data disabled ['2024-11-01','2024-11-05']
          disabledDate={(current) => {
            // Disable if current date is in the disabledDates array
            return (
              current &&
              disabledDates.some((date) => date.isSame(current, 'day'))
            );
          }} 
        */
            /*   //disable dara range
          disabledDate={(current) => {
            // চেক করছে যে current তারিখটি startDate এবং endDate এর মধ্যে পড়ে কি না
            return (
              current &&
              current.isAfter(disableStartDate.startOf('day')) &&
              current.isBefore(disableEndDate.endOf('day'))
            );
          }} 
      */
            presets={[
              {
                label: (
                  <span aria-label="Current Time to End of Day">Now ~ EOD</span>
                ),
                value: () => [dayjs(), dayjs().endOf('day')], // from now to end of the current day
              },
              {
                label: 'Yesterday', //2024-10-30 00:00:00  to 2024-10-30 23:59:59
                value: [
                  dayjs().subtract(1, 'day').startOf('day'),
                  dayjs().subtract(1, 'day').endOf('day'),
                ], // entire day for yesterday
              },
              {
                label: 'Last Week', //2024-10-24 00:00:00 to 2024-10-31 23:59:59
                value: [
                  dayjs().subtract(7, 'day').startOf('day'),
                  dayjs().endOf('day'),
                ], // from last week to end of current day
              },
              // {
              //   label: 'Last Month', // 2024-09-30 00:00:00 to 2024-10-31 23:59:59
              //   value: [dayjs().subtract(1, 'month').endOf('day'), dayjs().endOf('day')], // from last month to end of current day
              // },
              {
                label: 'Last 30 Days', // 2024-09-30 00:00:00 to 2024-10-31 23:59:59
                value: [
                  dayjs().add(-30, 'd').startOf('day'),
                  dayjs().endOf('day'),
                ], // from last month to end of current day
              },
            ]}
            /*
           presets={[
            { label: 'Yesterday', value: [dayjs().add(-1, 'd'), dayjs()] },
            { label: 'Last Week', value: [dayjs().add(-7, 'd'), dayjs()] },
            { label: 'Last 30 Days', value: [dayjs().add(-30, 'd'), dayjs()] },
            { label: 'Last 90 Days', value: [dayjs().add(-90, 'd'), dayjs()] },
          ]} 
            */
            // showTime
            //  format="YYYY/MM/DD HH:mm:ss"
            size="large"
            onChange={onChangeDatePicker}
          />
        </div>
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
