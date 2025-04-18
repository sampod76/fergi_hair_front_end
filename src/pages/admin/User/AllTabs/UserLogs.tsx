import CustomImageTag from '@components/ui/CustomTag/CustomImage';
import UMTable from '@components/ui/UMTable';
import { useGetAllServiceLoggerQuery } from '@redux/features/admin/serviceLoggerApi';
import { TableProps, Tooltip } from 'antd';
import { useState } from 'react';

export default function UserLogs({
  roleBaseUserId,
}: {
  roleBaseUserId: string;
}) {
  //
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(100);
  const [sortBy, setSortBy] = useState<string>(''); //createdAt
  const [sortOrder, setSortOrder] = useState<string>(''); //desc
  //
  const query: Record<string, string | number> = {};
  query['limit'] = size;
  query['page'] = page;
  query['sortBy'] = sortBy;
  query['sortOrder'] = sortOrder;
  query['author.roleBaseUserId'] = roleBaseUserId;
  const { data, isLoading, isFetching } = useGetAllServiceLoggerQuery(query);

  const allData = data?.data;
  console.log('🚀 ~ allData:', allData);
  const meta = data?.meta;
  const columns: TableProps<any>['columns'] = [
    // {
    //   title: 'S/N',
    //   ellipsis: true,
    //   width: 100,
    //   dataIndex: 'serialNumber',
    //   render: (data: any) => (
    //     <div className="flex items-center justify-between gap-2">
    //       <p>S/N-{data}</p>
    //     </div>
    //   ),
    // },
    {
      title: 'Image',
      ellipsis: true,
      width: 100,

      render: (record: any) => (
        <div className="flex items-center justify-between gap-2">
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
        </div>
      ),
    },
    {
      title: 'Log type',
      ellipsis: true,
      width: 150,
      dataIndex: 'logType',
      render: (record: any) => (
        <div className="flex items-center justify-center gap-2">
          <Tooltip title={record}>
            <p className="truncate">{record}</p>
          </Tooltip>
        </div>
      ),
    },
    {
      title: 'Product Used',
      ellipsis: true,
      dataIndex: 'productsUsed',
      render: (record: any) => (
        <div className="flex items-center justify-start gap-2">
          <Tooltip title={record}>
            <p className="truncate">{record}</p>
          </Tooltip>
        </div>
      ),
    },
    {
      title: 'Hair Health',
      ellipsis: true,
      dataIndex: 'hairHealth',
      render: (record: any) => (
        <div className="flex items-center justify-start gap-2">
          <Tooltip title={record}>
            <p className="truncate">{record}</p>
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
  };
  return (
    <div>
      {/* UserLogs {roleBaseUserId} */}
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
    </div>
  );
}
