import { createBrowserRouter, Link } from 'react-router-dom';
import App from '../App';
import Login from '../pages/Login';
import Register from '../pages/Register';
import { routeGenerator } from '../utils/routesGenerator';
import { adminPaths } from './admin.routes';

import ProtectedRoute from '../components/layout/ProtectedRoute';
import ChangePassword from '../pages/ChangePassword';
import { vendorPaths } from './vendor.routes';

import ErrorBounderCom from '@components/ErrorComponents/ErrorBounderCom';
import OutLetLayout from '@components/layout/OutLetLayout';
import VerifyOtpForm from '@pages/VerifyOtpForm';
import { Button, Result } from 'antd';
import Dashboard from '../Dashboard';
import ForgotPassword from '../pages/ForgetPassword';
import ResetPassword from '../pages/ResetPassword';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ErrorBounderCom>
        <App />
      </ErrorBounderCom>
    ),
  },

  {
    path: '/admin',
    element: (
      <ProtectedRoute role="admin">
        <Dashboard />
      </ProtectedRoute>
    ),
    children: routeGenerator(adminPaths),
  },
  {
    path: '/vendor',
    element: (
      <ProtectedRoute role="vendor">
        <Dashboard />
      </ProtectedRoute>
    ),
    children: routeGenerator(vendorPaths),
  },

  {
    path: '/login',
    element: (
      <ErrorBounderCom>
        <Login />
      </ErrorBounderCom>
    ),
  },

  {
    path: '/change-password',
    element: (
      <ErrorBounderCom>
        <ChangePassword />
      </ErrorBounderCom>
    ),
  },
  {
    path: '/register',
    element: (
      <ErrorBounderCom>
        {' '}
        <Register />
      </ErrorBounderCom>
    ),
  },
  {
    path: '/forgot-password',
    element: (
      <ErrorBounderCom>
        {' '}
        <ForgotPassword />
      </ErrorBounderCom>
    ),
  },
  {
    path: '/verify-otp',
    element: (
      <ErrorBounderCom>
        <VerifyOtpForm />
      </ErrorBounderCom>
    ),
  },
  {
    path: '/password-reset',
    element: (
      <ErrorBounderCom>
        {' '}
        <ResetPassword />
      </ErrorBounderCom>
    ),
  },

  {
    path: '/admin/test',
    element: (
      <ProtectedRoute role="admin">
        <Dashboard />
      </ProtectedRoute>
    ),

    children: [
      {
        path: '', //auto dictator-> "/admin/test"
        element: <div className="text-center text-7xl">Test</div>,
      },
      {
        path: 'children1',
        element: <OutLetLayout />,
        // or
        /* 
    <> 
      <Outlet/>
    </>
    */
        children: [
          {
            path: '', //auto dictator->"/admin/test"/"children1"
            element: <div className="text-center text-7xl">children1</div>,
          },
          {
            path: 'children2',
            element: <OutLetLayout option={{ shoping: false }} />,
            children: [
              {
                path: '',
                element: <div className="text-center text-7xl">children2</div>,
              },
              {
                path: 'children3',
                element: <OutLetLayout />,
                children: [
                  {
                    path: '',
                    element: (
                      <div className="text-center text-7xl">children3</div>
                    ),
                  },
                  {
                    path: 'children4',
                    element: (
                      <div className="text-center text-7xl">children4</div>
                    ),
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: (
      <div className="text-center text-5xl">
        {' '}
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={
            <Button type="primary">
              <Link to="/">Back Home</Link>
            </Button>
          }
        />
      </div>
    ),
  },
]);

export default router;
