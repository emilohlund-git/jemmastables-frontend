import { Modal } from "antd";
import moment from "moment";
import "moment/locale/sv";
import { Store } from "rc-field-form/lib/interface";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useAppointmentsQuery } from "../../generated/graphql";

interface Props {
  setVisible: Dispatch<SetStateAction<boolean>>;
  visible: boolean;
}

const AddAppointmentModal = (props: Props) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { data, loading } = useAppointmentsQuery();
  const handleOk = async (values: Store) => {
    setConfirmLoading(true);
  };

  const handleCancel = () => {
    setTimeout(() => {
      props.setVisible(false);
    }, 50);
  };

  return (
    <Modal
      title="Alla bokade tider"
      visible={props.visible}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      footer={null}
    >
      {data?.appointments.map((appointment, idx) => {
        {
          if (appointment.bookedBy !== "") {
            return (
              <p key={idx}>
                {moment(appointment.date).format("LL") +
                  " - " +
                  appointment.bookedBy}
              </p>
            );
          } else {
            return null;
          }
        }
      })}
    </Modal>
  );
};

export default AddAppointmentModal;
