import CustomImageTag from '@components/ui/CustomTag/CustomImage';
import { IFileAfterUpload } from '@local-types/globalType';
import {
  useAddProductMutation,
  useUpdateProductMutation,
} from '@redux/features/admin/productApi';
import {
  IProductCategory,
  useGetAllProductCategoryQuery,
} from '@redux/features/admin/productCategoryApi';
import { singleFileUploaderInS3AndUploadProgress } from '@utils/handelFileUploderS3';

import { ErrorModal, SuccessModal } from '@utils/modalHook';
import {
  Button,
  Collapse,
  Form,
  Input,
  InputNumber,
  message,
  Select,
  Upload,
} from 'antd';
import { useState } from 'react';
const { Panel } = Collapse;
const CreateProduct = ({
  initialValues,
  readOnly = false,
}: {
  initialValues?: any;
  readOnly?: boolean;
}) => {
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  let iniValue = { ...initialValues };

  const [form] = Form.useForm();
  const { data, isLoading: pcLoading } = useGetAllProductCategoryQuery({
    limit: 90000,
  });
  const productCategory = data?.data;
  const [addProduct, { isLoading }] = useAddProductMutation();
  const [updateProduct, { isLoading: uloading }] = useUpdateProductMutation();

  const handleFinish = async (values: any | IProductCategory) => {
    console.log('🚀 ~ handleFinish ~ values:', values.images);
    const category = productCategory?.find(
      (p) => p._id === values.productCategoryId
    );
    if (!category) return;
    values.productCategoryName = category.title;
    // Ensure that values.pricing exists before accessing price
    if (values.pricing && values.pricing.price) {
      values.pricing.price = parseFloat(values.pricing.price.toFixed(2));
      values.pricing = {
        price: values.pricing.price,
        currency: values.pricing.currency || 'usd',
      };
    } else {
      // Initialize pricing object if it doesn't exist
      values.pricing = { price: 0, currency: 'usd' };
    }

    const key = 'loadingMessage';
    message.loading({ content: 'Adding to product...', key });
    try {
      const formData = new FormData();
      const serverResponseObject =
        await singleFileUploaderInS3AndUploadProgress(
          values.images[0],
          setUploadProgress,
          setIsUploading
        );
      message.success('File uploaded successfully');
      values.images = [serverResponseObject];

      formData.append('data', JSON.stringify(values));
      console.log(formData);
      if (iniValue._id) {
        const res = await updateProduct({
          id: iniValue._id,
          data: formData,
        }).unwrap();
        SuccessModal('Successfully Updated');
        message.success('Successfully Updated');
      } else {
        const res = await addProduct(formData).unwrap();
        SuccessModal('Successfully added');
        form.resetFields();
        message.success('Successfully added');
      }
    } catch (error: any) {
      ErrorModal(error);
      message.error(error?.message);
    }
    message.destroy(key);
  };

  if (iniValue) {
    const { images, ...valueCopy } = iniValue;
    iniValue = valueCopy;
  }
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => {
    return (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  };
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
        name="name"
        rules={[
          {
            required: iniValue._id ? false : true,
            message: 'Please input the title!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <div className="2 grid grid-cols-1">
        <Form.Item
          label="Category"
          name="productCategoryId"
          rules={[
            {
              required: iniValue._id ? false : true,
              message: 'Please input the title!',
            },
          ]}
          className="!w-full"
        >
          <Select
            filterOption={filterOption}
            optionFilterProp="children"
            placeholder="Select a category"
            allowClear
            size="large"
            className="!w-full"
            showSearch
            loading={pcLoading}
            options={productCategory?.map((category) => {
              return {
                label: category.title,
                value: category._id,
              };
            })}
          />
        </Form.Item>
        <div className="flex items-center justify-center gap-2">
          <Form.Item
            label="Upload photo"
            name="images"
            valuePropName="fileList"
            rules={[
              {
                required: iniValue._id ? false : true,
                message: 'Please select the Banner Image!',
              },
            ]}
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
            className="!flex justify-between"
          >
            <Upload
              // action="/upload"
              multiple={true}
              listType="picture-card"
              showUploadList={true}
              maxCount={5}
              accept="image/*"
              beforeUpload={() => false}
            >
              <p className="cursor-pointer rounded-lg border p-2">
                {' '}
                Upload Image +
              </p>
            </Upload>
          </Form.Item>
          {initialValues?.images &&
            initialValues?.images?.map((d: IFileAfterUpload) => (
              <CustomImageTag
                src={d}
                height={300}
                width={300}
                className="w-28 cursor-pointer rounded-lg border border-purple-400"
                preview={true}
              />
            ))}
        </div>
      </div>
      <div className="flex justify-start gap-2">
        <Form.Item
          label="Price"
          name={['pricing', 'price']}
          rules={[
            {
              required: iniValue._id ? false : true,
              message: 'Please input the title!',
            },
          ]}
        >
          <InputNumber type="number" min={0} />
        </Form.Item>
        {iniValue._id && (
          <Form.Item label="Status" name="status">
            <Select
              defaultValue={'active'}
              options={[
                { label: 'Active', value: 'active' },
                { label: 'Inactive', value: 'inactive' },
              ]}
            />
          </Form.Item>
        )}
      </div>

      <Form.Item
        label="Description"
        name="description"
        rules={[
          {
            required: iniValue._id ? false : true,
            message: 'Please input the title!',
          },
        ]}
      >
        <Input.TextArea rows={8} />
      </Form.Item>

      <div className="flex items-center justify-center gap-2 rounded-md">
        <Form.Item>
          <Button
            loading={isLoading || uloading || isUploading}
            type="primary"
            className="!bg-gradient-to-r !from-[#84247c] !to-[#861f75]"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
        {!iniValue._id && (
          <Form.Item>
            <Button
              // loading={isLoading}
              type="primary"
              className="!bg-gradient-to-r !from-[#84247c] !to-[#861f75]"
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

export default CreateProduct;
