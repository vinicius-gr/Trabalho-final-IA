import React, { Component } from "react";

import SideBar from "../sidebar";

import ConfigBar from "../configBar";
import Store from "./store";

import { Wrapper } from "./index.styles";
import Rect from "../elements/Rect";
import Canvas from "../canvas";

export default class App extends Component {
  render() {
    return (
      <Store>
        <Wrapper>
          <SideBar />
          <Canvas />
          <ConfigBar />
        </Wrapper>
      </Store>
    );
  }
}
