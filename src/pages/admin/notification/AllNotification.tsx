import LoadingSkeleton from '@components/ui/Loading/LoadingSkeleton';
import { useGetAllNotificationsQuery } from '@redux/features/admin/notificationApi';
import { selectCurrentUser } from '@redux/features/auth/authSlice';
import { useAppSelector } from '@redux/hooks';
import { Pagination, PaginationProps } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { IoMdNotifications } from 'react-icons/io';
export default function AllNotification({ role }: { role?: string }) {
  const user = useAppSelector(selectCurrentUser);
  const [current, setCurrent] = useState(1);
  const [pageCount, setPageCount] = useState(10);

  const query: Record<string, any> = {};
  query['limit'] = pageCount;
  query['page'] = current;
  query['role'] = role;
  if (!role) {
    query['userId'] = user?.userId;
  }
  const { data, isLoading } = useGetAllNotificationsQuery(query);
  const notifications = data?.data || [];
  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (
    current,
    pageSize
  ) => {
    setCurrent(current);
    setPageCount(pageSize);
  };

  const onChange: PaginationProps['onChange'] = (page) => {
    setCurrent(page);
  };
  if (isLoading) {
    return <LoadingSkeleton sectionNumber={5} />;
  }

  return (
    <div>
      <div className="mx-auto p-5">
        <div className="rounded-lg bg-bgd2 p-4 shadow">
          <h2 className="text-bg-bgd mb-4 text-xl font-semibold">
            Notification
          </h2>

          <div className="divide-y divide-gray-300">
            {notifications.map((notification: any) => (
              <div
                key={notification._id}
                className="flex items-start py-3 text-black"
              >
                <div className="mr-4">
                  <IoMdNotifications className="h-6 w-6 text-bgd" />
                </div>
                <div>
                  <p className="text-gray-800">
                    Subject: {notification.subject}
                  </p>
                  <p className="text-gray-800">
                    Message: {notification.bodyText}
                  </p>
                  <p className="text-sm text-gray-500">
                    {notification.createdAt &&
                      dayjs(notification.createdAt).format('YYYY-MM-DD HH:mm')}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-4">
            <Pagination
              showSizeChanger
              showQuickJumper
              current={current}
              onChange={onChange}
              onShowSizeChange={onShowSizeChange}
              defaultCurrent={1}
              total={data?.meta?.total}
              align="end"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
