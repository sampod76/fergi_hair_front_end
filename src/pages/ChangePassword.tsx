import { ArrowLeftOutlined, LockOutlined } from '@ant-design/icons';
import { useChangePasswordMutation } from '@redux/features/auth/authApi';
import { selectCurrentUser } from '@redux/features/auth/authSlice';
import { useAppSelector } from '@redux/hooks';
import { ErrorModal, SuccessModal } from '@utils/modalHook';
import { Button, Form, Input, Typography } from 'antd';
import { Link } from 'react-router-dom';

const ChangePassword = () => {
  const user = useAppSelector(selectCurrentUser);
  const [form] = Form.useForm();
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const handleFinish = async (values: any) => {
    try {
      const res = await changePassword(values).unwrap();

      SuccessModal('Successfully changed password');
      // dispatch(logout());
      // navigate('/login');
    } catch (error) {
      console.log(
        '🚀 ~ constonSubmit:SubmitHandler<FieldValues>= ~ error:',
        error
      );
      ErrorModal(error);
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-md">
      {/* Header Section */}
      <div className="mb-6 flex items-center">
        <Link to={`/${user?.role}/settings`}>
          <ArrowLeftOutlined className="mr-2" />
        </Link>
        <h2 className="text-xl font-semibold">Change Password</h2>
      </div>

      {/* Instruction */}
      <p className="mb-4 text-gray-500">
        Your password must be 8-10 characters long.
      </p>

      {/* Form Section */}
      <Form
        name="change_password_form"
        className="change-password-form"
        onFinish={handleFinish}
      >
        {/* Old Password */}
        <Typography.Title level={5} className="font-sans">
          Old Password
        </Typography.Title>
        <Form.Item
          name="oldPassword"
          rules={[
            { required: true, message: 'Please input your old password!' },
            { min: 8, message: 'Password must be at least 8 characters long!' },
          ]}
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined />}
            placeholder="Enter your old password"
          />
        </Form.Item>

        {/* New Password */}
        <Typography.Title level={5} className="font-sans">
          New Password
        </Typography.Title>
        <Form.Item
          name="newPassword"
          rules={[
            { required: true, message: 'Please input your new password!' },
            { min: 8, message: 'Password must be at least 8 characters long!' },
          ]}
          hasFeedback
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined />}
            placeholder="Enter your new password"
          />
        </Form.Item>

        {/* Confirm New Password */}
        <Typography.Title level={5}>Confirm New Password</Typography.Title>
        <Form.Item
          name="confirmNewPassword"
          dependencies={['newPassword']}
          rules={[
            { required: true, message: 'Please confirm your new password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('New password and confirm password do not match!')
                );
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined />}
            placeholder="Re-enter your new password"
          />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button
            loading={isLoading}
            type="primary"
            htmlType="submit"
            className="w-full text-lg"
          >
            Update Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePassword;
