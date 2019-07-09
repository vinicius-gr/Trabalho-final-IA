import React from "react";
import Engine from "./Engine";

const Circle = props => {
  return <Engine {...props} borderRadius="50" />;
};

export default Circle;
