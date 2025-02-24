import { UploadOutlined } from '@ant-design/icons';
import ModalComponent from '@components/Modal/ModalComponents';
import CustomImageTag from '@components/ui/CustomTag/CustomImage';
import PDFViewer from '@components/ui/PdfViewer';
import { ENUM_MIMETYPE } from '@constants/globalEnums';

import {
  useAddFileUploadMutation,
  useUpdateFileUploadMutation,
} from '@redux/features/admin/fileUpload';
import fileObjectToLink from '@utils/fileObjectToLink';
import {
  multipleFilesUploaderS3,
  singleFileUploaderInS3AndUploadProgress,
} from '@utils/handelFileUploderS3';
import { LinkToGetExtensions } from '@utils/LinkToGetExtensions';
import { ErrorModal, SuccessModal } from '@utils/modalHook';
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Progress,
  Upload,
} from 'antd';
import { useState } from 'react';

const VideoAddFormModal = ({
  initialValues,
  readOnly = false,
  uploadType,
}: {
  initialValues?: any;
  readOnly?: boolean;
  uploadType: 'video' | 'doc';
}) => {
  let iniValue = { ...initialValues };
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]); // State to store selected files
  const [addFile, { isLoading }] = useAddFileUploadMutation();
  const [updateFile, { isLoading: uloading }] = useUpdateFileUploadMutation();

  const handleFinish = async (values: any) => {
    console.log('🚀 ~ handleFinish ~ values:', values);
    try {
      const formData = new FormData();

      if (values.files?.length > 0) {
        const serverResponseObject =
          await singleFileUploaderInS3AndUploadProgress(
            values.files[0],
            setUploadProgress,
            setIsUploading
          );
        message.success('File uploaded successfully');
        values.files = [serverResponseObject];
        // delete values.files;
      }
      if (values?.coverImage?.length) {
        setIsUploading(true);

        const coversImages = await multipleFilesUploaderS3([
          values?.coverImage[0].originFileObj,
        ]);
        values.coverImage = coversImages[0];

        setIsUploading(false);
      }

      values['fileType'] = uploadType;
      // console.log(values, 'values');
      formData.append('data', JSON.stringify(values));
      if (iniValue._id) {
        const res = await updateFile({
          id: iniValue._id,
          data: formData,
        }).unwrap();
        SuccessModal('Successfully Updated');
      } else {
        const res = await addFile(formData).unwrap();
        SuccessModal('Successfully added');
        setFileList([]);
        form.resetFields();
      }
    } catch (error) {
      ErrorModal(error);
    }
  };
  // Handle file change (update file list and preview)
  const handleFileChange = (info: any) => {
    let newFileList = [...info.fileList];
    // Ensure file preview is shown after upload completion
    newFileList = newFileList.map((file: any) => {
      if (file.status === 'done') {
        file.url = file.response?.url || file.url; // Use the URL from the response if available
      }
      return file;
    });
    setFileList(newFileList); // Update fileList state
  };
  // Preview video or file if selected
  const handlePreview = (file: any) => {
    if (file.originFileObj) {
      return URL.createObjectURL(file.originFileObj);
    }
    return '';
  };
  if (iniValue) {
    const { coverImage, files, ...valueCopy } = iniValue;
    // console.log('🚀 ~ files:', files);
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
      <div className="my-3 flex h-full w-full flex-col items-center justify-center border">
        <Form.Item
          name="files"
          valuePropName="fileList"
          rules={[
            {
              required: iniValue._id ? false : true,
              message: `Please upload a ${uploadType} file!`,
            },
          ]}
          className="!mt-3"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
        >
          <Upload
            accept={
              uploadType === 'video'
                ? 'video/*'
                : uploadType === 'doc'
                  ? [ENUM_MIMETYPE.doc1, ENUM_MIMETYPE.doc2].join(',')
                  : ''
            }
            maxCount={1}
            listType="picture"
            beforeUpload={() => false}
            customRequest={() => {}}
            onChange={handleFileChange} // Handle file change event
            fileList={fileList} // Controlled fileList
            // className="upload-wrapper"
          >
            <div className="rounded-lg border p-2 text-center">
              <UploadOutlined
                className=""
                style={{ fontSize: '24px', color: '#1890ff' }}
              />
              <div style={{ marginTop: 8 }}>Upload {uploadType}</div>
            </div>
          </Upload>
        </Form.Item>

        {/* Preview video if file is selected */}

        {fileList.length > 0 && fileList[0]?.originFileObj && !isUploading && (
          <div className="my-4">
            {fileList[0]?.originFileObj?.type?.includes('video') && (
              <video
                className="rounded-xl"
                controls
                width="300"
                src={handlePreview(fileList[0])}
              />
            )}
          </div>
        )}
        {initialValues?.files?.length &&
          initialValues?.fileType === 'video' && (
            <div className="my-4 rounded-xl border p-2">
              <p className="text-center text-blue-400">Already Uploaded</p>
              <video
                controls
                width="300"
                className="rounded-xl"
                src={fileObjectToLink(initialValues.files[0])}
              />
            </div>
          )}
        {initialValues?.files?.length && initialValues?.fileType === 'doc' && (
          <div className="my-4 rounded-xl border p-2 text-center">
            <div className="flex justify-between gap-1">
              <p className="text-center text-blue-400">Already Uploaded </p>
              <a
                className="rounded-lg border px-1"
                download={true}
                href={fileObjectToLink(initialValues?.files[0])}
              >
                Download
              </a>
            </div>
            <ModalComponent
              button={
                <p className="rounded-lg bg-blue-400 p-2 text-white">
                  View Upload File
                </p>
              }
            >
              <div className="w-full">
                {initialValues?.files.map((file: any, index: number) => {
                  const application = LinkToGetExtensions(
                    fileObjectToLink(file),
                    ['.doc', '.docx']
                  );
                  return (
                    <div className="my-3 border">
                      <h2 className="my-3 text-center text-lg font-bold">
                        <span className="rounded-lg p-3">File {index + 1}</span>
                      </h2>
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
                  );
                })}
              </div>
            </ModalComponent>
          </div>
        )}
        {uploadProgress > 0 && uploadProgress < 100 && (
          <Progress className="!px-4" percent={uploadProgress} />
        )}
      </div>
      <div className="flex items-center gap-2">
        <Form.Item
          label="Cover Image"
          name="coverImage"
          valuePropName="fileList"
          rules={[
            {
              required: !iniValue._id ? true : false,
              // required: false,
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
            beforeUpload={() => false}
            customRequest={() => {}}
            // defaultFileList={
            //   uploadType === 'doc'
            //     ? [
            //         {
            //           url: 'https://d43af62ilhxe5.cloudfront.net/upload/images/1734189982573-doc.jpg',
            //           name: 'doc.jpg',
            //           type: 'image/jpg',
            //           uid: 'sdfsdfdsf',
            //         },
            //       ]
            //     : []
            // }
          >
            Upload Cover Image +
          </Upload>
        </Form.Item>

        {initialValues?.coverImage && (
          <CustomImageTag
            src={initialValues?.coverImage}
            height={300}
            width={300}
            className="w-32 cursor-pointer rounded-lg border border-purple-400"
            preview={true}
          />
        )}
      </div>

      <Form.Item
        label={<p className="capitalize">{`${uploadType} Title`}</p>}
        name="title"
        rules={[{ required: true, message: 'Please input the video title!' }]}
      >
        <Input placeholder={`${uploadType} Title`} />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[
          {
            required: uploadType == 'video',
            message: 'Please input a description!',
          },
        ]}
      >
        <Input.TextArea placeholder="Write here video description" rows={4} />
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
        rules={[{ required: true, message: 'Please input the price!' }]}
      >
        <InputNumber min={0} placeholder="$0.00" prefix="$" />
      </Form.Item>

      <div className="my-2 flex items-center justify-center gap-2 rounded-md border">
        <Form.Item>
          <Button
            loading={isLoading || uloading || isUploading}
            // disabled={}
            type="primary"
            className="mt-4 !min-h-8 !w-48 !bg-bgd"
            htmlType="submit"
          >
            Upload
          </Button>
        </Form.Item>
        {!iniValue?._id && (
          <Form.Item>
            <Button
              // loading={isLoading}
              type="primary"
              className="mt-4 !min-h-8 !w-48 !bg-bgd"
              htmlType="reset"
              onClick={() => setFileList([])}
            >
              Reset
            </Button>
          </Form.Item>
        )}
      </div>
    </Form>
  );
};

export default VideoAddFormModal;
