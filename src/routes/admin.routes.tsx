import ChangePassword from '@pages/ChangePassword';

import AdminDashboard from '../pages/admin/AdminDashboard';

import AboutUs from '@pages/admin/settings/AllTextField/AboutUs';

import CategorySerialNumberUpdate from '@components/Category/CategorySerialNumberUpdate';
import FileSerialNumberUpdate from '@components/FileUploder/FileSerialNumberUpdate';
import { ENUM_USER_ROLE } from '@local-types/userTypes';
import AdvertisementList from '@pages/admin/advertisement/AdvertisementList';
import CategoryList from '@pages/admin/category/CategoryList';
import Earings from '@pages/admin/earning/Earings';
import FormAndVideoEarning from '@pages/admin/earning/FormAndVideoEarning';
import AllNotification from '@pages/admin/notification/AllNotification';
import ShowOrder from '@pages/admin/order/ShowOrder';
import PrivacyPolicy from '@pages/admin/settings/AllTextField/PrivacyPolicy';
import TermsAndCondition from '@pages/admin/settings/AllTextField/Terms&Condition';
import Settings from '@pages/admin/settings/Settings';
import ShowSubmissions from '@pages/admin/submission/ShowSubmissions';
import Subscriptions from '@pages/admin/subscriptions/SubscriptionsPage';
import UserDetails from '@pages/admin/User/UserDetails';
import VendorList from '@pages/admin/vendorList/vendorList';
import VideosUpload from '@pages/admin/videoAndFormList/VideoAndFormUploadList';
import LoginHistory from '../pages/LoginHistory';
import Profile from '../pages/Profile';
export const adminPaths = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    iconName: 'MdDashboard',
    element: <AdminDashboard />,
  },
  {
    name: 'Category',
    path: 'category',
    iconName: 'TbCategoryPlus ',
    element: <CategoryList />,
  },
  {
    path: 'category-update/:companyType',
    element: <CategorySerialNumberUpdate />,
  },
  {
    path: 'file-serial-update/:fileType',
    element: <FileSerialNumberUpdate />,
  },
  {
    name: 'Earnings',
    // path: 'earnings',
    iconName: 'FaCreditCard',
    // element: <Company companyType={'companyOne'} />,
    children: [
      {
        name: 'Content',
        path: 'Content',
        iconName: 'TbPointFilled',
        element: <Earings earnType="file" />,
      },
      {
        name: 'Subscriptions',
        path: 'SubscriptionsEarning',
        iconName: 'TbPointFilled',
        element: <Earings earnType="package" />,
      },
    ],
  },
  {
    name: 'Advertisement',
    path: 'Advertisement',
    iconName: 'MdAddCard',
    element: <AdvertisementList />,
  },
  {
    name: 'Videos',
    // path: 'Videos-Upload',
    iconName: 'MdOndemandVideo',

    children: [
      {
        name: 'Videos Upload',
        path: 'Videos-Upload',
        iconName: 'TbPointFilled',
        element: <VideosUpload uploadType="video" />,
      },
      {
        name: 'Videos Earns',
        path: 'Videos-Earns',
        iconName: 'TbPointFilled',
        element: <FormAndVideoEarning fileType={'video'} />,
      },
    ],
  },
  {
    name: 'Forms Upload',
    // path: 'Forms-Upload',
    iconName: 'FaWpforms',
    children: [
      {
        name: 'Forms Upload',
        path: 'Forms-Upload',
        iconName: 'TbPointFilled',
        element: <VideosUpload uploadType="doc" />,
      },
      {
        name: 'Forms Earns',
        path: 'Forms-Earns',
        iconName: 'TbPointFilled',
        element: <FormAndVideoEarning fileType={'doc'} />,
      },
    ],
  },
  {
    name: 'Subscriptions',
    path: 'Subscriptions',
    iconName: 'RiFlowerFill',
    element: <Subscriptions />,
  },
  //
  {
    name: 'Users',
    path: 'Users',
    iconName: 'MdPeople',
    element: <VendorList companyType={'companyOne'} />,
  },

  {
    name: 'Settings',
    path: 'settings',
    iconName: 'CiSettings',
    element: <Settings />,
  },
  {
    path: 'show-user-submissions/:userId',
    element: <ShowSubmissions />,
  },
  {
    path: 'user-details/:userRoleBaseId',
    element: <UserDetails />,
  },
  {
    path: 'show-packages/:userId',
    element: <ShowOrder />,
  },
  {
    path: 'profile',
    element: <Profile />,
  },
  {
    // name: 'Login history',
    path: 'login-history',
    element: <LoginHistory />,
  },
  {
    // name: 'Login history',
    path: 'notification',
    element: <AllNotification role={ENUM_USER_ROLE.admin} />,
  },
  {
    path: 'change-password',
    element: <ChangePassword />,
  },
  {
    path: 'profile-update',
    element: <Profile />,
  },
  {
    path: 'terms-conditions',
    element: <TermsAndCondition />,
  },
  {
    path: 'privacy-policy',
    element: <PrivacyPolicy />,
  },
  {
    path: 'about-us',
    element: <AboutUs />,
  },

  // {
  //   name: 'Leave management',
  //   children: [
  //     {
  //       name: 'Leave request',
  //       path: 'request-leave-list',
  //       element: <LeaveList status={'pending'} />,
  //     },
  //     {
  //       name: 'Leave List',
  //       path: 'leave-list',
  //       element: <LeaveList />,
  //     },
  //   ],
  // },
];

// export const adminSidebarItems = adminPaths.reduce(
//   (acc: TSidebarItem[], item) => {
//     if (item.path && item.name) {
//       acc.push({
//         key: item.name,
//         label: <NavLink to={`/admin/${item.path}`}>{item.name}</NavLink>,
//       });
//     }

//     if (item.children) {
//       acc.push({
//         key: item.name,
//         label: item.name,
//         children: item.children.map((child) => ({
//           key: child.name,
//           label: <NavLink to={`/admin/${child.path}`}>{child.name}</NavLink>,
//         })),
//       });
//     }

//     return acc;
//   },
//   []
// );

//* Programatical way

// export const adminRoutes = adminPaths.reduce((acc: TRoute[], item) => {
//   if (item.path && item.element) {
//     acc.push({
//       path: item.path,
//       element: item.element,
//     });
//   }

//   if (item.children) {
//     item.children.forEach((child) => {
//       acc.push({
//         path: child.path,
//         element: child.element,
//       });
//     });
//   }

//   return acc;
// }, []);

//! Hard coded way

// export const adminPaths = [
//   {
//     path: 'dashboard',
//     element: <AdminDashboard />,
//   },
//   {
//     path: 'create-student',
//     element: <CreateStudent />,
//   },
//   {
//     path: 'create-admin',
//     element: <CreateAdmin />,
//   },
//   {
//     path: 'create-faculty',
//     element: <CreateFaculty />,
//   },
// ];
