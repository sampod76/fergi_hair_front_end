import { useAddCategoryMutation } from '@redux/features/admin/categoryApi';
import { useUpdateSubscriptionsMutation } from '@redux/features/admin/subscriptionsApi';
import { ErrorModal, SuccessModal } from '@utils/modalHook';
import { Button, Col, Collapse, Divider, Form, InputNumber, Row } from 'antd';
const { Panel } = Collapse;
const SubscriptionsCreateModal = ({
  initialValues,
  readOnly = false,
}: {
  initialValues?: any;
  readOnly?: boolean;
}) => {
  let iniValue = { ...initialValues };

  const [form] = Form.useForm();
  const [addCategory, { isLoading }] = useAddCategoryMutation();
  const [updateCategory, { isLoading: uloading }] =
    useUpdateSubscriptionsMutation();

  const handleFinish = async (values: any) => {
    console.log('🚀 ~ handleFinish ~ values:', values);
    try {
      if (iniValue._id) {
        // return;
        const res = await updateCategory({
          id: iniValue._id,
          data: values,
        }).unwrap();
        SuccessModal('Successfully Updated');
      } else {
        return;
        const res = await addCategory(values).unwrap();
        SuccessModal('Successfully added');
        form.resetFields();
      }
    } catch (error) {
      ErrorModal(error);
    }
  };

  if (iniValue) {
    const { image, files, ...valueCopy } = iniValue;
    iniValue = valueCopy;
  }

  return (
    <Form
      form={form}
      onFinish={handleFinish}
      initialValues={iniValue._id ? { ...iniValue } : {}}
      layout="vertical"
    >
      <Divider orientation="center">Plan Details</Divider>
      <Row gutter={[16, 16]} style={{ width: '100%' }}>
        <Col xs={24} sm={24} md={12}>
          <Form.Item
            label="Price"
            name="price"
            // rules={[{ required: true, message: 'Please enter the price' }]}
          >
            <InputNumber
              min={0}
              type="number"
              style={{ width: '100%' }}
              placeholder="Enter price"
            />
          </Form.Item>
        </Col>
        {/*   <Col xs={24} sm={24} md={12}>
          <Form.Item
            label="Total Member Add"
            name="totalMemberAdd"
            rules={[
              {
                required: true,
                message: 'Please enter the total members allowed',
              },
            ]}
          >
            <InputNumber
              type="number"
              min={0}
              style={{ width: '100%' }}
              placeholder="Enter total members allowed"
            />
          </Form.Item>
        </Col> */}

        {/* <Divider orientation="center">Features</Divider>

      <Form.List name="features">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <Space
                key={field.key}
                align="baseline"
                style={{ display: 'flex', marginBottom: '8px' }}
              >
                <Form.Item
                  {...field}
                  name={[field.name, 'name']}
                  //@ts-ignore
                  fieldKey={[field.fieldKey, 'name']}
                  rules={[
                    {
                      required: true,
                      message: 'Please enter the feature name',
                    },
                  ]}
                >
                  <Input
                    className="!w-full !min-w-96"
                    placeholder="Feature name"
                  />
                </Form.Item>
                <Form.Item
                  {...field}
                  name={[field.name, 'available']}
                  valuePropName="checked"
                  //@ts-ignore
                  fieldKey={[field.fieldKey, 'available']}
                >
                  <Checkbox>Available</Checkbox>
                </Form.Item>
                <MinusCircleOutlined
                  onClick={() => remove(field.name)}
                  style={{ color: 'red' }}
                />
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                icon={<PlusOutlined />}
              >
                Add Feature
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List> */}
      </Row>
      <Form.Item className="mt-6 flex items-center justify-center">
        <Button loading={uloading} type="primary" htmlType="submit">
          Save Changes
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SubscriptionsCreateModal;
