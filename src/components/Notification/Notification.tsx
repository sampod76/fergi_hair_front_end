/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { BellOutlined, LoadingOutlined } from '@ant-design/icons';
import { Badge, Button, Dropdown, Flex, Spin, Typography } from 'antd';

import { useGetAllNotificationsQuery } from '@redux/features/admin/notificationApi';
import { selectCurrentUser } from '@redux/features/auth/authSlice';
import { useAppSelector } from '@redux/hooks';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import UserAvatarUI from '../ui/NavUI/UserAvatarUI';

const NotificationAndProfileCom = ({ role }: { role: string }) => {
  const user = useAppSelector(selectCurrentUser);
  const { data, isLoading } = useGetAllNotificationsQuery({
    role: role,
    limit: 5,
  });
  const notifications = data?.data || [];

  const notificationCount = data?.meta?.total;

  const notificationMenu = (
    <div
      className="flex w-full cursor-pointer flex-col gap-4 rounded-lg bg-[#edf0f6] p-4 text-center"
      // onClick={handleMenuClick}
    >
      <p className="text-2xl text-[#5681b6]">Notifications</p>
      <hr />
      {notifications.map((notification: any) => (
        <div className="test-start" key={notification?._id}>
          <div className="flex gap-3">
            <BellOutlined size={44} />
            <div className="flex flex-col items-start">
              <p className="truncate">{notification.subject}</p>
              <p className="text-[#5681b6]">
                {notification.createdAt &&
                  dayjs(notification.createdAt).format('YYYY-MM-DD HH:mm')}
              </p>
            </div>
          </div>
        </div>
      ))}
      <Link to={`/${user?.role}/notification`}>
        <Button className="mx-auto w-32 bg-[#5681b6] text-white">
          Load More
        </Button>
      </Link>
    </div>
  );
  return (
    <div className="flex items-center justify-center">
      <Typography.Title level={2} type="secondary">
        <Flex align="center" gap="12px">
          {isLoading ? (
            <Spin
              indicator={<LoadingOutlined style={{ width: '5px' }} spin />}
              size="small"
            />
          ) : (
            <Dropdown
              overlay={notificationMenu}
              trigger={['click']}
              placement="bottomRight"
            >
              <Badge
                size="small"
                style={{ backgroundColor: 'white', color: 'black' }}
                count={notificationCount}
              >
                <BellOutlined
                  shape="circle"
                  size={30}
                  className="cursor-pointer rounded-full bg-[#E6F0FF] p-3 text-black"
                />
              </Badge>
            </Dropdown>
          )}
          <UserAvatarUI />
        </Flex>
      </Typography.Title>
    </div>
  );
};
export default NotificationAndProfileCom;
