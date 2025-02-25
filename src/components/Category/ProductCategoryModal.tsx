import {
  useAddProductCategoryMutation,
  useUpdateProductCategoryMutation,
} from '@redux/features/admin/productCategoryApi';

import { ErrorModal, SuccessModal } from '@utils/modalHook';
import { Button, Collapse, Form, Input, message } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
const { Panel } = Collapse;
const ProductCategoryModal = ({
  initialValues,
  readOnly = false,
}: {
  initialValues?: any;
  readOnly?: boolean;
}) => {
  let iniValue = { ...initialValues };

  const [form] = Form.useForm();
  const [addProductCategory, { isLoading }] = useAddProductCategoryMutation();
  const [updateProductCategory, { isLoading: uloading }] =
    useUpdateProductCategoryMutation();

  const handleFinish = async (values: any) => {
    // console.log('🚀 ~ handleFinish ~ values:', values);
    try {
      /*
       const [image, files] = await Promise.all([
        multipleFilesUploaderS3([values?.image?.[0]?.originFileObj]),
        multipleFilesUploaderS3(
          Array.isArray(values.files)
            ? values.files.map((file: UploadFile) => file.originFileObj)
            : [] // Provide an empty array if values.files is not an array
        ),
      ]); 
      */
      const formData = new FormData();
      if (values.image?.length > 0) {
        formData.append('image', values?.image[0]?.originFileObj);
        delete values.image;
      }
      // console.log(values.files);
      if (values.files?.length > 0) {
        values.files.forEach((file: UploadFile) => {
          if (file.originFileObj) {
            //! when use ant-d uploader then get originFileObj othen wise directly use file
            // Check if originFileObj is defined
            formData.append('files', file.originFileObj);
          }
        });
        delete values.files;
      }

      formData.append('data', JSON.stringify(values));
      if (iniValue._id) {
        const res = await updateProductCategory({
          id: iniValue._id,
          data: formData,
        }).unwrap();
        SuccessModal('Successfully Updated');
        message.success('Successfully Updated');
      } else {
        const res = await addProductCategory(formData).unwrap();
        SuccessModal('Successfully added');
        form.resetFields();
        message.success('Successfully added');
      }
    } catch (error: any) {
      ErrorModal(error);
      message.error(error?.message);
    }
  };

  if (iniValue) {
    const { image, files, ...valueCopy } = iniValue;
    iniValue = valueCopy;
  }

  return (
    <Form
      form={form}
      disabled={readOnly}
      onFinish={handleFinish}
      initialValues={iniValue._id ? { ...iniValue } : {}}
      layout="vertical"
      className=""
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[
          {
            required: iniValue._id ? false : true,
            message: 'Please input the title!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <div className="flex items-center justify-center gap-2 rounded-md">
        <Form.Item>
          <Button
            loading={isLoading || uloading}
            type="primary"
            className=""
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
        {!iniValue && (
          <Form.Item>
            <Button
              // loading={isLoading}
              type="dashed"
              className=""
              htmlType="reset"
            >
              Reset
            </Button>
          </Form.Item>
        )}
      </div>
    </Form>
  );
};

export default ProductCategoryModal;
