import ChangePassword from '@pages/ChangePassword';

import AdminDashboard from '../pages/admin/AdminDashboard';

import AboutUs from '@pages/admin/settings/AllTextField/AboutUs';

import CategorySerialNumberUpdate from '@components/Category/CategorySerialNumberUpdate';
import FileSerialNumberUpdate from '@components/FileUploder/FileSerialNumberUpdate';
import { ENUM_USER_ROLE } from '@local-types/userTypes';
import CategoryList from '@pages/admin/category/CategoryList';
import ProductCategoryList from '@pages/admin/category/ProductCategory';
import Earings from '@pages/admin/earning/Earings';
import AllNotification from '@pages/admin/notification/AllNotification';
import ShowOrder from '@pages/admin/order/ShowOrder';
import PrivacyPolicy from '@pages/admin/settings/AllTextField/PrivacyPolicy';
import TermsAndCondition from '@pages/admin/settings/AllTextField/Terms&Condition';

import UserDetails from '@pages/admin/User/UserDetails';

import Product from '@pages/admin/products/Products';
import Settings from '@pages/admin/settings/Settings';
import LoginHistory from '../pages/LoginHistory';
import Profile from '../pages/Profile';
export const adminPaths = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    iconName: 'MdDashboard',
    element: <AdminDashboard />,
  },
  //

  {
    name: 'Account Details',
    path: 'account-details',
    iconName: 'MdPeople',
    element: <CategoryList />,
  },
  {
    name: 'Manage Hair Identity',
    path: 'manage-hair-identity',
    iconName: 'GiHairStrands',
    element: <CategoryList />,
  },
  {
    name: 'Category',
    path: 'product-category',
    iconName: 'TbCategoryPlus',
    element: <ProductCategoryList />,
  },

  {
    name: 'Products',
    path: 'products',
    iconName: 'MdOutlineProductionQuantityLimits',
    element: <Product />,
  },
  {
    name: 'Hair Tips & Guidelines',
    path: 'hair-tips-guidelines',
    iconName: 'MdTipsAndUpdates',
    element: <CategoryList />,
  },

  {
    path: 'product-category-update',
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
    name: 'Settings',
    path: 'settings',
    iconName: 'CiSettings',
    element: <Settings />,
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
