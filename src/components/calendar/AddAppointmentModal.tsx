import { Modal, Select, TimePicker, DatePicker, Form, Button } from "antd";
import React, { Dispatch, SetStateAction, useState } from "react";
import moment from "moment";
import "moment/locale/sv";
import locale from "antd/lib/date-picker/locale/sv_SE";
import {
  useCreateAppointmentMutation,
  useUpdateAppointmentMutation,
} from "../../generated/graphql";

interface Props {
  setVisible: Dispatch<SetStateAction<boolean>>;
  visible: boolean;
  day: Date;
}

const AddAppointmentModal = (props: Props) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [createAppointment] = useCreateAppointmentMutation();

  const { Option } = Select;

  const handleOk = async (values: any) => {
    setConfirmLoading(true);

    const { errors } = await createAppointment({
      variables: {
        input: {
          from: values.times[0].format("HH:mm"),
          to: values.times[1].format("HH:mm"),
          date: values.date,
          booked: false,
        },
      },
      update: (cache) => {
        cache.evict({ fieldName: "appointments" });
      },
    });
    if (!errors) {
      props.setVisible(false);
      setConfirmLoading(false);
    } else {
      console.log(errors);
    }
  };

  const handleCancel = () => {
    setTimeout(() => {
      props.setVisible(false);
    }, 50);
  };

  return (
    <Modal
      title="Lägg till tid"
      visible={props.visible}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        initialValues={{
          date: moment(props.day),
        }}
        onFinish={handleOk}
        layout="vertical"
      >
        <div className="flex flex-col">
          <Form.Item
            label="Datum"
            name="date"
            rules={[{ required: true, message: "Ange ett datum" }]}
          >
            <DatePicker className="w-full" locale={locale} />
          </Form.Item>
          <Form.Item
            label="Typ av tid"
            name="type"
            rules={[{ required: true, message: "Ange typ av tid" }]}
          >
            <Select
              showSearch
              placeholder="Välj typ av tid"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="tom">Tom</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Välj tider"
            name="times"
            rules={[{ required: true, message: "Ange ett tidsintervall" }]}
          >
            <TimePicker.RangePicker
              className="w-full"
              placeholder={["Välj starttid", "Välj sluttid"]}
              format="HH:mm"
              minuteStep={10}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" loading={confirmLoading} htmlType="submit">
              Lägg till
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default AddAppointmentModal;
