import { Button, Form, Input } from 'antd';

import { AllImage } from '@assets/AllImge';
import { ENUM_USER_ROLE } from '@local-types/userTypes';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../redux/features/auth/authApi';
import {
  TUser,
  logout,
  selectCurrentUser,
  setUser,
} from '../redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setToLocalStorage } from '../utils/local-storage';
import { ErrorModal } from '../utils/modalHook';
import { verifyToken } from '../utils/verifyToken';
// import styled from 'styled-components';
// // Create a styled component for the Ant Design checkbox
// const StyledCheckbox = styled(Checkbox)`
//   .ant-checkbox-checked .ant-checkbox-inner {
//     background-color: #7f1d1d;
//     border-color: #7f1d1d;
//   }
//   .ant-checkbox:hover .ant-checkbox-inner,
//   .ant-checkbox-input:focus + .ant-checkbox-inner {
//     border-color: #7f1d1d;
//   }
//   .ant-checkbox:hover .ant-checkbox-inner {
//     border-color: #7f1d1d;
//   }
// `;

const Login = () => {
  const user = useAppSelector(selectCurrentUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [error, setError] = useState('');
  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (data: any) => {
    console.log(data);

    try {
      const res = await login({ ...data }).unwrap();
      const user = verifyToken(res.accessToken) as TUser;
      if (
        user.role !== ENUM_USER_ROLE.admin &&
        res?.userData?.role !== ENUM_USER_ROLE.vendor
      ) {
        dispatch(logout());
        ErrorModal('Unauthorized');
        navigate(`/login`);
        return;
      }
      dispatch(
        setUser({
          user: user,
          userData: res.userData,
          token: res.accessToken,
        })
      );
      setToLocalStorage('token', res.accessToken);
      navigate(`/${user.role}/dashboard`);
      setError('');
    } catch (err: any) {
      console.log('🚀 ~ onSubmit ~ err:', err);
      setError(err?.message);
      ErrorModal(err);
    }
  };

  useEffect(() => {
    if (user?.userId) {
      // navigate(`/${user.role}/dashboard`);
      navigate(`/`);
    }
  }, [user?.userId]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Side Image */}
      <div className="hidden w-1/2 md:block">
        <img
          src="https://images.unsplash.com/photo-1726387871055-35c2c98357f9?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Side Banner"
          className="h-full w-[90%]"
        />
      </div>

      {/* Login Form */}
      <div className="flex w-full flex-col items-center justify-center rounded-lg px-8 py-10 md:w-1/2">
        <div className="flex w-full flex-col items-center justify-center rounded-2xl border-8 p-5 shadow-2xl">
          {/* Logo */}
          <div className="mb-6 text-center">
            <img
              src={AllImage.logoAndName}
              alt="Fall In Logo"
              className="mx-auto h-20 w-auto"
            />
          </div>

          {/* Title */}
          <h1 className="mb-6 text-center text-2xl font-semibold text-gray-800">
            Login to Fall In
          </h1>

          {/* Form */}
          <Form
            name="login_form"
            // initialValues={{ remember: true }}
            onFinish={onSubmit}
            className="w-full max-w-sm"
            layout="vertical"
          >
            {/* Email Input */}
            <Form.Item
              name="email"
              label="Email or Username"
              rules={[{ required: true, message: 'Please input your Email!' }]}
            >
              <Input placeholder="Enter your email or username" />
            </Form.Item>

            {/* Password Input */}
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your Password!' },
              ]}
              label="Password"
            >
              <Input.Password
                size="large"
                placeholder="Enter your password"
                className="h-12 rounded-md border-gray-300 focus:ring focus:ring-blue-200"
              />
            </Form.Item>

            {/* Forgot Password */}
            <div className="mb-4 text-left underline">
              <Link
                to="/forgot-password"
                className="text-sm !text-gray-800 hover:underline"
              >
                Forgot Password
              </Link>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-center">
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="mx-auto block h-10 w-36 rounded-md !bg-black text-sm text-white hover:bg-gray-900 focus:ring focus:ring-gray-400"
                  loading={isLoading}
                >
                  Login
                </Button>
              </Form.Item>
            </div>

            {/* Additional Text */}
            <p className="mt-4 text-center text-sm text-black">
              Forgot your password?{' '}
              <Link
                to="/forgot-password"
                className="font-medium !text-black !underline"
              >
                Forgot Password
              </Link>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
