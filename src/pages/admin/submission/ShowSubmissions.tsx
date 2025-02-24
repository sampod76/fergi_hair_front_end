import CustomImageTag from '@components/ui/CustomTag/CustomImage';
import LoadingSkeleton from '@components/ui/Loading/LoadingSkeleton';
import PDFViewer from '@components/ui/PdfViewer';
import { IFileAfterUpload } from '@local-types/globalType';
import { useGetAllSubmissionsQuery } from '@redux/features/admin/submissionApi';
import { selectCurrentUser } from '@redux/features/auth/authSlice';
import { useAppSelector } from '@redux/hooks';

import fileObjectToLink from '@utils/fileObjectToLink';
import { LinkToGetExtensions } from '@utils/LinkToGetExtensions';
import { Collapse, DatePicker, Empty, Pagination, PaginationProps } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useLocation, useParams } from 'react-router-dom';
// Destructure Panel from Collapse
const { Panel } = Collapse;
export default function ShowSubmissions() {
  const user = useAppSelector(selectCurrentUser);
  console.log('🚀 ~ ShowSubmissions ~ user:', user);
  //
  const { userId } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const getCategory = queryParams.get('category');
  const getCategoryName = queryParams.get('categoryName');
  //
  const [dates, setDates] = useState<{
    startDate: string;
    endDate: string;
  }>({ startDate: '', endDate: '' });
  //
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [sortOrder, setSortOrder] = useState<string>('desc');
  const [searchTerm, setSearchTerm] = useState<string>('');
  query['limit'] = size;
  query['page'] = page;
  query['sortBy'] = sortBy;
  query['sortOrder'] = sortOrder;
  if (user?.role === 'admin') {
    query['companyOwner.roleBaseUserId'] = userId; //roleBaseUserid
  } else {
    query['authorRoleBaseId'] = userId; // userId
  }
  query['categoryId'] = getCategory;
  query['createdAtFrom'] = dates.startDate;
  query['createdAtTo'] = dates.endDate;

  // console.log(query);
  const { data, isLoading } = useGetAllSubmissionsQuery(query, {
    skip: !Boolean(getCategory),
  });

  useEffect(() => {
    if (!getCategory) {
      history.back();
    }
  }, [getCategory]);

  if (isLoading) {
    return <LoadingSkeleton sectionNumber={5} />;
  }
  const summationData = data?.data || [];
  console.log('🚀 ~ ShowSubmissions ~ summationData:', summationData);

  // if (!summationData.length) {
  //   return (
  //     <div className="text-center">
  //     </div>
  //   );
  // }

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (
    current,
    pageSize
  ) => {
    setPage(current);
    setSize(pageSize);
  };

  const onChange: PaginationProps['onChange'] = (page) => {
    setSize(page);
  };

  //

  //------------date change------------
  const disabledDates = [
    dayjs('2024-11-01'),
    dayjs('2024-11-05'),
    dayjs('2024-11-10'),
    // Add more dates as needed
  ];
  const disableStartDate = dayjs('2024-11-01');
  const disableEndDate = dayjs('2024-11-09');
  // Define the type for the function parameter
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
  //------------date change end------------
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1
          onClick={() => history.back()}
          className="mb-3 flex items-center gap-2 text-lg font-bold lg:text-2xl"
        >
          <FaArrowLeft className="mt-1" /> {getCategoryName}
        </h1>
        <DatePicker.RangePicker
          style={{
            fontSize: '25px',
            marginBottom: '15px',
            fontWeight: 'normal',
            marginTop: '40px',
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
          showTime
          //  format="YYYY/MM/DD HH:mm:ss"
          size="large"
          onChange={onChangeDatePicker}
        />
      </div>
      {summationData.length ? (
        <Collapse>
          {
            summationData.map((item: any, index) => (
              <Panel
                header={`${item.categoryName} ${new Date(item.createdAt).toLocaleDateString()}`}
                key={index}
              >
                <div className="gap-3">
                  <div className="flex flex-col items-center justify-between">
                    <div className="my-2">
                      {item?.truckNumber && (
                        <p className="whitespace-nowrap">
                          Truck Number: {item.truckNumber}
                        </p>
                      )}

                      {item?.trailerNumber && (
                        <p className="whitespace-nowrap">
                          Trailer Number: {item.trailerNumber}
                        </p>
                      )}

                      {item?.manifestNumber && (
                        <p className="whitespace-nowrap">
                          Manifest Number: {item.manifestNumber}
                        </p>
                      )}

                      {item?.uploadedDate && (
                        <p className="whitespace-nowrap">
                          Uploaded Date:{' '}
                          {new Date(item.uploadedDate).toLocaleDateString()}
                        </p>
                      )}

                      {item?.dateOfLoading && (
                        <p className="whitespace-nowrap">
                          Date Of Loading:{' '}
                          {new Date(item.dateOfLoading).toLocaleDateString()}
                        </p>
                      )}

                      {item?.address?.area && (
                        <p className="whitespace-nowrap">
                          Address: {item.address.area}
                        </p>
                      )}
                      {item?.description && (
                        // <Input.TextArea>{item.description}</Input.TextArea>
                        <p>{item.description}</p>
                      )}
                    </div>
                    <div>
                      {item?.videos?.length > 0 && (
                        <video controls>
                          <source
                            src={fileObjectToLink(item.videos[0])}
                            type="video/mp4"
                          />
                          Your browser does not support the video tag.
                        </video>
                      )}
                    </div>
                  </div>
                  <div className="w-full">
                    {item.files.map((file: IFileAfterUpload, index: number) => {
                      const application = LinkToGetExtensions(
                        fileObjectToLink(file),
                        ['.doc', '.docx']
                      );
                      return (
                        <div className="my-3 border">
                          <h2 className="my-3 text-center text-lg font-bold">
                            <span className="rounded-lg p-3">
                              File {index + 1}
                            </span>
                          </h2>
                          <hr />
                          {file.mimetype.includes('image') && (
                            <CustomImageTag
                              src={fileObjectToLink(file)}
                              width={500}
                              height={500}
                              className="h-96 w-96"
                            />
                          )}
                          {file.mimetype.includes('pdf') && (
                            <PDFViewer file={fileObjectToLink(file)} />
                          )}
                          {application?.type === 'document' && (
                            <iframe
                              src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileObjectToLink(file))}`}
                              width="100%"
                              height="900px"
                              style={{ border: 'none' }}
                              title={file?.filename}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Panel>
            ))

            // Empty state for no submissions found
          }
        </Collapse>
      ) : (
        <Empty />
      )}
      <div className="mt-4">
        <Pagination
          showSizeChanger
          showQuickJumper
          current={page}
          onChange={onChange}
          onShowSizeChange={onShowSizeChange}
          defaultCurrent={1}
          total={data?.meta?.total}
          align="end"
        />
      </div>
    </div>
  );
}
