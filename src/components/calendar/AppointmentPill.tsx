import React from "react";
import {
  Appointment,
  useUpdateAppointmentMutation,
} from "../../generated/graphql";

interface Props {
  appointment: Appointment;
  day: Date;
}

const AppointmentPill = (props: Props) => {
  const [book] = useUpdateAppointmentMutation({
    variables: {
      id: props.appointment.id,
      booked: true,
    },
  });
  return (
    <div
      onClick={async () => {
        const response = await book();
        console.log(response);
      }}
      className={`transition-all hidden sm:flex w-22 rounded-lg ${
        props.appointment.type === "ridlektion"
          ? "bg-red-300 pointer-events-none"
          : ""
      } ${
        props.appointment.type === "öppen" ? "bg-green-300" : ""
      } text-sm shadow ${
        props.appointment.booked
          ? "bg-gray-400 bg-opacity-30 pointer-events-none"
          : "bg-gray-50 cursor-pointer hover:bg-gray-100"
      }  my-1 py-1 px-2`}
    >
      {props.appointment.from}-{props.appointment.to}
    </div>
  );
};

export default AppointmentPill;
