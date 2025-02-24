import { PlusOutlined } from '@ant-design/icons';
import {
  useAddTestimonialMutation,
  useUpdateTestimonialMutation,
} from '@redux/features/admin/testimonialsApi';
import { ErrorModal } from '@utils/modalHook';
import { Button, DatePicker, Form, Input, message, Select, Upload } from 'antd';
import { UploadFile } from 'antd/es/upload/interface';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { multipleFilesUploaderS3 } from '../../utils/handelFileUploderS3';

interface FormValues {
  _id: string;
  title: string;
  checkBoxText: string;
  description: string;
  endDate: Dayjs | string;
  upload: UploadFile[];
  image: any;
}

const AddAdvertisementForm = ({
  initialValues,
  readOnly,
}: {
  initialValues?: FormValues;
  readOnly?: boolean;
}) => {
  const [uploading, setUploading] = useState(false);
  const [addTestimonial, { isLoading }] = useAddTestimonialMutation();
  const [updateTestimonial, { isLoading: Uloading }] =
    useUpdateTestimonialMutation();
  const [form] = Form.useForm<FormValues>(); // Use FormValues

  const onFinish = async (values: FormValues) => {
    // console.log('🚀 ~ onFinish ~ values:', values);
    if (!values.endDate) {
      form.setFieldsValue({ endDate: dayjs().add(2, 'year') });
    }
    values['endDate'] = new Date(values.endDate as string).toISOString();
    if (values?.image?.length > 0) {
      if (values?.image[0]?.path) {
        //when set default image then image objet in set array then convirt single object
        values['image'] = values?.image[0];
      } else {
        setUploading(true);
        const file = await multipleFilesUploaderS3(
          values?.image.map((image: any) => image.originFileObj)
        );
        values['image'] = file[0];
      }
    }

    // return;
    try {
      if (initialValues?._id) {
        const res = await updateTestimonial({
          id: initialValues?._id,
          data: values,
        }).unwrap();
        message.success('Update successful');
      } else {
        const res = await addTestimonial(values).unwrap();
        message.success('Successfully uploaded');
        form.resetFields();
      }
    } catch (error) {
      console.log('🚀 ~ onFinish ~ error:', error);
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
  // console.log(initialValues);
  let image = initialValues?.image;

  if (image) {
    image = {
      ...image,
      name: image.filename,
      type: image.mimetype,
      uid: '1122334455',
    };
    // image['name'] = image.filename;
    // image['type'] = image.mimetype;
    // image['uid'] = '1122334455';
  }

  return (
    <div className="mx-auto max-w-lg rounded-lg bg-white p-4 shadow-md">
      <h2 className="mb-4 text-center text-lg font-bold">Add Advertisement</h2>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="space-y-4"
        disabled={readOnly}
        initialValues={
          initialValues?._id
            ? {
                ...initialValues,
                endDate: dayjs(initialValues.endDate, 'YYYY-MM-DD'),
                image: image ? [image] : [],
              }
            : {}
        }
      >
        <Form.Item
          name="image"
          label=""
          valuePropName="fileList"
          getValueFromEvent={normFile}
          className="flex h-40 items-center justify-center border border-dashed border-blue-500"
          rules={[{ required: true, message: 'Please upload an image!' }]}
        >
          <Upload
            name="image"
            listType="picture-card"
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
        <Form.Item
          label={<p className="capitalize">{`Navigate link`}</p>}
          name="link"
          rules={[
            {
              required: false,
              message: 'Please input the Navigate link!',
            },
            {
              type: 'url',
              message: 'Please enter a valid URL!',
            },
          ]}
        >
          <Input placeholder="Please enter Navigate link" />
        </Form.Item>

        <Form.Item
          label="Company"
          name="company"
          rules={[{ required: true, message: 'Please input the Company!' }]}
        >
          <Select
            // onChange={(value) => setCompany(value)}
            placeholder="Select a company"
            allowClear
            size="large"
          >
            <Select.Option value="companyDocumentSubmit">
              Company Document Submit
            </Select.Option>
            <Select.Option value="driverDocumentSubmit">
              Driver Document Submit
            </Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          // rules={[{ required: true, message: 'Please input the description!' }]}
        >
          <Input.TextArea
            placeholder="Description"
            rows={4}
            className="rounded-lg"
          />
        </Form.Item>

        <Form.Item
          name="endDate"
          label="Exp Date"
          // rules={[
          //   { required: true, message: 'Please select an expiration date!' },
          // ]}
        >
          <DatePicker
            disabledDate={
              (current) => current && current < dayjs().startOf('day') // Using dayjs to disable past dates
            }
            className="!min-h-14 w-full rounded-lg"
            placeholder="Select date"
          />
        </Form.Item>

        <div className="my-2 flex items-center justify-center gap-2 rounded-md border">
          <Form.Item>
            <Button
              loading={isLoading || uploading || Uloading}
              // disabled={}
              type="primary"
              className="mt-4 !min-h-8 !w-48 !bg-bgd"
              htmlType="submit"
            >
              Upload
            </Button>
          </Form.Item>
          {!initialValues?._id && (
            <Form.Item>
              <Button
                type="primary"
                className="mt-4 !min-h-8 !w-48 !bg-bgd"
                htmlType="reset"
                // onClick={() => setFileList([])}
              >
                Reset
              </Button>
            </Form.Item>
          )}
        </div>
      </Form>
    </div>
  );
};

export default AddAdvertisementForm;
