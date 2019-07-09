import React from "react";
import Engine from "./Engine";
import * as Icon from "react-feather";

const House = props => {
  return (
    <Engine {...props} shadowColor="transparent" bgColor="transparent">
      <Icon.House
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

export default House;
