import NotificationAndProfileCom from '@components/Notification/Notification';
import { toggleCollapse } from '@redux/features/globalSlice';
import { Layout, Tooltip } from 'antd';
import { GoSidebarCollapse } from 'react-icons/go';
import { Outlet } from 'react-router-dom';
import { selectCurrentUser } from '../../redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import Sidebar from './Sidebar';
const { Header, Content } = Layout;
const MainLayout = () => {
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  const handleCollapse = () => {
    dispatch(toggleCollapse({}));
  };

  return (
    <Layout className="mx-auto max-w-[1990px]" style={{ height: '100%' }}>
      <Sidebar />
      <Layout>
        <Header style={{ backgroundColor: 'var(--bgd)', height: '70px' }}>
          <div className="mt-2 flex h-full justify-between text-white">
            <div className="flex items-center justify-center gap-2">
              <Tooltip title="Sidebar Collapse">
                <GoSidebarCollapse
                  className="-ml-10 -mt-4 cursor-pointer text-2xl"
                  onClick={handleCollapse}
                />
              </Tooltip>

              <div className="-space-y-2">
                <h1 className="mb-0 flex h-1 items-center gap-2 pt-2 text-lg font-semibold capitalize">
                  Welcome,{user?.name?.firstName + ' ' + user?.name?.lastName}
                </h1>
                <p className="">Have a nice day</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4">
              <NotificationAndProfileCom role={user?.role!} />
            </div>
          </div>
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
