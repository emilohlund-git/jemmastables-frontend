import { DeleteOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import moment from "moment";
import React, { useState } from "react";
import {
  Appointment,
  useDeleteAppointmentMutation,
  useUserQuery,
} from "../../generated/graphql";
import BookAppointmentModal from "./BookAppointmentModal";

interface Props {
  appointment: Appointment;
  day: Date;
}

const AppointmentPill = (props: Props) => {
  const [remove] = useDeleteAppointmentMutation();
  const [visible, setVisible] = useState(false);
  const [hover, setHover] = useState(false);
  const { data, loading } = useUserQuery();

  return (
    <Popover
      placement="topLeft"
      content={
        data?.user ? (
          <DeleteOutlined
            onClick={async () => {
              await remove({
                variables: { id: props.appointment.id },
                update: (cache) => {
                  cache.evict({ fieldName: "appointments" });
                },
              });
            }}
            className="text-black text-lg cursor-pointer"
          />
        ) : (
          <p>
            {props.appointment.bookedBy !== ""
              ? "Tiden är bokad. " + props.appointment.type
              : "Tiden är ledig!"}
          </p>
        )
      }
      overlayClassName="z-10"
    >
      <div
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
        className={`transition-all hidden sm:flex w-22 rounded-lg ${
          props.appointment.type === "ridlektion" ? "bg-red-300" : ""
        } ${
          props.appointment.type === "öppen" ? "bg-green-300" : ""
        } text-sm shadow ${
          props.appointment.booked
            ? "bg-gray-400 bg-opacity-30"
            : "bg-gray-50 cursor-pointer hover:bg-opacity-70"
        }  my-1 py-1 px-2 ${hover ? "bg-gray-200" : ""}`}
        onClick={() => {
          if (props.appointment.bookedBy == "") {
            setVisible(true);
          }
        }}
      >
        {moment(props.appointment.from).format("HH:mm")}-
        {moment(props.appointment.to).format("HH:mm")}
      </div>
      <BookAppointmentModal
        visible={visible}
        setVisible={setVisible}
        appointment={props.appointment}
      />
    </Popover>
  );
};

export default AppointmentPill;
