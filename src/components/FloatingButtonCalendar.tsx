import { message, Upload } from "antd";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaPlus, FaPlusCircle } from "react-icons/fa";
import { Action, Fab } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";
import {
  useDeleteAppointmentMutation,
  useUpdateHorseMutation,
} from "../generated/graphql";
import { putStorageItem } from "../utils/firebase/putStorageItem";
import AddAppointmentModal from "./calendar/AddAppointmentModal";

interface Props {}

const FloatingButtonCalendar = (props: Props) => {
  const router = useRouter();
  const { name } = router.query;

  const [remove] = useDeleteAppointmentMutation();
  const [visible, setVisible] = useState(false);

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
      <Action
        style={{ background: "#228B22", outline: "none", paddingTop: "3px" }}
        text={`Lägg till tid`}
        onClick={() => {
          setVisible(true);
        }}
      >
        <FaPlusCircle className="text-white text-lg" />
      </Action>
      <AddAppointmentModal visible={visible} setVisible={setVisible} />
    </Fab>
  );
};

export default FloatingButtonCalendar;
