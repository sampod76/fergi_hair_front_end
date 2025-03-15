import {
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import CustomImageTag from '@components/ui/CustomTag/CustomImage';
import LoadingSkeleton from '@components/ui/Loading/LoadingSkeleton';
import TextEditorNotSetValue from '@components/ui/TextEditorNotSetForm';
import { IFileAfterUpload } from '@local-types/globalType';
import {
  ICategory,
  useGetAllCategoryQuery,
} from '@redux/features/admin/categoryApi';
import {
  useAddTipsAndGuidelineMutation,
  useUpdateTipsAndGuidelineMutation,
} from '@redux/features/admin/tipsAndGuidelineApi';

import { ErrorModal, SuccessModal } from '@utils/modalHook';
import type { CascaderProps } from 'antd';
import {
  Button,
  Cascader,
  Collapse,
  Form,
  Input,
  message,
  Modal,
  Upload,
} from 'antd';
import { useState } from 'react';
const { Panel } = Collapse;
const { confirm } = Modal;
const HairIdentityCreate = ({
  initialValues,
  readOnly = false,
}: {
  initialValues?: any;
  readOnly?: boolean;
}) => {
  interface Option {
    value: string;
    label: string;
    children?: Option[];
  }
  const [textEditorValue, setTextEditorValue] = useState('');
  const [isUploading, setIsUploading] = useState<boolean>(false);

  let iniValue = { ...initialValues };

  // console.log('🚀 ~ iniValue:', iniValue);
  const [form] = Form.useForm();
  const { data, isLoading: pcLoading } = useGetAllCategoryQuery({
    categoryType: 'profile',
  });
  const categoryList = data?.data;
  // console.log('🚀 ~ categoryList:', categoryList);
  const [addTips, { isLoading }] = useAddTipsAndGuidelineMutation();
  const [updateTips, { isLoading: uloading }] =
    useUpdateTipsAndGuidelineMutation();
  if (pcLoading) {
    return <LoadingSkeleton />;
  }
  //@ts-ignore
  const modifyCategory = categoryList?.length ? categoryList : [];
  const recursion = (data: ICategory[]) => {
    return data.map((item: ICategory) => {
      // Create a modified object
      const modifiedItem: any = {
        label: item.label,
        value: item.uid, // Change 'value' to 'uid'
        children: item?.children ? recursion(item.children) : [], // Recursively modify children
      };

      return modifiedItem;
    });
  };

  const options: Option[] = recursion([...modifyCategory]);
  // console.log('🚀 ~ options:', options);

  const handleFinish = async (values: Record<string, any>) => {
    const { category } = values;

    let categoryValues: any;

    for (let i = 0; i < category.length; i++) {
      if (i === 0) {
        categoryValues = modifyCategory.find((m) => m.uid === category[i]);
      } else if (i === 1 && categoryValues?.children) {
        categoryValues = {
          ...categoryValues,
          children: categoryValues.children.find(
            (m: any) => m.uid === category[i]
          ),
        };
      } else if (i === 2 && categoryValues?.children?.children) {
        categoryValues = {
          ...categoryValues,
          children: {
            ...categoryValues.children,
            children: categoryValues.children.children.find(
              (m: any) => m.uid === category[i]
            ),
          },
        };
      } else if (i === 3 && categoryValues?.children?.children?.children) {
        categoryValues = {
          ...categoryValues,
          children: {
            ...categoryValues.children,
            children: {
              ...categoryValues.children.children,
              children: categoryValues.children.children.children.find(
                (m: any) => m.uid === category[i]
              ),
            },
          },
        };
      }
    }

    values.category = categoryValues;
    if (textEditorValue) {
      values.details = textEditorValue;
    }
    const key = 'loadingMessage';
    message.loading({ content: 'Adding...', key });
    const formData = new FormData();
    if (values.images?.length > 0) {
      formData.append('images', values?.images[0]?.originFileObj);
      delete values.images;
    }
    formData.append('data', JSON.stringify(values));
    try {
      if (iniValue._id) {
        const res = await updateTips({
          id: iniValue._id,
          data: formData,
        }).unwrap();
        SuccessModal('Successfully Updated');
        message.success('Successfully Updated');
      } else {
        const res = await addTips(formData).unwrap();
        SuccessModal('Successfully added');
        form.resetFields();
        setTextEditorValue('');
        message.success('Successfully added');
      }
    } catch (error: any) {
      ErrorModal(error);
      message.error(error?.message);
    }
    message.destroy(key);
  };

  if (iniValue?._id) {
    const { images, category, ...valueCopy } = iniValue;
    iniValue = valueCopy;
    const categoryArray = [];
    if (category.uid) {
      categoryArray.push(category.uid);
      if (category.children) {
        categoryArray.push(category.children.uid);
        if (category.children.children) {
          categoryArray.push(category.children.children.uid);
          if (category.children.children.children) {
            categoryArray.push(category.children.children.children.uid);
          }
        }
      }
    }
    // iniValue.category = [
    //   '39840451-39ce-4a89-aaa5-70034fe250b8',
    //   's69b898d-7636-417c-91b4-148698341c123',
    //   's69b898d-7636-417c-91b4-148698371c123',
    // ];
    iniValue.category = categoryArray;
  }
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => {
    return (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  };
  const onChange: CascaderProps<Option>['onChange'] = (value) => {
    console.log(value);
  };
  const showConfirm = (name: any, remove: any, type = 'Tips') => {
    confirm({
      title: `Are you sure you want to remove this ${type}?`,
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone.',
      okText: 'Yes, Remove',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        remove(name);
      },
    });
  };
  return (
    <Form
      form={form}
      disabled={readOnly}
      onFinish={handleFinish}
      initialValues={iniValue._id ? iniValue : {}}
      layout="vertical"
      className=""
    >
      <div className="grid grid-cols-1 gap-2">
        <div className="flex items-center gap-2">
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
            className=""
          >
            <Upload
              // action="/upload"
              multiple={false}
              listType="picture-card"
              showUploadList={true}
              maxCount={1}
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
      <Form.Item
        label="Manage Hair Identity"
        name="category"
        rules={[
          {
            required: iniValue._id ? false : true,
            message: 'Please input the category!',
          },
        ]}
      >
        <Cascader
          options={options}
          onChange={onChange}
          placeholder="Please Select Manage Hair Identity"
        />
      </Form.Item>
      <Form.Item
        label="Tip Title"
        name="title"
        rules={[
          {
            required: iniValue._id ? false : true,
            message: 'Please input the title!',
          },
        ]}
      >
        <Input placeholder="Enter your title here" maxLength={1000} />
      </Form.Item>

      {/* <Form.Item
        label="Description"
        name="details"
        rules={[
          {
            required: iniValue._id ? false : true,
            message: 'Please input the title!',
          },
        ]}
      >
        <Input.TextArea placeholder="Describe your articles" rows={8} />
      </Form.Item> */}
      <div>
        <TextEditorNotSetValue
          setTextEditorValue={setTextEditorValue}
          defaultTextEditorValue={iniValue.details}
        />
      </div>
      <div className="mb-2 grid grid-cols-1 gap-2 lg:grid-cols-2">
        <div>
          <fieldset
            style={{
              border: '2px solid #ddd',
              padding: '20px',
              borderRadius: '5px',
            }}
          >
            <legend style={{ fontWeight: 'bold', padding: '0 10px' }}>
              Add Do Tips
            </legend>
            <Form.List name={['tips', 'do']}>
              {(fields, { add, remove }) => (
                <div className="space-y-4">
                  {fields.map(({ key, name, ...restField }, index) => (
                    <div
                      key={key}
                      className="relative rounded-lg border bg-gray-100 p-1"
                    >
                      {/* Parent Input Field (Auto-generate value from label) */}
                      <Form.Item
                        {...restField}
                        name={[name, 'title']}
                        label={`${index + 1}) Tip`}
                        rules={[{ required: true, message: 'Required!' }]}
                      >
                        <Input
                          placeholder="Enter Tips"
                          className="w-full rounded border p-2"
                        />
                      </Form.Item>
                      <Form.Item
                        name={[name, 'serialNumber']}
                        initialValue={index + 1}
                        hidden
                      >
                        <Input />
                      </Form.Item>

                      <Button
                        type="dashed"
                        danger
                        onClick={() => showConfirm(name, remove, 'Tips')}
                        icon={<MinusCircleOutlined />}
                        className="!absolute right-1 top-0 max-w-36 rounded-lg border border-dotted text-red-500"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}

                  {/* Add Parent Button */}
                  <Button
                    type="dashed"
                    block
                    onClick={() => {
                      add({
                        serialNumber: fields.length + 1,
                      });
                    }}
                    icon={<PlusOutlined />}
                    className="mt-2 text-blue-500"
                  >
                    Add
                  </Button>
                </div>
              )}
            </Form.List>
          </fieldset>
        </div>
        <div>
          <fieldset
            style={{
              border: '2px solid #ddd',
              padding: '20px',
              borderRadius: '5px',
            }}
          >
            <legend style={{ fontWeight: 'bold', padding: '0 10px' }}>
              Add Don't Tips
            </legend>
            <Form.List name={['tips', 'doNot']}>
              {(fields, { add, remove }) => (
                <div className="space-y-4">
                  {fields.map(({ key, name, ...restField }, index) => (
                    <div
                      key={key}
                      className="relative rounded-lg border bg-gray-100 p-1"
                    >
                      {/* Parent Input Field (Auto-generate value from label) */}
                      <Form.Item
                        {...restField}
                        name={[name, 'title']}
                        label={`${index + 1}) Don't Tip`}
                        rules={[{ required: true, message: 'Required!' }]}
                      >
                        <Input
                          placeholder="Enter Tips"
                          className="w-full rounded border p-2"
                        />
                      </Form.Item>
                      <Form.Item
                        name={[name, 'serialNumber']}
                        initialValue={index + 1}
                        hidden
                      >
                        <Input />
                      </Form.Item>

                      <Button
                        type="dashed"
                        danger
                        onClick={() => showConfirm(name, remove, 'Tips')}
                        icon={<MinusCircleOutlined />}
                        className="!absolute right-1 top-0 max-w-36 rounded-lg border border-dotted text-red-500"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}

                  {/* Add Parent Button */}
                  <Button
                    type="dashed"
                    block
                    onClick={() => {
                      add({
                        serialNumber: fields.length + 1,
                      });
                    }}
                    icon={<PlusOutlined />}
                    className="mt-2 text-blue-500"
                  >
                    Add
                  </Button>
                </div>
              )}
            </Form.List>
          </fieldset>
        </div>
      </div>

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

export default HairIdentityCreate;
