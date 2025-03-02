import { Drawer, Layout, Menu } from 'antd';
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

import { toggleCollapse } from '@redux/features/globalSlice';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
const { Sider } = Layout;

const userRole = {
  ADMIN: 'admin',
  vendor: 'vendor',
};

const Sidebar = () => {
  const token = useAppSelector(useCurrentToken);
  const currentUser = useAppSelector(selectCurrentUser);
  const togoSidebar = useAppSelector((state) => state.global.collapse);
  const screens = useBreakpoint();
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

  return (
    <>
      {!screens.sm && togoSidebar ? (
        <>
          <Drawer
            placement="left"
            closable
            onClose={handleCollapse}
            open={togoSidebar}
            width={240}
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
                    className="mx-auto my-3 w-[80%] px-8"
                  />
                </Link>
              </div>
              <Menu
                theme="dark"
                mode="inline"
                className="!lg:px-1 !bg-transparent !text-black"
                //@ts-ignore
                items={sidebarItems}
                onClick={handleCollapse} // Close drawer on menu item click
              />
            </div>
          </Drawer>
        </>
      ) : (
        <Sider
          breakpoint="lg"
          collapsed={togoSidebar || !screens.sm}
          width={300}
          // width={335}
          className="!bg-bgd !text-black"
          style={{ height: '100vh', position: 'sticky', top: '0', left: '0' }}
        >
          <div className="!text-black">
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
                  className="mx-auto my-3 w-[80%] px-8"
                />
              </Link>
            </div>
            <Menu
              theme="dark"
              mode="inline"
              className="!lg:px-3 !bg-transparent !px-5 !text-black"
              //@ts-ignore
              items={sidebarItems}
            />
          </div>
        </Sider>
      )}
    </>
  );
};

export default Sidebar;
