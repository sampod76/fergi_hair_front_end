import {
  ArrowLeftOutlined,
  EditOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { useUpdateadminMutation } from '@redux/features/admin/adminApi';
import { useUpdateVendorMutation } from '@redux/features/admin/vendorUserApi';
import { selectCurrentUser } from '@redux/features/auth/authSlice';
import { useAppSelector } from '@redux/hooks';
import { multipleFilesUploaderS3 } from '@utils/handelFileUploderS3';
import { ErrorModal, SuccessModal } from '@utils/modalHook';
import { Button, Form, Input, Upload } from 'antd';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LoadingSkeleton from '../components/ui/Loading/LoadingSkeleton';
import { useGetProfileQuery } from '../redux/features/auth/authApi';
const Profile = () => {
  const [uploading, setUploading] = useState(false);
  const user = useAppSelector(selectCurrentUser);
  const [disable, setDisable] = useState(true);
  //
  const [form] = Form.useForm();
  //
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get('id');
  //
  const { data, isLoading } = useGetProfileQuery({});

  const [updateVendor, { isLoading: vLoading }] = useUpdateVendorMutation();
  const [updateAdmin, { isLoading: aLoading }] = useUpdateadminMutation();
  // console.log('🚀 ~ Profile ~ data:', data);

  const formatDate = (date: string | number | Date) =>
    new Date(date).toLocaleDateString();
  if (isLoading) {
    return <LoadingSkeleton sectionNumber={5} />;
  }
  const userInfo = data?.roleInfo || {};

  const handleFinish = async (values: any) => {
    try {
      if (values?.profileImage?.length > 0) {
        if (values?.profileImage[0]?.path) {
          //when set default image then image objet in set array then convirt single object
          values['profileImage'] = values?.profileImage[0];
        } else {
          setUploading(true);
          const file = await multipleFilesUploaderS3(
            values?.profileImage?.map((image: any) => image.originFileObj)
          );
          console.log('🚀 ~ handleFinish ~ file:', file);
          values['profileImage'] = file[0];
        }
      }
      if (
        Array.isArray(values?.profileImage) &&
        values?.profileImage?.length == 0
      ) {
        values['profileImage'] = undefined;
      }

      if (user?.role === 'admin') {
        await updateAdmin({
          id: user?.roleBaseUserId,
          data: values,
        }).unwrap();
      } else if (user?.role === 'vendor') {
        await updateVendor({
          id: user?.roleBaseUserId,
          data: values,
        }).unwrap();
      }
      SuccessModal('Successfully updated profile');
    } catch (error) {
      console.log('🚀 ~ handleFinish ~ error:', error);
      ErrorModal(error);
    } finally {
      setUploading(false);
    }
  };
  const uploadButton = (
    <div className="h-full w-full">
      <PlusOutlined className="text-2xl" /> <br />
      <p>Upload image</p>
    </div>
  );

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  let profileImage = userInfo?.profileImage;

  if (profileImage) {
    profileImage = {
      ...profileImage,
      name: profileImage.filename,
      type: profileImage.mimetype,
      uid: '1122334455',
    };
    // image['name'] = image.filename;
    // image['type'] = image.mimetype;
    // image['uid'] = '1122334455';
  }
  return (
    <div className="mx-auto my-8 max-w-4xl rounded-lg bg-white p-6 shadow-md">
      {/* Header Section */}
      <div className="mb-6 flex items-center justify-between">
        <Link className="!text-black" to={`/${user?.role}/settings`}>
          <div className="flex items-center">
            <ArrowLeftOutlined className="mr-2" />
            <h2 className="text-xl font-semibold">Personal Information</h2>
          </div>
        </Link>
        <Button
          type="primary"
          onClick={() => setDisable((c) => !c)}
          icon={<EditOutlined />}
          className="!bg-bgd !text-white hover:!bg-bgd"
        >
          Edit Profile
        </Button>
      </div>

      {/* Profile Section */}
      <Form
        form={form}
        initialValues={{
          ...userInfo,
          'name.firstName': userInfo?.name?.firstName,
          'name.lastName': userInfo?.name?.lastName,
          profileImage: profileImage ? [profileImage] : [],
        }}
        layout="vertical"
        onFinish={handleFinish}
        className="space-y-4"
        disabled={disable}
      >
        <div className="flex gap-8">
          {/* Left Side (Profile Picture and Info) */}
          <div className="flex h-fit flex-col items-center rounded-lg border-2 border-bgd2 p-4">
            {/* <CustomImageTag
              src={userInfo?.profileImage}
              width={300}
              height={300}
              className="h-32 w-32 rounded-full shadow-2xl"
            /> */}
            <Form.Item
              name="profileImage"
              label=""
              valuePropName="fileList"
              getValueFromEvent={normFile}
              className="flex h-40 items-center justify-center border border-dashed border-blue-500"
              // rules={[{ required: true, message: 'Please upload an image!' }]}
            >
              <Upload
                name="profileImage"
                listType="picture-circle"
                className="!h-full !w-full"
                // showUploadList={false}
                maxCount={1}
                accept="image/*"
                multiple={false}
                beforeUpload={() => false} // Prevent automatic upload
                customRequest={() => {}}
              >
                <div className="flex w-full items-center justify-center">
                  {uploadButton}
                </div>
              </Upload>
            </Form.Item>

            <p className="text-lg font-semibold capitalize">{data?.role}</p>
            <p className="text-gray-500">Profile</p>
          </div>

          {/* Right Side (Form with User Info) */}
          <div className="flex-grow">
            <div>
              {/* Name Field */}
              <div className="-mb-4 grid grid-cols-1 gap-5 lg:grid-cols-2">
                <Form.Item
                  label="Name"
                  name="name.firstName"
                  // rules={[{ required: true, message: 'Please enter your name!' }]}
                >
                  <Input className="border-pink-300" />
                </Form.Item>
                <Form.Item
                  label="Name"
                  name="name.lastName"
                  // rules={[{ required: true, message: 'Please enter your name!' }]}
                >
                  <Input className="border-pink-300" />
                </Form.Item>
              </div>

              {/* Email Field */}
              <Form.Item label="Email" name="email">
                <Input disabled className="border-pink-300" />
              </Form.Item>

              {/* Phone Number Field */}
              <Form.Item
                label="Phone Number"
                name="contactNumber"
                // rules={[
                //   { required: true, message: 'Please enter your phone number!' },
                // ]}
              >
                <Input className="border-pink-300" />
              </Form.Item>

              {/* Submit Button (for testing, not visible in your design) */}
              {!disable && (
                <Form.Item>
                  <Button
                    type="primary"
                    loading={aLoading || vLoading || uploading}
                    htmlType="submit"
                    className="!bg-bgd !text-white hover:!bg-bgd"
                  >
                    Save Changes
                  </Button>
                </Form.Item>
              )}
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Profile;
