import { Button, Checkbox, Flex, Form, Input, Row } from 'antd';
import { FieldValues } from 'react-hook-form';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { AllImage } from '@assets/AllImge';
import CustomImageTag from '@components/ui/CustomTag/CustomImage';
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

  const onSubmit = async (data: FieldValues) => {
    // console.log(data);

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
    <div className="flex min-h-screen items-center justify-center !bg-authBg">
      <Row
        style={{
          borderRadius: '30px',
          background: '#f4dcec',
          // boxShadow: '20px 20px 60px #bebebe, -20px -20px 60px #ffffff',
        }}
        justify="center"
        align="middle"
        // style={{ height: "100vh" }}
        className="mx-auto max-w-lg px-10"
      >
        <div className="w-full px-8 py-5">
          <div className="!-mt-8">
            <CustomImageTag
              src={AllImage.logoAndName}
              width={1900}
              height={1900}
              className="mx-auto h-48 w-48"
            />
          </div>
          <Form
            name="normal_login"
            className="login-form !-mt-16"
            initialValues={{ remember: true }}
            onFinish={onSubmit}
          >
            {/* <Typography.Title level={5}>
              <span className="font-sans">{'Email'}</span>{' '}
            </Typography.Title> */}

            <h1 className="py-2 text-center text-2xl font-bold">Login</h1>
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please input your Email!' }]}
            >
              <Input
                size="large"
                className="h-16 !w-96"
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder={'Enter your email'}
              />
            </Form.Item>
            {/* <Typography.Title level={5}>{'Password'}</Typography.Title> */}
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your Password!' },
              ]}
            >
              <Input.Password
                size="large"
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder={'Enter your password'}
                className="h-16 !w-96"
              />
            </Form.Item>
            <Form.Item>
              <Flex justify="space-between">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>
                    <span className="font-sans font-semibold text-buttonBg">
                      {'Remember me'}
                    </span>
                  </Checkbox>
                </Form.Item>

                <Link className="login-form-forgot" to={`/forgot-password`}>
                  <span className="font-sans font-semibold text-buttonBg">
                    {'Forgot password'}
                  </span>
                </Link>
              </Flex>
            </Form.Item>

            <Form.Item>
              <Button
                loading={isLoading}
                type="default"
                htmlType="submit"
                className="inputSize w-full !bg-buttonBg !text-lg !text-buttonTextColor"
              >
                {'Login'}
              </Button>

              <p className="text-center text-red-500">{error}</p>
            </Form.Item>
          </Form>
        </div>
      </Row>
    </div>
  );
};

export default Login;
