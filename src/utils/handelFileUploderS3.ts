import { getBaseUrl } from '@helpers/config/envConfig';
import axios, { AxiosProgressEvent } from 'axios';
import { instance as axiosInstance } from '../helpers/axios/axiosInstance';
const url = `${getBaseUrl}/aws/create-aws-upload-files-token`;

const singleFileUploaderInS3 = async (
  fileData: { pre_url: any },
  uploadFile: any
) => {
  try {
    const response = await axios({
      url: fileData.pre_url,
      method: 'PUT',
      data: uploadFile,
    });
    // const response = await axiosInstance({
    //   url: fileData.pre_url,
    //   method: "PUT",
    //   data: uploadFile,
    //   withCredentials: true,
    // });

    return fileData;
  } catch (error: any) {
    console.log('🚀 ~ error:', error);
    throw new Error(error?.message || 'Error');
  }
};

type IPreUrlParams = {
  filename: string;
  mimetype: string;
  uid?: string;
};

export const getS3PreUrlToken = async (
  data: Record<string, IPreUrlParams[]>
) => {
  try {
    const response = await axiosInstance.post(
      url,
      data, //? example {files:[{ filename: string; mimetype: string; uid?: string; }]}
      {
        withCredentials: true,
      }
    );
    // console.log('🚀 ~ response:', response);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error.message || 'Error');
  }
};

export const multipleFilesUploaderS3 = async (files: any[]) => {
  // console.log('🚀 ~ multipleFilesUploaderS3 ~ files:', files);
  try {
    const filesModifyServerFormate = files?.map((file, index) => {
      let uid = file?.uid;
      if (!uid) {
        uid = crypto.randomUUID();
        files[index].uid = uid;
      }
      return {
        filename: file.name,
        mimetype: file.type,
        uid: uid, //!when use ant-d uploader then file.originFileObj in have --> default (uid) . when use custom uploader then add uid custom
      };
    });
    //-----------------------get pre-url-----------------------------
    const promises: any[] = [];
    const getFilesToken = await getS3PreUrlToken({
      files: filesModifyServerFormate,
    });
    const serverResponseObjects = getFilesToken.files || [];
    //----------------------------------------------------------------
    files?.forEach((file) => {
      const serverObject = serverResponseObjects?.find(
        (serverFile: { uid: any }) => serverFile?.uid === file?.uid //!when use ant-d uploader then file.originFileObj in have --> default uid . when use custom uploader then add uid custom
      );
      const fileUpload = singleFileUploaderInS3(serverObject, file);
      promises.push(fileUpload);
    });
    const result = await Promise.all(promises);
    return result;
  } catch (error: any) {
    // console.log('🚀 ~ multipleFilesUploaderS3 ~ error:', error);
    throw new Error(error?.message || 'Error');
  }
};

export const singleFileUploaderInS3AndUploadProgress = async (
  // fileData: { pre_url: any },
  uploadFile: any,
  setUploadProgress: (progress: number) => void, // Progress update function
  setIsUploading: (isUploading: boolean) => void // Set uploading state
) => {
  try {
    if (!uploadFile?.uid) {
      uploadFile['uid'] = crypto.randomUUID();
    }
    if (uploadFile?.originFileObj) {
      uploadFile = uploadFile.originFileObj; // Convert to form data
      uploadFile['filename'] = uploadFile.name;
      uploadFile['mimetype'] = uploadFile.type;
      uploadFile['uid'] = uploadFile.uid;
    }
    // Start upload process
    setIsUploading(true);
    const getFilesToken = await getS3PreUrlToken({
      files: [uploadFile],
    });
    const { files } = getFilesToken;
    // console.log(getFilesToken);
    const response = await axios({
      url: files[0].pre_url,
      method: 'PUT',
      data: uploadFile,
      onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        if (progressEvent.total) {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(progress); // Update progress state
        }
      },
    });

    return files[0]; // Return file data after successful upload
  } catch (error: any) {
    console.error('Error uploading file:', error);
    // Finish uploading on error
    throw new Error(error?.message || 'Error uploading file');
  } finally {
    setIsUploading(false);
  }
};
