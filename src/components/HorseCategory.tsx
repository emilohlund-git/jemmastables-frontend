import React, { useState } from "react";

interface Props {
  image: String;
  category: String;
}

const HorseCategory = (props: Props) => {
  const [hover, setHover] = useState(true);
  return (
    <div
      onMouseEnter={() => setHover(false)}
      onMouseLeave={() => setHover(true)}
      className="flex flex-row relative px-1 py-2 md:py-0"
    >
      <div
        className="w-1/3"
        style={{
          backgroundImage: `url(${props.image})`,
          backgroundSize: "cover",
          height: "500px",
          width: "345px",
        }}
      >
        <span
          className={`bg-black transition-all duration-300 py-3 absolute z-10 text-xl capitalize text-white w-full text-center ${
            hover
              ? "text-opacity-100 bottom-1/2 bg-opacity-60"
              : "text-opacity-0 bottom-1/3 bg-opacity-0"
          }`}
        >
          {props.category}
        </span>
      </div>
    </div>
  );
};

export default HorseCategory;
