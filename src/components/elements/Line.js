import React from "react";
import Engine from "./Engine";
import * as Icon from "react-feather";

const Line = props => {
  return (
    <Engine {...props} shadowColor="transparent" bgColor="transparent">
      <div
        style={{
          height: `2px`,
          position: `absolute`,
          top: "50%",
          left: "0",
          width: "100%",
          backgroundColor: "#333"
        }}
      />
    </Engine>
  );
};

export default Line;
