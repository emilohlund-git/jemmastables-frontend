import React, { useEffect, useState } from "react";
import moment from "moment";
moment.locale("sv");

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(moment(new Date()));
  const [days, setDays] = useState(
    getDaysInMonth(
      parseInt(moment(currentMonth).subtract(1, "month").format("MM")),
      parseInt(moment().format("yy"))
    )
  );

  let daysInWeek = [];

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
          onClick={() =>
            setCurrentMonth(moment(currentMonth).subtract(1, "month"))
          }
          className="absolute mr-40 px-2 text-xl font-bold bg-gray-300 rounded-md text-gray-800"
        >
          {"<"}
        </button>
        <p className="mx-5 text-xl">{moment(currentMonth).format("MMMM")}</p>
        <button
          onClick={() => setCurrentMonth(moment(currentMonth).add(1, "month"))}
          className="absolute ml-40 px-2 text-xl font-bold bg-gray-300 rounded-md text-gray-800"
        >
          {">"}
        </button>
      </div>
      <div className="flex mb-2">
        {days.map((day, i): any => {
          if (i < 7) {
            return (
              <div
                style={{ width: "14.28%" }}
                className="text-black text-lg flex justify-center"
                key={i}
              >
                {moment(day).format("dddd")}
              </div>
            );
          }
        })}
      </div>
      <div className="w-full flex flex-row flex-wrap">
        {days ? (
          <>
            {days.map((day, i) => {
              console.log(day, moment(day).isBefore());
              return (
                <div
                  key={i}
                  style={{ width: "14.28%" }}
                  className={`h-36 text-black p-1`}
                >
                  <div
                    className={`${
                      moment(day).add(1, "days").isBefore()
                        ? "bg-gray-300"
                        : "bg-white hover:shadow-md"
                    } transition-all font-thin h-full py-2 rounded-lg flex justify-center text-lg`}
                  >
                    {moment(day).format("LL") === moment().format("LL")
                      ? "Dagens datum"
                      : moment(day).format("LL").split(" ")[0]}
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

/**
 * @param {int} The month number, 0 based
 * @param {int} The year, not zero based, required to account for leap years
 * @return {Date[]} List with date objects for each day of the month
 */
function getDaysInMonth(month: number, year: number) {
  var date = new Date(year, month, 1);
  var days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

export default Calendar;
