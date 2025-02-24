import { Drawer, Image, Layout, Menu } from 'antd';
import { adminPaths } from '../../routes/admin.routes';
import { sidebarItemsGenerator } from '../../utils/sidebarItemsGenerator';

import { AllImage } from '@assets/AllImge';
import CustomImageTag from '@components/ui/CustomTag/CustomImage';
import { Link } from 'react-router-dom';
import {
  TUser,
  selectCurrentUser,
  useCurrentToken,
} from '../../redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { vendorPaths } from '../../routes/vendor.routes';
import { verifyToken } from '../../utils/verifyToken';

import { ENUM_USER_ROLE } from '@local-types/userTypes';
import { toggleCollapse } from '@redux/features/globalSlice';
import { useEffect, useState } from 'react';

const { Sider } = Layout;

const userRole = {
  ADMIN: 'admin',
  vendor: 'vendor',
};

const Sidebar = () => {
  const token = useAppSelector(useCurrentToken);
  const currentUser = useAppSelector(selectCurrentUser);
  const togoSidebar = useAppSelector((state) => state.global.collapse);

  const [isMobile, setIsMobile] = useState(false);
  // console.log('🚀 ~ Sidebar ~ isMobile:', isMobile);
  const dispatch = useAppDispatch();

  const handleCollapse = () => {
    dispatch(toggleCollapse({}));
  };
  let user;

  if (token) {
    user = verifyToken(token);
  }

  let sidebarItems;

  switch ((user as TUser)?.role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
      break;
    case userRole.vendor:
      sidebarItems = sidebarItemsGenerator(vendorPaths, userRole.vendor);
      break;
    default:
      break;
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {isMobile && togoSidebar ? (
        <>
          <Drawer
            placement="left"
            closable
            onClose={handleCollapse}
            open={togoSidebar}
            width={currentUser?.role === ENUM_USER_ROLE.admin ? 240 : 450}
            className="!bg-bgd"
          >
            <div className="!-ml-5 !text-black">
              <div
                style={{
                  color: 'black',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Link
                  to={`/${currentUser?.role}/dashboard`}
                  onClick={handleCollapse}
                >
                  <CustomImageTag
                    src={AllImage.logoWhite}
                    width={1900}
                    height={1900}
                    className="mx-auto my-3 w-[100%] px-8"
                  />
                  <Image />
                </Link>
              </div>
              <Menu
                theme="dark"
                mode="inline"
                className="!lg:px-3 sidebar-menu !bg-transparent !px-5"
                //@ts-ignore
                items={sidebarItems}
                style={{ color: 'gray' }} // Ensures gray text
                onClick={handleCollapse} // Close drawer on menu item click
              />
            </div>
          </Drawer>
        </>
      ) : (
        <Sider
          breakpoint="lg"
          collapsed={togoSidebar || isMobile}
          width={currentUser?.role === ENUM_USER_ROLE.admin ? 300 : 335}
          // width={335}
          className="!bg-bgd !text-black"
          style={{ height: '100vh', position: 'sticky', top: '0', left: '0' }}
        >
          <div className="mt-16 !text-black">
            <div
              style={{
                color: 'black',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Link to={`/${currentUser?.role}/dashboard`} className="">
                <CustomImageTag
                  src={AllImage.logoWhite}
                  width={1900}
                  height={1900}
                  className="mx-auto my-3 w-64 px-8"
                />
              </Link>
            </div>
            <Menu
              theme="dark"
              mode="inline"
              className="!lg:px-3 sidebar-menu !bg-transparent !px-5"
              //@ts-ignore
              items={sidebarItems}
              style={{ color: 'gray' }} // Ensures gray text
            />
          </div>
        </Sider>
      )}
    </>
  );
};

export default Sidebar;
