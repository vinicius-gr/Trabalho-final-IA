import styled from "styled-components";
import React, { Component } from "react";
import * as Icon from "react-feather";
import { Consumer, contextWrapper } from "../wrapper/context";
import { keyframes } from "styled-components";

const pulse = keyframes`
  from {
    transform: scale(1);
  }
  to{
    transform: scale(1.5);
    opacity: 0;
  }
`;

const fadeIn = keyframes`
    from{
        opacity: 0;
    }
    to{
        opacity: 1;
    }
`;

const Wrapper = styled.div`
  position: absolute;
  height: 50px;
  width: 50px;
  background-color: #3c2dff;
  color: white;
  border-radius: 50%;
  bottom: 50px;
  left: 50px;
  display: grid;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  animation: ${fadeIn} 0.5s ease-in-out 1;

  ::before {
    content: "";
    position: absolute;
    height: 42px;
    width: 42px;
    border-radius: 50%;
    border: 4px solid #3c2dff;
    background: transparent;
    margin: 0;
    animation: ${pulse} 0.8s ease infinite 5s;
  }
`;

const ModalToggler = ({ actions }) => {
  return (
    <Wrapper onClick={() => actions.openPaint()}>
      <Icon.Edit2 />
    </Wrapper>
  );
};

export default contextWrapper(ModalToggler);
