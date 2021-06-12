import React from "react";
import { FaEdit, FaPlus } from "react-icons/fa";
import { Action, Fab } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";

const FloatingButtonCategory = ({ showModal, setShowModal }: any) => {
  return (
    <Fab
      alwaysShowTitle={true}
      icon={<FaPlus />}
      mainButtonStyles={{
        color: "black",
        background: "white",
        outline: "none",
      }}
      style={{ bottom: 24, right: 24, zIndex: 1000 }}
    >
      {!showModal ? (
        <Action
          style={{ background: "#228B22", outline: "none" }}
          text={`Lägg till häst`}
          onClick={() => {
            setShowModal(true);
          }}
        >
          <FaEdit className="text-white" />
        </Action>
      ) : (
        <Action
          style={{ background: "#8b0000", outline: "none" }}
          text={`Stäng ruta`}
          onClick={() => {
            setShowModal(false);
          }}
        >
          <FaEdit className="text-white" />
        </Action>
      )}
    </Fab>
  );
};

export default FloatingButtonCategory;
