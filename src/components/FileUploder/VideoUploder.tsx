import React, { useState } from 'react';
import { Upload, Button, Progress, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios, { AxiosProgressEvent } from 'axios';
import { RcFile, UploadProps } from 'antd/es/upload/interface';

interface PresignedUrlResponse {
  url: string;
  key: string;
}

const S3VideoUploader: React.FC = () => {
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);

  const handleUpload: UploadProps['customRequest'] = async ({ file }) => {
    try {
      setUploading(true);
      // Step 1: Get pre-signed URL from your server
      const response = await axios.post<PresignedUrlResponse>(
        '/api/get-presigned-url',
        {
          filename: (file as RcFile).name,
          fileType: (file as RcFile).type,
        }
      );

      const { url, key } = response.data;

      // Step 2: Upload the file to S3 using the pre-signed URL
      const config = {
        headers: {
          'Content-Type': (file as RcFile).type,
        },
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          }
        },
      };

      await axios.put(url, file, config);

      setUploading(false);
      message.success('Video uploaded successfully!');
    } catch (error) {
      setUploading(false);
      message.error('Video upload failed. Please try again.');
    }
  };

  return (
    <div>
      <Upload
        customRequest={handleUpload}
        accept="video/*"
        showUploadList={false}
      >
        <Button icon={<UploadOutlined />} disabled={uploading}>
          {uploading ? 'Uploading...' : 'Click to Upload Video'}
        </Button>
      </Upload>
      {uploading && (
        <Progress
          percent={uploadProgress}
          status="active"
          style={{ marginTop: 16 }}
        />
      )}
    </div>
  );
};

export default S3VideoUploader;
