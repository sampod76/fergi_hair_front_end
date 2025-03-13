import UMTable from '@components/ui/UMTable';
import { useGetAllRoutingReminderQuery } from '@redux/features/admin/routingReminderApi';
import { TableProps, Tooltip } from 'antd';
import { useState } from 'react';

export default function UserRoutings({
  roleBaseUserId,
}: {
  roleBaseUserId: string;
}) {
  console.log('🚀 ~ roleBaseUserId:', roleBaseUserId);
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
  const { data, isLoading, isFetching } = useGetAllRoutingReminderQuery(query);

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
      title: 'Reminder Type',
      ellipsis: true,
      width: 150,
      dataIndex: 'reminderType',
      render: (record: any) => (
        <div className="flex items-center justify-center gap-2">
          <Tooltip title={record}>
            <p className="truncate">{record}</p>
          </Tooltip>
        </div>
      ),
    },
    {
      title: 'Schedule Type',
      ellipsis: true,
      dataIndex: 'scheduleType',
      width: 150,
      render: (record: any) => (
        <div className="flex items-center justify-center gap-2">
          <Tooltip title={record}>
            <p className="truncate capitalize">{record}</p>
          </Tooltip>
        </div>
      ),
    },
    {
      title: 'Product Details',
      ellipsis: true,
      dataIndex: 'productUseDetails',
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
          loading={isLoading || isFetching}
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
