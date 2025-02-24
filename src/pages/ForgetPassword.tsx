import { ArrowLeftOutlined } from '@ant-design/icons';
import { AllImage } from '@assets/AllImge';
import CustomImageTag from '@components/ui/CustomTag/CustomImage';
import { selectCurrentUser } from '@redux/features/auth/authSlice';
import { useAppSelector } from '@redux/hooks';
import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useForgetPasswordMutation } from '../redux/features/auth/authApi';
import { ErrorModal, SuccessModal } from '../utils/modalHook';
export default function ForgotPassword() {
  const user = useAppSelector(selectCurrentUser);
  const navigate = useNavigate();
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();

  const onFinish = async (values: any) => {
    console.log('Received values of form: ', values);
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
    <div className="flex h-screen bg-white">
      {/* Side Image */}
      <div className="hidden w-1/2 md:block">
        <img
          src={AllImage.forgerPassword}
          alt="Side Banner"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Forget Password Form */}
      <div className="flex h-screen w-[90%] items-center justify-center px-4">
        <div className="border- flex w-[80%] flex-col items-center justify-center rounded-lg border px-8 py-10 shadow-xl">
          {/* Logo */}
          <div className="mb-6 text-center">
            <CustomImageTag
              src={AllImage.logoAndName}
              width={1900}
              height={1900}
              className="mx-auto h-20 w-auto"
            />
          </div>

          {/* Title */}
          <h1 className="mb-6 text-center text-xl font-semibold text-gray-800">
            <Link to={`/login`}>
              <ArrowLeftOutlined className="mr-2" />
            </Link>
            Recover password to Fall In
          </h1>

          {/* Form */}
          <Form
            name="login_form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
            className="w-full"
          >
            {/* Email Input */}
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please input your Email!' }]}
              label="Email"
            >
              <Input
                size="large"
                placeholder="Enter your email"
                className="h-12 rounded-md border-gray-300 focus:ring focus:ring-blue-200"
              />
            </Form.Item>

            {/* Submit Button */}
            <div className="flex justify-center">
              <Form.Item>
                <Button
                  htmlType="submit"
                  className="h-10 w-40 rounded-md !bg-black text-sm !text-white hover:bg-gray-900"
                  loading={isLoading}
                >
                  Send Otp
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
