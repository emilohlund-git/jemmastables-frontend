import { Tooltip } from "antd";
import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import {
  Appointment,
  useDeleteAppointmentMutation,
} from "../../generated/graphql";
import BookAppointmentModal from "./BookAppointmentModal";
import moment from "moment";

interface Props {
  appointment: Appointment;
  day: Date;
}

const AppointmentPill = (props: Props) => {
  const [remove] = useDeleteAppointmentMutation();
  const [visible, setVisible] = useState(false);

  return (
    <Tooltip
      title={
        <FaTrashAlt
          onClick={async () => {
            await remove({
              variables: { id: props.appointment.id },
              update: (cache) => {
                cache.evict({ fieldName: "appointments" });
              },
            });
          }}
          className="text-white text-lg cursor-pointer"
        />
      }
    >
      <div
        className={`transition-all hidden sm:flex w-22 rounded-lg ${
          props.appointment.type === "ridlektion" ? "bg-red-300" : ""
        } ${
          props.appointment.type === "öppen" ? "bg-green-300" : ""
        } text-sm shadow ${
          props.appointment.booked
            ? "bg-gray-400 bg-opacity-30"
            : "bg-gray-50 cursor-pointer hover:bg-opacity-70"
        }  my-1 py-1 px-2`}
        onClick={() => {
          setVisible(true);
        }}
      >
        {moment(props.appointment.from).format("HH:mm")}-{moment(props.appointment.to).format("HH:mm")}
      </div>
      <BookAppointmentModal
        visible={visible}
        setVisible={setVisible}
        appointment={props.appointment}
      />
    </Tooltip>
  );
};

export default AppointmentPill;
