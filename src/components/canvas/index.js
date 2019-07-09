import React from "react";
import styled from "styled-components";
import { contextWrapper } from "../wrapper/context";
import Rect from "../elements/Rect";
import Circle from "../elements/Circle";
import ModalToggler from "./ModalToggler";
import PaintModal from "./PaintModal";
import Line from "../elements/Line";
import Camera from "../elements/Camera";
import Phone from "../elements/Phone";
import Paperclip from "../elements/PaperClip";
import Monitor from "../elements/Monitor";
import House from "../elements/House";

const Wrapper = styled.div`
  display: grid;
  align-items: center;
  padding: 50px;
  z-index: 0;
  position: relative;
`;

const CanvasDiv = styled.div`
  background-color: transparent;
  margin: auto;
  height: 80vh;
  width: 100%;
  position: relative;
  z-index: 0;
  :focus {
    outline: none;
  }
`;

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.selector = React.createRef();
    this.state = {
      coordinates: { x: 0, y: 0 },
      selectedElement: props.selectedElement
    };
  }

  componentDidMount = () => {
    const rect = this.selector.current.getBoundingClientRect();
    this.setState({
      topOffset: Math.floor(rect.top),
      leftOffset: Math.floor(rect.left)
    });
  };

  render() {
    return (
      <Wrapper>
        <CanvasDiv
          tabIndex="-1"
          ref={this.selector}
          onMouseMove={e =>
            this.setState({
              coordinates: {
                x: e.clientX - this.state.leftOffset,
                y: e.clientY - this.state.topOffset
              }
            })
          }
          onKeyUp={e => {
            if (e.key === "Delete") {
              this.props.actions.deleteElement();
              this.forceUpdate();
            }
          }}
          onClick={e => {
            this.props.actions.insertElement(
              this.state.coordinates.x,
              this.state.coordinates.y,
              this.props.canvasElements.length + 1
            );
            this.props.actions.selectElement(null);
          }}
        >
          {this.props.canvasElements.map((val, i) => {
            switch (val.type) {
              case "RECTANGLE":
                return (
                  <Rect
                    selectElement={this.props.actions.selectElement}
                    id={val.id}
                    isSelected={this.props.selectedElement === val.id}
                    onPropChange={this.props.actions.changeElement}
                    {...val}
                  />
                );
              case "CIRCLE":
                return (
                  <Circle
                    selectElement={this.props.actions.selectElement}
                    id={val.id}
                    isSelected={this.props.selectedElement === val.id}
                    onPropChange={this.props.actions.changeElement}
                    {...val}
                  />
                );

              case "MINUS":
                return (
                  <Line
                    selectElement={this.props.actions.selectElement}
                    id={val.id}
                    isSelected={this.props.selectedElement === val.id}
                    onPropChange={this.props.actions.changeElement}
                    {...val}
                  />
                );

              case "CAMERA":
                return (
                  <Camera
                    selectElement={this.props.actions.selectElement}
                    id={val.id}
                    isSelected={this.props.selectedElement === val.id}
                    onPropChange={this.props.actions.changeElement}
                    {...val}
                  />
                );

              case "PHONE":
                return (
                  <Phone
                    selectElement={this.props.actions.selectElement}
                    id={val.id}
                    isSelected={this.props.selectedElement === val.id}
                    onPropChange={this.props.actions.changeElement}
                    {...val}
                  />
                );

              case "PAPERCLIP":
                return (
                  <Paperclip
                    selectElement={this.props.actions.selectElement}
                    id={val.id}
                    isSelected={this.props.selectedElement === val.id}
                    onPropChange={this.props.actions.changeElement}
                    {...val}
                  />
                );
              case "MONITOR":
                return (
                  <Monitor
                    selectElement={this.props.actions.selectElement}
                    id={val.id}
                    isSelected={this.props.selectedElement === val.id}
                    onPropChange={this.props.actions.changeElement}
                    {...val}
                  />
                );
                
              case "HOUSE":
                return (
                  <House
                    selectElement={this.props.actions.selectElement}
                    id={val.id}
                    isSelected={this.props.selectedElement === val.id}
                    onPropChange={this.props.actions.changeElement}
                    {...val}
                  />
                );

              default:
                return "";
            }
          })}
        </CanvasDiv>
        <PaintModal />
        <ModalToggler />
      </Wrapper>
    );
  }
}

export default contextWrapper(Canvas);
