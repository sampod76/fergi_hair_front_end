import { EyeOutlined, ReloadOutlined } from '@ant-design/icons';
import VideoAddFormModal from '@components/FileAllCom/VideoAddFormModal';
import ModalComponent from '@components/Modal/ModalComponents';
import CustomImageTag from '@components/ui/CustomTag/CustomImage';
import LoadingSkeleton from '@components/ui/Loading/LoadingSkeleton';
import {
  useDeleteFileUploadMutation,
  useGetAllFileUploadQuery,
} from '@redux/features/admin/fileUpload';
import { selectCurrentUser } from '@redux/features/auth/authSlice';
import { useAppSelector, useDebounced } from '@redux/hooks';
import { ConfirmModal, ErrorModal, SuccessModal } from '@utils/modalHook';
import {
  Button,
  Input,
  message,
  Pagination,
  PaginationProps,
  Select,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { MdContentCopy } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

interface file {
  _id: string;
  id: number;
  title: string;
  price: number;
  coverImage: string;
  fileType: 'video' | 'doc';
}

interface FileCardProps {
  file: file;
}

const VideoAndFormUploadList: React.FC<{ uploadType: 'video' | 'doc' }> = ({
  uploadType,
}) => {
  const navigate = useNavigate();
  const user = useAppSelector(selectCurrentUser);
  const getCurrentPage = new URLSearchParams(window.location.search).get(
    'page'
  );
  const getLimit = new URLSearchParams(window.location.search).get('limit');
  const [page, setPage] = useState(getCurrentPage ? Number(getCurrentPage) : 1);
  const [limit, setLimit] = useState(getLimit ? Number(getLimit) : 12);
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [sortOrder, setSortOrder] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const query: any = {};
  query['limit'] = limit;
  query['page'] = page;
  query['sortBy'] = sortBy;
  query['sortOrder'] = sortOrder;
  query['fileType'] = uploadType;
  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (debouncedSearchTerm) {
    query['searchTerm'] = debouncedSearchTerm;
  }

  const { data, isLoading } = useGetAllFileUploadQuery(query);
  const [deleteFile, { isLoading: dloading }] = useDeleteFileUploadMutation();
  const fileData = data?.data || [];
  const meta = data?.meta;
  useEffect(() => {
    //first time user got this page then auto set the limit and page size in url
    const newUrl = `${window.location.pathname}?page=${page}&limit=${Number(limit) > 100 ? 100 : limit}`;
    window.history.replaceState(null, '', newUrl);
  }, [page, limit]);
  if (isLoading) {
    return <LoadingSkeleton />;
  }
  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (
    current,
    pageSize
  ) => {
    setPage(current);
    setLimit(pageSize);
  };

  const onChange: PaginationProps['onChange'] = (page) => {
    setPage(page);
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
            const res = await deleteFile(id).unwrap();
            SuccessModal('Successfully Deleted');
          } catch (error: any) {
            ErrorModal(error.message);
          }
        }
      }
    );
  };
  const FileCard: React.FC<FileCardProps> = ({ file }) => {
    return (
      <div className="overflow-hidden rounded-lg bg-white text-bgd shadow-md">
        <div className="flex h-48 w-full items-center justify-center overflow-hidden bg-gray-200">
          {/* <img
            src={file.coverImage}
            alt={file.title}
            className="h-36 w-36 object-cover"
          /> */}
          <CustomImageTag
            src={file.coverImage}
            alt={file.title}
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h2
            onClick={() => {
              navigator.clipboard.writeText(file.title);
              message.success('Copy Success:- ' + file.title);
            }}
            className="line-clamp-2 cursor-pointer text-lg font-semibold"
          >
            {file.title}
          </h2>
          <div className="flex items-center justify-between">
            <p
              onClick={() => {
                navigator.clipboard.writeText(file._id);
                message.success('Copy Success:- ' + file._id);
              }}
              className="flex cursor-pointer items-center gap-1"
            >
              <span className="text-base">Copy Id</span> <MdContentCopy />
            </p>
            <div className="flex items-center justify-center gap-1">
              <p className="">Price</p>
              <p className="text-lg font-bold">${file.price}</p>
            </div>
          </div>
          <div>
            <div className="mt-4 flex items-center justify-between">
              <ModalComponent
                width={750}
                button={
                  <button className="mr-2 w-20 rounded-md bg-bgd2 px-3 py-1">
                    Edit
                  </button>
                }
              >
                <VideoAddFormModal
                  uploadType={file.fileType}
                  initialValues={file}
                />
              </ModalComponent>
              <ModalComponent
                width={750}
                button={
                  <button className="mr-2 w-20 rounded-md bg-sky-200 px-3 py-1 text-black">
                    <EyeOutlined /> View
                  </button>
                }
              >
                <VideoAddFormModal
                  uploadType={file.fileType}
                  initialValues={file}
                  readOnly={true}
                />
              </ModalComponent>
              <Button
                onClick={() => handleDelete(file._id)}
                className="w-20 rounded-md !bg-bgd px-3 py-1 !text-white"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const handleSelectChange = (value: string) => {
    // Navigate based on the selected value
    navigate(`/${user?.role}/file-serial-update/${value}`);
  };
  // const data = uploadType === 'video' ? videos : formdata;
  return (
    <div className="container mx-auto p-4">
      {/* Header Section */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold capitalize">
            {uploadType} Upload
          </h1>
          <ModalComponent
            button={
              <p className="mx-2 cursor-pointer rounded-sm border bg-slate-400 px-3 text-lg font-bold text-white">
                Update Contain Serial Number
              </p>
            }
            width={400}
          >
            <div className="mx-2">
              <Select
                placeholder="Select Contain Serial Number"
                allowClear
                size="large"
                onChange={handleSelectChange} // Handle navigation on selection
              >
                <Select.Option value="doc">Form/doc</Select.Option>
                <Select.Option value="video">Video</Select.Option>
              </Select>
            </div>
          </ModalComponent>
        </div>

        <div className="flex items-center gap-2">
          <ModalComponent
            width={750}
            button={
              <button className="rounded-md bg-bgd px-4 py-2 text-white">
                + Add <span className="capitalize">{uploadType}</span>
              </button>
            }
          >
            <VideoAddFormModal uploadType={uploadType} />
          </ModalComponent>
          <div>
            <Input
              size="large"
              placeholder="Search"
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '250px',
              }}
              value={searchTerm}
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
          </div>
        </div>
      </div>

      {/* Video Cards Grid */}
      <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-3 xl:gap-3 2xl:grid-cols-4">
        {fileData.map((file: any) => (
          <FileCard key={file._id} file={file} />
        ))}
      </div>
      <div className="mt-10 flex items-end justify-end text-2xl">
        <Pagination
          showSizeChanger
          current={page}
          onChange={onChange}
          showQuickJumper
          onShowSizeChange={onShowSizeChange}
          defaultCurrent={1}
          defaultPageSize={12} // Explicitly set defaultPageSize
          total={meta?.total}
          pageSizeOptions={[12, 24, 36]}
        />
      </div>
    </div>
  );
};

export default VideoAndFormUploadList;
