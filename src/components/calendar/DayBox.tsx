import React from "react";
import moment from "moment";

interface Props {
  day: Date;
}

const DayBox = (props: Props) => {
  return (
    <div style={{ width: "14.28%" }} className={`h-13 md:h-28 lg:h-36 text-black p-1`}>
      <div
        className={`${
          moment(props.day).add(1, "days").isBefore()
            ? "bg-gray-300"
            : "bg-white hover:shadow-md"
        } transition-all font-thin h-full py-2 rounded-lg flex justify-center text-sm md:text-lg`}
      >
        {moment(props.day).format("LL") === moment().format("LL")
          ? "Idag"
          : moment(props.day).format("LL").split(" ")[0]}
      </div>
    </div>
  );
};

export default DayBox;
