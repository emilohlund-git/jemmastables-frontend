import React from "react";
import { useUpdateAppointmentMutation } from "../../generated/graphql";

const Appointment = ({ props }: any) => {
  const [book] = useUpdateAppointmentMutation({
    variables: {
      id: props.id,
      booked: true,
    },
  });
  return (
    <div
      onClick={async () => {
        const response = await book();
        console.log(response);
      }}
      className="cursor-pointer transition-all hidden sm:flex w-22 rounded-lg text-sm shadow bg-gray-50 hover:bg-gray-100 my-1 py-1 px-2"
    >
      {props.from}-{props.to}
    </div>
  );
};

export default Appointment;
