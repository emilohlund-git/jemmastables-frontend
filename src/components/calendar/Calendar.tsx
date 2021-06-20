import moment from "moment";
import React, { Key, useEffect, useState } from "react";
import { CalendarOutlined } from "@ant-design/icons";
import {
  AppointmentsQuery,
  useAppointmentsQuery,
  useUserQuery,
} from "../../generated/graphql";
import { getDaysInMonth } from "../../utils/calendar/getDaysInMonth";
import FloatingButtonCalendar from "../FloatingButtonCalendar";
import DayBox from "./DayBox";
moment.locale("sv");

const Calendar: React.FC<{}> = () => {
  const { data, loading } = useAppointmentsQuery();
  const { data: userData, loading: userLoading } = useUserQuery();
  const today = moment().format("MM-DD-YYYY");
  const [currentMonth, setCurrentMonth] = useState(moment(new Date()));
  const [days, setDays] = useState(
    getDaysInMonth(
      parseInt(moment(currentMonth).subtract(1, "month").format("MM")),
      parseInt(moment().format("yy"))
    )
  );
  const [mobileVisibleDay, setMobileVisibleDay] = useState(null);

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
        <p className="mx-5 text-xl">
          {moment(currentMonth).format("MMMM").split("")[0].toUpperCase() +
            moment(currentMonth)
              .format("MMMM")
              .slice(1, moment(currentMonth).format("MMMM").length)}
        </p>
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
              {moment(day).format("dddd").split("")[0].toUpperCase() +
                moment(day)
                  .format("dddd")
                  .split("")
                  .slice(1, moment(day).format("dddd").split("").length)
                  .join("")}
            </div>
            <div
              style={{ width: "14.28%" }}
              className="text-black text-lg flex sm:hidden justify-center"
            >
              {moment(day).format("dddd").split("")[0].toUpperCase() +
                moment(day).format("dddd").slice(1, 3)}
            </div>
          </div>
        ))}
      </div>
      <div className="w-full flex flex-row flex-wrap">
        {days.map((day, i) => (
          <DayBox
            key={i}
            day={day}
            appointments={data as AppointmentsQuery}
            today={today}
            mobileVisibleDay={mobileVisibleDay}
            setMobileVisibleDay={setMobileVisibleDay}
          />
        ))}
      </div>
      <hr className="my-5" />
      {userData?.user ? <FloatingButtonCalendar /> : <></>}
      <div className="flex flex-col mx-1 sm:hidden">
        {data?.appointments.map((appointment, idx) => {
          if (moment(mobileVisibleDay).format("YYYY-MM-DD") == moment(appointment.date).format("YYYY-MM-DD")) {
            if (!moment(appointment.date).add(1, "days").isBefore(moment())) {
              return (
                <>
                <p key={idx} className="text-black text-2xl font-thin mb-3 ml-3">{moment(appointment.date).format("LL")}</p>
                <div className="flex text-black bg-white shadow-sm my-1">
                  <div className="flex align-middle bg-gray-100 py-4 px-5">
                    <CalendarOutlined className="text-lg" />
                  </div>
                  <div className="ml-3 py-4 flex align-middle">
                    <div
                      className="flex flex-col"
                      style={{ lineHeight: "15px" }}
                    >
                      <span className="font-bold text-lg">
                      {moment(appointment.from).format("HH:mm") +
                          " till " +
                          moment(appointment.to).format("HH:mm") + " " + appointment.type}
                      </span>
                    </div>
                  </div>
                </div>
                </>
              );
            } else {
              return null;
            }
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default Calendar;
