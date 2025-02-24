import { Table } from 'antd';

type UMTableProps = {
  loading?: boolean;
  columns: any;
  dataSource: any;
  pageSize?: number;
  totalPages?: number;
  showSizeChanger?: boolean;
  onPaginationChange?: (page: number, pageSize: number) => void;
  onTableChange?: (pagination: any, filter: any, sorter: any) => void;
  showPagination?: boolean;
};

const UMTable = ({
  loading = false,
  columns,
  dataSource,
  pageSize,
  totalPages,
  showSizeChanger = true,
  onPaginationChange,
  onTableChange,
  showPagination = true,
}: UMTableProps) => {
  const paginationConfig = showPagination
    ? {
        pageSize: pageSize,
        total: totalPages,
        pageSizeOptions: [5, 10, 20],
        showSizeChanger: showSizeChanger,
        onChange: onPaginationChange,
      }
    : false;

  return (
    <Table
      // style={{
      //   overflowX: 'auto',
      // }}
      loading={loading}
      // scroll={{ x: 1000 }}
      scroll={{ x: 'max-content' }}
      columns={columns}
      bordered
      rowClassName={(record, index) => {
        return index % 2 === 0 ? 'table-row-light' : 'table-row-dark';
      }}
      dataSource={dataSource}
      pagination={paginationConfig}
      onChange={onTableChange}
    />
  );
};

export default UMTable;
