import { CalendarOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { Action, Fab } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";
import AddAppointmentModal from "./calendar/AddAppointmentModal";
import AllBookedTimesModal from "./calendar/AllBookedTimesModal";

const FloatingButtonCalendar = () => {
  const [visible, setVisible] = useState(false);
  const [visibleAllBookedTimes, setVisibleAllBookedTimes] = useState(false);

  return (
    <Fab
      alwaysShowTitle={true}
      icon={<PlusOutlined />}
      mainButtonStyles={{
        color: "black",
        background: "white",
        outline: "none",
      }}
      style={{ bottom: 24, right: 24, zIndex: 1000 }}
    >
      <Action
        style={{ background: "#228B22", outline: "none" }}
        text={`Lägg till tid`}
        onClick={() => {
          setVisible(true);
        }}
      >
        <PlusOutlined className="text-white" />
      </Action>
      <Action
        style={{ background: "#228B22", outline: "none" }}
        text={`Alla bokade tider`}
        onClick={() => {
          setVisibleAllBookedTimes(true);
        }}
      >
        <CalendarOutlined className="text-white" />
      </Action>
      <AddAppointmentModal
        visible={visible}
        setVisible={setVisible}
      />
      <AllBookedTimesModal
        visible={visibleAllBookedTimes}
        setVisible={setVisibleAllBookedTimes}
      />
    </Fab>
  );
};

export default FloatingButtonCalendar;
