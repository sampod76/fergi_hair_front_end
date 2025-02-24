import { useUpdateOrderMutation } from '@redux/features/admin/orderApi';
import { DateFormatterDayjs } from '@utils/DateFormateClass';
import { Button, DatePicker, Form, message } from 'antd';
import dayjs from 'dayjs';

export default function EditOrderTime({ order }: any) {
  const [updateOrder, { isLoading }] = useUpdateOrderMutation();
  console.log('🚀 ~ EditOrderTime ~ order:', order);
  const [form] = Form.useForm(); // Create a form instance

  const onFinish = async (values: any) => {
    try {
      // Call updateOrder mutation here
      const response = await updateOrder({
        id: order._id,
        data: {
          expiryDate: new DateFormatterDayjs(values.expiryDate).format(
            'MMM D, YYYY'
          ),
        },
      }).unwrap();
      console.log(response);
      message.success('Update successfully!');
    } catch (error: any) {
      console.error('Update Error:', error);
      message.error(error?.message);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h2>Edit Expire timeline</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          expiryDate: dayjs(order.expiryDate, 'YYYY-MM-DD'), // Default: today
        }}
      >
        <Form.Item
          name="expiryDate"
          label="Select Date"
          rules={[{ required: true, message: 'Please select a date!' }]}
        >
          <DatePicker format="DD/MM/YYYY" />
        </Form.Item>

        <Form.Item>
          <Button loading={isLoading} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
