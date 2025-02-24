import { UserOutlined } from '@ant-design/icons';
import { AllImage } from '@assets/AllImge';
import CustomImageTag from '@components/ui/CustomTag/CustomImage';
import { Button, Form, Input, Row, Typography } from 'antd';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useForgetPasswordMutation } from '../redux/features/auth/authApi';
import { ErrorModal, SuccessModal } from '../utils/modalHook';
export default function ForgotPassword() {
  const navigate = useNavigate();
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();

  const onFinish = async (values: any) => {
    // console.log("Received values of form: ", values);
    try {
      const res = await forgetPassword(values).unwrap();
      navigate(`/verify-otp?email=${values.email}`);
      SuccessModal('Otp send successful please check your email');
    } catch (error) {
      console.log(error);
      ErrorModal(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-authBg">
      <Row
        style={{
          borderRadius: '30px',
          background: 'white',
          // boxShadow: '20px 20px 60px #bebebe, -20px -20px 60px #ffffff',
        }}
        justify="center"
        align="middle"
        // style={{ height: "100vh" }}
        className="mx-auto h-fit w-fit max-w-md"
      >
        <div className="flex flex-col items-center justify-center px-1 py-5">
          <div className="pt-6">
            <CustomImageTag
              src={AllImage.logoAndName}
              width={1900}
              height={1900}
              className="mx-auto h-40 w-40"
            />
          </div>
          <div className="flex flex-col items-center justify-center px-8 py-5">
            <div className="mb-6 flex flex-col items-center justify-center">
              {/* <Link href={`/${lang}/sign-in`}>
          <ArrowLeftOutlined />
        </Link> */}
              <div
                // onClick={() => navigate('/login')}
                className="flex items-center gap-2 font-sans text-lg font-bold"
              >
                <Link className="text-black" to={'/login'}>
                  <FaArrowLeft
                    className="text-black"
                    style={{ fontSize: '15px' }}
                  />
                </Link>{' '}
                {'Forget Password'}
              </div>
              <p className="mx-10 my-3 text-center font-sans">
                {'Please enter your email address to reset your password'}.
              </p>
            </div>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              layout="vertical"
              style={{
                margin: '-20px 0 0 0',
              }}
            >
              <Typography.Title level={5} className="font-sans">
                {'Email'}
              </Typography.Title>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: 'Please input your Email!' },
                ]}
              >
                <Input
                  size="large"
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder={'Enter your email'}
                  className="inputSize !w-72"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  // type="primary"

                  loading={isLoading}
                  htmlType="submit"
                  className="!h-12 w-full !bg-buttonBg !text-lg !text-buttonTextColor"
                >
                  <span className="font-sans">{'Send OTP'}</span>
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Row>
    </div>
  );
}
