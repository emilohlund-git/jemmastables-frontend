import {
  Button,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  TimePicker,
} from "antd";
import locale from "antd/lib/date-picker/locale/sv_SE";
import "moment/locale/sv";
import moment from "moment";
import { Store } from "rc-field-form/lib/interface";
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Appointment,
  useUpdateAppointmentMutation,
} from "../../generated/graphql";

interface Props {
  setVisible: Dispatch<SetStateAction<boolean>>;
  visible: boolean;
  appointment: Appointment;
}

const BookAppointmentModal = (props: Props) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [book] = useUpdateAppointmentMutation();
  const [disabled, setDisabled] = useState(false);

  const handleOk = async (values: Store) => {
    setConfirmLoading(true);
    const { errors } = await book({
      variables: {
        id: props.appointment.id,
        bookedBy: values.email,
        booked: true,
      },
      update: (cache) => {
        cache.evict({ fieldName: "appointments" });
      },
    });
    if (!errors) {
      message.success("Tiden är bokad!");
    }
    setConfirmLoading(false);
    props.setVisible(false);
  };

  const handleCancel = () => {
    setTimeout(() => {
      props.setVisible(false);
    }, 50);
  };

  return (
    <Modal
      title="Boka tid"
      visible={props.visible}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      footer={null}
    >
      <Form onFinish={handleOk} layout="vertical" initialValues={{
        date: moment(props.appointment.date),
        times: [
          moment(props.appointment.from),
          moment(props.appointment.to),
        ]
      }}>
        <div className="flex flex-col">
          <Form.Item
            label="Datum"
            name="date"
          >
            <DatePicker
              disabled={true}
              className="w-full"
              locale={locale}
            />
          </Form.Item>
          <Form.Item
            label="Tider"
            name="times"  
          >
            <TimePicker.RangePicker
              disabled={true}
              className="w-full"
              placeholder={["Välj starttid", "Välj sluttid"]}
              format="HH:mm"
              minuteStep={10}
              hideDisabledOptions={true}
              disabledHours={() => [0, 1, 2, 3, 4, 5, 22, 23]}
            />
          </Form.Item>
          <Form.Item
            label="Namn"
            name="name"
            rules={[{ required: !disabled, message: "Ange ditt namn" }]}
          >
            <Input placeholder="Namn" />
          </Form.Item>
          <Form.Item
            label="Epost"
            name="email"
            rules={[{ required: !disabled, message: "Ange din e-postadress" }]}
          >
            <Input placeholder="Namn" type="email"/>
          </Form.Item>
          <Form.Item>
            <Button type="primary" loading={confirmLoading} htmlType="submit">
              Boka
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default BookAppointmentModal;
