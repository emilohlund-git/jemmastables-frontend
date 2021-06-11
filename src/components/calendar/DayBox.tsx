import React from "react";
import moment from "moment";
import Appointment from "./Appointment";
import { useAppointmentsQuery } from "../../generated/graphql";
import { format } from "path/posix";

interface Props {
  day: Date;
}

const DayBox = (props: Props) => {
  const { data, loading } = useAppointmentsQuery();
  return (
    <div
      style={{ width: "14.28%" }}
      className={`transition-all h-13 md:h-28 lg:h-36 text-black p-1`}
    >
      <div
        className={`${
          moment(props.day).add(1, "days").isBefore()
            ? "bg-gray-300"
            : "bg-white hover:shadow-md"
        } transition-all font-thin h-full py-2 rounded-lg flex align-top text-sm md:text-lg flex-col`}
      >
        <div className="flex justify-center">
          {moment(props.day).format("LL") === moment().format("LL")
            ? "Idag"
            : moment(props.day).format("LL").split(" ")[0]}
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col justify-center align-middle">
            {data?.appointments.map((appointment: any, i) => {
              {
                if (
                  moment(props.day).format("LL") ===
                  moment(appointment.date).format("LL")
                ) {
                  return <Appointment key={i} props={appointment} />;
                } else {
                  return null;
                }
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayBox;
