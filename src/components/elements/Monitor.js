import React from "react";
import Engine from "./Engine";
import * as Icon from "react-feather";

const Monitor = props => {
  return (
    <Engine {...props} shadowColor="transparent" bgColor="transparent">
      <Icon.Monitor
        style={{
          height: `100%`,
          position: `absolute`,
          top: "0",
          left: "0",
          width: "100%",
          color: props.borderColor
        }}
      />
    </Engine>
  );
};

export default Monitor;
