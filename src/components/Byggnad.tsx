import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Byggnad = (props : any) => {
  const [hover, setHover] = useState(true);
  const [loading, setLoading] = useState(true);
  return (
    <div
      onMouseEnter={() => setHover(false)}
      onMouseLeave={() => setHover(true)}
      className={`transition-all duration-500 cursor-pointer relative w-full md:w-1/2 flex justify-center align-middle h-auto px-1`}
    >
      <Link href={props.path}>
        <a>
          <span
            className={`bg-black transition-all duration-300 py-3 absolute z-10 text-xl capitalize text-white w-full text-center ${
              hover
                ? "text-opacity-100 bottom-1/2 bg-opacity-60"
                : "text-opacity-0 bottom-1/3 bg-opacity-0"
            }`}
          >
            {props.label}
          </span>
          <Image
            loading="eager"
            width={675}
            height={500}
            src={props.image}
          />
        </a>
      </Link>
    </div>
  );
};

export default Byggnad;
