import React, { useState } from "react";

const HorseInfo = ({ h }: any) => {
  const [hover, setHover] = useState(true);

  return (
    <div
      onMouseEnter={() => setHover(false)}
      onMouseLeave={() => setHover(true)}
      className="flex flex-row relative px-1"
    >
      <div
        className="w-1/3"
        style={{
          backgroundImage: `url(${h?.image})`,
          backgroundSize: "cover",
          height: "500px",
          width: "30vw",
        }}
      ></div>
      <div className="ml-5 text-xl">
        <div>
          <p>Ägare: {h?.owner}</p>
          <p>Efter: {h?.after}</p>
          <p>Födelseår: {h?.birthYear}</p>
          <p>Kön: {h?.gender}</p>
          <p>Färg: {h?.color}</p>
        </div>
      </div>
    </div>
  );
};

export default HorseInfo;
