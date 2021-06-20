import moment from "moment";
import React, { Key } from "react";
import { Appointment, AppointmentsQuery } from "../../generated/graphql";
import AppointmentPill from "./AppointmentPill";

interface Props {
  day: Date;
  appointments: AppointmentsQuery;
  today: string;
  mobileVisibleDay: any;
  setMobileVisibleDay: React.Dispatch<React.SetStateAction<any>>;
}

const DayBox = (props: Props) => {
  return (
    <div
      style={{ width: "14.28%" }}
      className={`transition-all h-13 md:h-28 lg:h-36 text-black p-1`}
      onClick={() => {
        props.setMobileVisibleDay(props.day);
      }}
    >
      <div
        className={`${
          moment(props.day).add(1, "days").isBefore()
            ? "bg-gray-300"
            : "bg-white hover:shadow-md"
        } relative transition-all font-thin h-full py-2 rounded-lg flex align-top text-sm md:text-lg flex-col z-10`}
      >
        <div className="flex justify-center relative">
          {moment(props.day).format("ddd") === "mån" ? (
            <span className="absolute right-2 top-2 font-bold text-xs text-gray-300 rounded-md p-1 hidden md:block md:bg-gray-700">
              {"v. " + moment(props.day).format("WW")}
            </span>
          ) : (
            <></>
          )}
          {moment(props.day).format("LL") === moment().format("LL")
            ? "Idag"
            : moment(props.day).format("LL").split(" ")[0]}
          <div className="absolute flex sm:hidden -bottom-1">
            {props.appointments.appointments.map((appointment, idx) => {
              if (
                moment(appointment.date).format("LL") ==
                  moment(props.day).format("LL") &&
                !moment(props.day).add(1, "days").isBefore()
              ) {
                return (
                  <span
                    key={idx}
                    className="rounded-full h-1 w-1 bg-yellow-600"
                  ></span>
                );
              } else {
                return null;
              }
            })}
          </div>
        </div>
        <div className="flex justify-center overflow-y-scroll">
          <div className="justify-center z-10 w-full">
            {props.appointments?.appointments.map(
              (appointment: any, i: Key) => {
                {
                  if (
                    moment(props.day).format("LL") ===
                      moment(appointment.date).format("LL") &&
                    !moment(props.day).isBefore(props.today)
                  ) {
                    return (
                      <AppointmentPill
                        key={i}
                        day={props.day}
                        appointment={appointment}
                      />
                    );
                  } else {
                    return null;
                  }
                }
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayBox;
