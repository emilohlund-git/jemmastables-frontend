import React from "react";
import Byggnad from "./Byggnad";
import byggnader from "../config/byggnader";

const Byggnader = () => {
  return (
    <>
      {byggnader.map((byggnad, idx) => {
        return <Byggnad key={idx} path={byggnad.path} image={byggnad.image} label={byggnad.label} />;
      })}
    </>
  );
};

export default Byggnader;
