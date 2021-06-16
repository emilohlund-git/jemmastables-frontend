import { Button, DatePicker, Form, Modal, Radio, TimePicker } from "antd";
import locale from "antd/lib/date-picker/locale/sv_SE";
import "moment/locale/sv";
import { Store } from "rc-field-form/lib/interface";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useCreateAppointmentMutation } from "../../generated/graphql";

interface Props {
  setVisible: Dispatch<SetStateAction<boolean>>;
  visible: boolean;
}

const AddAppointmentModal = (props: Props) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [createAppointment] = useCreateAppointmentMutation();
  const [disabled, setDisabled] = useState(false);

  const handleOk = async (values: Store) => {
    setConfirmLoading(true);
    const { errors } = await createAppointment({
      variables: {
        input: {
          from: values.times[0],
          to: values.times[1],
          date: values.date,
          type: values.type,
          booked: false,
          bookedBy: ''
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
      setConfirmLoading(false);
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
      <Form onFinish={handleOk} layout="vertical">
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
            <Radio.Group buttonStyle="solid">
              <Radio.Button
                value="ridlektion"
                onChange={() => {
                  setDisabled(true);
                }}
              >
                Ridlektion
              </Radio.Button>
              <Radio.Button
                value="självhushållning"
                onChange={() => {
                  setDisabled(false);
                }}
              >
                Självhushållning
              </Radio.Button>
              <Radio.Button
                value="öppen"
                onChange={() => {
                  setDisabled(false);
                }}
              >
                Öppen bana
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Välj tider"
            name="times"
            rules={[{ required: !disabled, message: "Ange ett tidsintervall" }]}
          >
            <TimePicker.RangePicker
              disabled={disabled}
              className="w-full"
              placeholder={["Välj starttid", "Välj sluttid"]}
              format="HH:mm"
              minuteStep={10}
              hideDisabledOptions={true}
              disabledHours={() => [0, 1, 2, 3, 4, 5, 22, 23]}
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
