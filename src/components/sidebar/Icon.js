import React, { Component } from "react";
import styled from "styled-components";
import { Consumer, contextWrapper } from "../wrapper/context";

const IconDiv = styled.div`
  padding: 10px;
  border-radius: 4px;
  display: grid;
  align-items: center;
  color: #555;
  background-color: ${props => (props.clicked ? "#fff" : "transparent")};
  border: ${props =>
    props.clicked ? "1px solid #ccc" : "1px solid transparent"};

  > svg {
    margin: auto;
  }
`;

const Icon = ({ actions, selectedTool, name, svg }) => {
  return (
    <IconDiv
      clicked={name === selectedTool}
      onClick={() => {
        if (name === selectedTool) {
          actions.selectTool(null);
        } else {
          actions.selectTool(name);
        }
      }}
    >
      {svg}
    </IconDiv>
  );
};

export default contextWrapper(Icon);
