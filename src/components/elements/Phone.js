import React from "react";
import Engine from "./Engine";
import * as Icon from "react-feather";

const Phone = props => {
  return (
    <Engine {...props} shadowColor="transparent" bgColor="transparent">
      <Icon.Phone
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

export default Phone;
