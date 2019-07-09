import React, { Component } from "react";
import styled from "styled-components";

import DefaultView from "./DefaultView";

const Wrapper = styled.div`
  background-color: #fefefe;
  padding: 20px;
`;

export default function ConfigBar() {
  return (
    <Wrapper>
      <DefaultView />
    </Wrapper>
  );
}
