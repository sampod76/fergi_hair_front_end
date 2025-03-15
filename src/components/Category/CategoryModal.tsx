import {
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import {
  useAddCategoryMutation,
  useUpdateCategoryMutation,
} from '@redux/features/admin/categoryApi';
import { ErrorModal, SuccessModal } from '@utils/modalHook';
import { Button, Collapse, Form, Input, message, Modal } from 'antd';
import { v4 as uuidv4 } from 'uuid'; // Import UUID generator
const { Panel } = Collapse;
const { confirm } = Modal; // Import confirmation modal
const CategoryModal = ({
  initialValues,
  readOnly = false,
}: {
  initialValues?: any;
  readOnly?: boolean;
}) => {
  let iniValue = { ...initialValues };

  // console.log('🚀 ~ iniValue:', iniValue);
  const [form] = Form.useForm();
  const [addCategory, { isLoading }] = useAddCategoryMutation();
  const [updateCategory, { isLoading: uloading }] = useUpdateCategoryMutation();

  const handleFinish = async (values: any) => {
    console.log('🚀 ~ handleFinish ~ values:', values);
    try {
      const key = 'loadingMessage';
      message.loading({ content: 'Adding to category...', key });
      if (iniValue._id) {
        const res = await updateCategory({
          id: iniValue._id,
          data: values,
        }).unwrap();
        SuccessModal('Successfully Updated');
        message.success('Successfully Updated');
      }
      //  else {
      //   const res = await addCategory(formData).unwrap();
      //   SuccessModal('Successfully added');
      //   form.resetFields();
      //   message.success('Successfully added');
      // }
      message.destroy(key);
    } catch (error: any) {
      console.log('🚀 ~ handleFinish ~ error:', error);
      ErrorModal(error);
      message.error(error?.message);
    }
  };

  const formatLabelToValue = (label: string) => {
    return label
      .trim()
      .replace(/\(/g, ' ') // Replace opening parenthesis with a space
      .replace(/\)/g, '') // Remove closing parenthesis
      .replace(/\//g, '_') // Replace forward slashes with underscores
      .replace(/\s+/g, '_') // Replace spaces with underscores
      .replace(/[^\w_]/g, '') // Remove any other special characters
      .replace(/_+/g, '_') // Ensure no double underscores
      .split('_') // Split into words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
      .join('_'); // Join back with underscores
  };
  const showConfirm = (name: any, remove: any, type = 'Category') => {
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
      initialValues={iniValue._id ? { ...iniValue } : {}}
      layout="vertical"
    >
      <h1 className="pb-2 text-center">
        <span className="w-fit rounded-lg border p-1">{iniValue.label}</span>
      </h1>
      <Form.List name="children">
        {(fields, { add, remove }) => (
          <div className="space-y-4">
            {fields.map(({ key, name, ...restField }, index) => (
              <div
                key={key}
                className="relative rounded-lg border bg-gray-100 p-4"
              >
                {/* Auto-generated UID and Serial Number */}
                <Form.Item
                  name={[name, 'serialNumber']}
                  initialValue={index + 1}
                  hidden
                >
                  <Input />
                </Form.Item>

                <Form.Item name={[name, 'uid']} initialValue={uuidv4()} hidden>
                  <Input />
                </Form.Item>

                {/* Parent Input Field (Auto-generate value from label) */}
                <Form.Item
                  {...restField}
                  name={[name, 'label']}
                  label="Category Label"
                  rules={[{ required: true, message: 'Required!' }]}
                >
                  <Input
                    placeholder="Enter Category Label"
                    className="w-full rounded border p-2"
                    onChange={(e) => {
                      const label = e.target.value;
                      form.setFieldValue(
                        ['children', name, 'value'],
                        formatLabelToValue(label)
                      );
                    }}
                  />
                </Form.Item>

                <Form.Item name={[name, 'value']} hidden>
                  <Input />
                </Form.Item>

                {/* Nested Children */}
                <Form.List name={[name, 'children']}>
                  {(childFields, { add: addChild, remove: removeChild }) => (
                    <div className="ml-6 space-y-4">
                      {childFields.map(
                        (
                          { key: childKey, name: childName, ...childRestField },
                          childIndex
                        ) => (
                          <div
                            key={childKey}
                            className="relative rounded-lg border bg-white p-3"
                          >
                            {/* Auto-generated UID and Serial Number */}
                            <Form.Item
                              name={[childName, 'serialNumber']}
                              initialValue={childIndex + 1}
                              hidden
                            >
                              <Input />
                            </Form.Item>

                            <Form.Item
                              name={[childName, 'uid']}
                              initialValue={uuidv4()}
                              hidden
                            >
                              <Input />
                            </Form.Item>

                            <Form.Item
                              {...childRestField}
                              name={[childName, 'label']}
                              label="Child Label"
                              rules={[{ required: true, message: 'Required!' }]}
                            >
                              <Input
                                placeholder="Enter Child Label"
                                className="w-full rounded border p-2"
                                onChange={(e) => {
                                  const label = e.target.value;
                                  form.setFieldValue(
                                    [
                                      'children',
                                      name,
                                      'children',
                                      childName,
                                      'value',
                                    ],
                                    formatLabelToValue(label)
                                  );
                                }}
                              />
                            </Form.Item>

                            <Form.Item name={[childName, 'value']} hidden>
                              <Input />
                            </Form.Item>

                            {/* Remove Child Button with Confirmation */}
                            <button
                              onClick={() =>
                                showConfirm(childName, removeChild, 'Child')
                              }
                              className="!absolute right-1 top-0 mr-2 mt-2 max-w-32 rounded-lg border border-dotted border-blue-400 p-1 text-red-500"
                            >
                              <MinusCircleOutlined /> Remove Child
                            </button>
                          </div>
                        )
                      )}

                      {/* Add Child Button */}
                      <div className="flex items-center justify-center">
                        <Button
                          type="dashed"
                          onClick={() =>
                            addChild({
                              serialNumber: childFields.length + 1,
                              uid: uuidv4(),
                              label: '',
                              value: '',
                            })
                          }
                          block
                          icon={<PlusOutlined />}
                          className="!mx-auto mt-2 !max-w-80 text-blue-500"
                        >
                          Add Child
                        </Button>
                      </div>
                    </div>
                  )}
                </Form.List>

                {/* Remove Parent Button with Confirmation */}
                <Button
                  type="dashed"
                  danger
                  onClick={() => showConfirm(name, remove, 'Category')}
                  icon={<MinusCircleOutlined />}
                  className="!absolute right-1 top-0 mr-3 mt-2 max-w-36 rounded-lg border border-dotted p-1 text-red-500"
                >
                  Remove Category
                </Button>
              </div>
            ))}

            {/* Add Parent Button */}
            <Button
              type="dashed"
              onClick={() =>
                add({
                  serialNumber: fields.length + 1,
                  uid: uuidv4(),
                  label: '',
                  value: '',
                  children: [],
                })
              }
              block
              icon={<PlusOutlined />}
              className="mt-2 text-blue-500"
            >
              Add Category
            </Button>
          </div>
        )}
      </Form.List>

      <div className="flex items-center justify-center">
        <Form.Item style={{ marginTop: 20 }}>
          <Button
            loading={uloading}
            className="!min-w-40"
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default CategoryModal;
