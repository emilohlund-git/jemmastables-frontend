import moment from "moment";
import React, { Key, useEffect, useState } from "react";
import {
  AppointmentsQuery,
  useAppointmentsQuery,
  useCreateAppointmentMutation,
} from "../../generated/graphql";
import DayBox from "./DayBox";
import { getDaysInMonth } from "./utils/getDaysInMonth";
moment.locale("sv");

const Calendar: React.FC<{}> = () => {
  const [create] = useCreateAppointmentMutation();

  const { data, loading } = useAppointmentsQuery();

  const [currentMonth, setCurrentMonth] = useState(moment(new Date()));
  const [days, setDays] = useState(
    getDaysInMonth(
      parseInt(moment(currentMonth).subtract(1, "month").format("MM")),
      parseInt(moment().format("yy"))
    )
  );

  const daysInWeek: String[] = [];

  useEffect(() => {
    setDays(
      getDaysInMonth(
        parseInt(moment(currentMonth).subtract(1, "month").format("MM")),
        parseInt(moment(currentMonth).subtract(1, "month").format("yy"))
      )
    );
  }, [currentMonth]);

  for (let i = 0; i < 7; i++) {
    daysInWeek.push(
      moment(moment().add(5, "days")).add(i, "days").format("ddd")
    );
  }

  return (
    <div className="flex flex-col py-10">
      <div className="text-black flex justify-center relative mb-10">
        <button
          onClick={() => {
            if (!moment(currentMonth).isBefore()) {
              setCurrentMonth(moment(currentMonth).subtract(1, "month"));
            }
          }}
          className={`absolute mr-40 px-2 text-xl font-bold ${
            !moment(currentMonth).isBefore()
              ? "bg-gray-300 text-gray-500"
              : "bg-gray-200 text-gray-400 cursor-default"
          } rounded-md shadow outline-none focus:outline-none`}
        >
          {"<"}
        </button>
        <p className="mx-5 text-xl">{moment(currentMonth).format("MMMM")}</p>
        <button
          onClick={() => {
            if (
              parseInt(moment(currentMonth).format("MM")) -
                parseInt(moment().format("MM")) <
              3
            ) {
              setCurrentMonth(moment(currentMonth).add(1, "month"));
            }
          }}
          className={`absolute ml-40 px-2 text-xl font-bold ${
            parseInt(moment(currentMonth).format("MM")) -
              parseInt(moment().format("MM")) <
            3
              ? "bg-gray-300 text-gray-500"
              : "bg-gray-200 text-gray-400 cursor-default"
          } rounded-md shadow outline-none focus:outline-none`}
        >
          {">"}
        </button>
      </div>
      <div className="flex mb-2">
        {days.slice(0, 7).map((day: Date, i: Key) => (
          <div key={i} className="w-full flex justify-center">
            <div
              style={{ width: "14.28%" }}
              className="text-black text-lg hidden sm:flex justify-center"
              key={i}
            >
              {moment(day).format("dddd")}
            </div>
            <div
              style={{ width: "14.28%" }}
              className="text-black text-lg flex sm:hidden justify-center"
            >
              {moment(day).format("dddd").slice(0, 3)}
            </div>
          </div>
        ))}
      </div>
      <div className="w-full flex flex-row flex-wrap">
        {days.map((day, i) => (
          <DayBox key={i} day={day} appointments={data as AppointmentsQuery} />
        ))}
      </div>
    </div>
  );
};

export default Calendar;
