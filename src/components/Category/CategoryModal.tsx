import { UploadOutlined } from '@ant-design/icons';
import CustomImageTag from '@components/ui/CustomTag/CustomImage';
import PDFViewer from '@components/ui/PdfViewer';
import { IFileAfterUpload } from '@local-types/globalType';
import {
  useAddCategoryMutation,
  useUpdateCategoryMutation,
} from '@redux/features/admin/categoryApi';
import fileObjectToLink from '@utils/fileObjectToLink';
import { LinkToGetExtensions } from '@utils/LinkToGetExtensions';
import { ErrorModal, SuccessModal } from '@utils/modalHook';
import { Button, Collapse, Form, Input, message, Select, Upload } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
const { Panel } = Collapse;
const CategoryModal = ({
  initialValues,
  readOnly = false,
}: {
  initialValues?: any;
  readOnly?: boolean;
}) => {
  let iniValue = { ...initialValues };

  const [form] = Form.useForm();
  const [addCategory, { isLoading }] = useAddCategoryMutation();
  const [updateCategory, { isLoading: uloading }] = useUpdateCategoryMutation();

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
        const res = await updateCategory({
          id: iniValue._id,
          data: formData,
        }).unwrap();
        SuccessModal('Successfully Updated');
        message.success('Successfully Updated');
      } else {
        const res = await addCategory(formData).unwrap();
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

      <Form.Item label="Subtitle" name="subTitle">
        <Input />
      </Form.Item>

      <Form.Item
        label="Company"
        name="company"
        className="w-40"
        rules={[
          {
            required: iniValue._id ? false : true,
            message: 'Please select the company!',
          },
        ]}
      >
        <Select placeholder="Select a company">
          <Select.Option value="companyDocumentSubmit">
            Company Document Submit
          </Select.Option>
          <Select.Option value="driverDocumentSubmit">
            Driver Document Submit
          </Select.Option>
        </Select>
      </Form.Item>

      <div className="flex items-center gap-2">
        <Form.Item
          label="Category Banner"
          name="image"
          valuePropName="fileList"
          rules={[
            {
              required: iniValue._id ? false : true,
              message: 'Please select the Banner Image!',
            },
          ]}
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
        >
          <Upload
            // action="/upload"
            multiple={false}
            listType="picture-card"
            showUploadList={true}
            maxCount={1}
            accept="image/*"
          >
            Upload Image +
          </Upload>
        </Form.Item>

        {initialValues?.image && (
          <CustomImageTag
            src={initialValues?.image}
            height={300}
            width={300}
            className="w-32 cursor-pointer rounded-lg border border-purple-400"
            preview={true}
          />
        )}
      </div>

      <div>
        <Form.Item
          label="Files"
          name="files"
          valuePropName="fileList"
          rules={[
            {
              required: iniValue._id ? false : true,
              message: 'Please select the file!',
            },
          ]}
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
        >
          <Upload
            accept="application/*"
            maxCount={2}
            multiple={false}
            // action="/upload"
            listType="text"
            beforeUpload={() => false}
          >
            <Button icon={<UploadOutlined />}>Upload Files</Button>
          </Upload>
        </Form.Item>
        <div className="my-2 flex items-center justify-center gap-2 rounded-md border">
          <Form.Item>
            <Button
              loading={isLoading || uloading}
              type="primary"
              className="mt-4"
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
                className="mt-4"
                htmlType="reset"
              >
                Reset
              </Button>
            </Form.Item>
          )}
        </div>
      </div>
      <div>
        <div className="w-full">
          <Collapse defaultActiveKey={['0']}>
            {initialValues?.files.map(
              (file: IFileAfterUpload, index: number) => {
                const application = LinkToGetExtensions(
                  fileObjectToLink(file),
                  ['.doc', '.docx']
                );
                return (
                  <Panel
                    header={`File ${index + 1}: ${file?.filename} `}
                    key={index}
                  >
                    <div className="my-3 border">
                      {/* <h2 className="my-3 text-center text-lg font-bold">
                        <span className="rounded-lg p-3">File {index + 1}</span>
                      </h2> */}
                      <hr />
                      {file.mimetype.includes('image') && (
                        <CustomImageTag
                          src={fileObjectToLink(file)}
                          width={500}
                          height={500}
                          className="h-96 w-96"
                        />
                      )}
                      {file.mimetype.includes('pdf') && (
                        <PDFViewer file={fileObjectToLink(file)} />
                      )}
                      {application?.type === 'document' && (
                        <iframe
                          src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileObjectToLink(file))}`}
                          width="100%"
                          height="900px"
                          style={{ border: 'none' }}
                          title={file?.filename}
                        />
                      )}
                    </div>
                  </Panel>
                );
              }
            )}
          </Collapse>
        </div>
      </div>
    </Form>
  );
};

export default CategoryModal;
