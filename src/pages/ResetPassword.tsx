import { LockOutlined } from '@ant-design/icons';
import { Button, Form, Input, Row, Typography } from 'antd';

import { AllImage } from '@assets/AllImge';
import CustomImageTag from '@components/ui/CustomTag/CustomImage';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { removeFromLocalStorage } from '../utils/local-storage';
import { ErrorModal, SuccessModal } from '../utils/modalHook';
import { verifyToken } from '../utils/verifyToken';

import {
  useLoginMutation,
  useTokenToSetPasswordMutation,
} from '@redux/features/auth/authApi';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
export default function ResetPassword() {
  //
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const token = query.get('token');
  //
  const [setPassword, { isLoading }] = useTokenToSetPasswordMutation();
  const [login, { isLoading: loginLoading }] = useLoginMutation();
  useEffect(() => {
    if (!token) {
      ErrorModal('Unable to reset password');
      navigate(`/`);
    }
  }, [token]);

  const onFinish = async (values: any) => {
    try {
      const value = verifyToken(token as string) as any;
      console.log('🚀 ~ onFinish ~ value:', value);
      const res = await setPassword({
        resetPasswordToken: token,
        newPassword: values?.password,
      }).unwrap();

      SuccessModal('Successfully change your password');
      removeFromLocalStorage('resetToken');
      // navigate(`/login`);
      await login({ email: value?.email, password: values?.password });
      navigate(`/`);
    } catch (error) {
      console.log(error);
      ErrorModal(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-bgd">
      <Row
        style={{ borderRadius: '30px', background: 'white' }}
        justify="center"
        align="middle"
        className="mx-auto h-fit w-fit max-w-md"
      >
        <div className="flex flex-col items-center justify-center px-8 py-5">
          <div className="py-6">
            <CustomImageTag
              src={AllImage.logoAndName}
              width={1900}
              height={1900}
              className="mx-auto h-40 w-40"
            />
          </div>
          <div className="flex flex-col items-center justify-center px-8 py-5">
            <div className="mb-6 flex flex-col items-center justify-center">
              <div className="flex items-center justify-center gap-2 font-sans text-lg font-bold">
                <Link className="text-black" to={'/Login'}>
                  <FaArrowLeft
                    className="text-black"
                    style={{ fontSize: '15px' }}
                  />
                </Link>
                {'Login'}
              </div>
              <p className="my-3 text-center font-sans">
                {'Please enter the OTP we have sent you in your email'}.
              </p>
            </div>

            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Typography.Title level={5} className="font-sans">
                New Password
              </Typography.Title>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: 'Please input your Password!' },
                ]}
                hasFeedback={true}
              >
                <Input.Password
                  size="large"
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder={'Enter your new password'}
                  className="inputSize !w-72"
                />
              </Form.Item>
              <Typography.Title level={5}>
                {'Re-enter Password'}
              </Typography.Title>
              <Form.Item
                name="confirmPassword"
                dependencies={['password']}
                rules={[
                  { required: true, message: 'Please input your Password!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        'Password and confirm password does not match'
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  size="large"
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  className="inputSize !w-72"
                  placeholder={'Re-enter your password'}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  loading={isLoading || loginLoading}
                  type="primary"
                  htmlType="submit"
                  className="w-full !bg-buttonBg !text-lg !text-buttonTextColor"
                >
                  <span className="font-sans">{'Confirm'}</span>
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Row>
    </div>
  );
}
