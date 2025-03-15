import ChangePassword from '@pages/ChangePassword';

import GeneralUser from '@pages/admin/generalUser/generalUser';
import AllNotification from '@pages/admin/notification/AllNotification';
import Settings from '@pages/admin/settings/Settings';

import UserDetails from '@pages/admin/User/UserDetails';

import LoginHistory from '../pages/LoginHistory';
import Profile from '../pages/Profile';

export const vendorPaths = [
  {
    name: 'Company Documents User',
    path: 'company-documents-user',
    iconName: 'MdPeople',
    element: <GeneralUser roleType={'companyDocumentSubmit'} />,
  },
  {
    name: 'Driver Documents User',
    path: 'driver-documents-user',
    iconName: 'MdPeople',
    element: <GeneralUser roleType={'driverDocumentSubmit'} />,
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
    element: <AllNotification />,
  },
  {
    path: 'change-password',
    element: <ChangePassword />,
  },
  {
    path: 'profile-update',
    element: <Profile />,
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
