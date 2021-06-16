import moment from "moment";
import React, { Key, useState } from "react";
import { AppointmentsQuery } from "../../generated/graphql";
import AddAppointmentModal from "./AddAppointmentModal";
import AppointmentPill from "./AppointmentPill";

interface Props {
  day: Date;
  appointments: AppointmentsQuery;
}

const DayBox = (props: Props) => {
  const [isPreviousDate, _] = useState(
    moment(props.day).add(1, "days").isBefore()
  );

  return (
    //FIXME: Fix CSS, modal popping up when clicking appointment pills. Should only popup clicking overlaying div.
    <div
      style={{ width: "14.28%" }}
      className={`transition-all h-13 md:h-28 lg:h-36 text-black p-1`}
    >
      <div
        className={`${
          moment(props.day).add(1, "days").isBefore()
            ? "bg-gray-300"
            : "bg-white hover:shadow-md"
        } transition-all font-thin h-full py-2 rounded-lg flex align-top text-sm md:text-lg flex-col z-10`}
      >
        <div className="flex justify-center">
          {moment(props.day).format("LL") === moment().format("LL")
            ? "Idag"
            : moment(props.day).format("LL").split(" ")[0]}
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col justify-center align-middle">
            {props.appointments?.appointments.map(
              (appointment: any, i: Key) => {
                {
                  if (
                    moment(props.day).format("LL") ===
                    moment(appointment.date).format("LL")
                  ) {
                    return (
                      <div key={i}>
                        {!isPreviousDate ? (
                          <AppointmentPill
                            day={props.day}
                            appointment={appointment}
                          />
                        ) : (
                          <></>
                        )}
                      </div>
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
