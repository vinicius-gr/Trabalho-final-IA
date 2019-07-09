import React from "react";
import ReactDOM from "react-dom";
import {
  Resizable,
  Resizers,
  ResizerTopLeft,
  ResizerTopMid,
  ResizerTopRight,
  ResizerRightMid,
  ResizerBottomRight,
  ResizerBottomMid,
  ResizerBottomLeft,
  ResizerLeftMid
} from "./Engine.styles";

export default class Engine extends React.Component {
  constructor(props) {
    super(props);

    this.selector = React.createRef();

    this.state = {
      isDragging: false,
      width: props.width,
      height: props.height,
      x: props.x,
      y: props.y,
      grid: 10,
      cursor: "grab",
      zIndex: props.zIndex,
      borderRadius: props.borderRadius
    };
  }

  componentDidMount() {
    ReactDOM.findDOMNode(this).parentNode.addEventListener(
      "mousemove",
      this.resizePanel
    );
    ReactDOM.findDOMNode(this).parentNode.addEventListener(
      "mouseup",
      this.stopResize
    );
  }

  startResize = (e, i) => {
    this.setState({
      isDragging: true,
      currentResizer: i,
      initialX: e.clientX,
      initialY: e.clientY,
      isMoving: false
    });
  };

  stopResize = () => {
    this.setState({
      isDragging: false,
      isMoving: false
    });
    this.props.onPropChange(this.props.id, {
      width: this.state.width,
      height: this.state.height
    });
  };

  startMove = (e, i) => {
    this.setState({
      isMoving: true,
      initialX: e.clientX,
      initialY: e.clientY
    });
    this.props.selectElement(this.props.id);
  };

  stopMove = () => {
    this.setState({
      isMoving: false,
      cursor: "grab"
    });
    this.props.onPropChange(this.props.id, {
      x: this.state.x,
      y: this.state.y
    });
  };

  movePanel = e => {
    if (this.state.isMoving) {
      console.log(e.target.parentNode);
      this.setState({
        x:
          this.normalize(this.state.x) +
          (this.normalize(e.clientX) - this.normalize(this.state.initialX)),
        y:
          this.normalize(this.state.y) +
          (this.normalize(e.clientY) - this.normalize(this.state.initialY)),
        initialX: this.normalize(e.clientX),
        initialY: this.normalize(e.clientY),
        cursor: "grabbing"
      });
    }
  };

  normalize = v => {
    return Math.ceil(v / this.state.grid) * this.state.grid;
  };

  resizePanel = e => {
    if (this.state.isDragging) {
      switch (this.state.currentResizer) {
        case "tl":
          this.setState({
            width:
              this.normalize(this.state.width) -
              (this.normalize(e.clientX) - this.normalize(this.state.initialX)),
            height:
              this.normalize(this.state.height) -
              (this.normalize(e.clientY) - this.normalize(this.state.initialY)),
            x:
              this.normalize(this.state.x) +
              (this.normalize(e.clientX) - this.normalize(this.state.initialX)),
            y:
              this.normalize(this.state.y) +
              (this.normalize(e.clientY) - this.normalize(this.state.initialY)),
            initialX: this.normalize(e.clientX),
            initialY: this.normalize(e.clientY)
          });
          break;

        case "tm":
          this.setState({
            height:
              this.normalize(this.state.height) -
              (this.normalize(e.clientY) - this.normalize(this.state.initialY)),
            y:
              this.normalize(this.state.y) +
              (this.normalize(e.clientY) - this.normalize(this.state.initialY)),
            initialY: this.normalize(e.clientY)
          });
          break;

        case "tr":
          this.setState({
            width:
              this.normalize(this.state.width) +
              (this.normalize(e.clientX) - this.normalize(this.state.initialX)),
            height:
              this.normalize(this.state.height) -
              (this.normalize(e.clientY) - this.normalize(this.state.initialY)),
            y:
              this.normalize(this.state.y) +
              (this.normalize(e.clientY) - this.normalize(this.state.initialY)),
            initialX: this.normalize(e.clientX),
            initialY: this.normalize(e.clientY)
          });
          break;

        case "mr":
          this.setState({
            width:
              this.normalize(this.state.width) +
              (this.normalize(e.clientX) - this.normalize(this.state.initialX)),
            initialX: this.normalize(e.clientX)
          });
          break;

        case "br":
          this.setState({
            width:
              this.normalize(this.state.width) +
              (this.normalize(e.clientX) - this.normalize(this.state.initialX)),
            height:
              this.normalize(this.state.height) +
              (this.normalize(e.clientY) - this.normalize(this.state.initialY)),
            initialX: this.normalize(e.clientX),
            initialY: this.normalize(e.clientY)
          });
          break;

        case "bm":
          this.setState({
            height:
              this.normalize(this.state.height) +
              (this.normalize(e.clientY) - this.normalize(this.state.initialY)),
            initialY: this.normalize(e.clientY)
          });
          break;

        case "bl":
          this.setState({
            width:
              this.normalize(this.state.width) -
              (this.normalize(e.clientX) - this.normalize(this.state.initialX)),
            height:
              this.normalize(this.state.height) +
              (this.normalize(e.clientY) - this.normalize(this.state.initialY)),
            x:
              this.normalize(this.state.x) +
              this.normalize(e.clientX - this.normalize(this.state.initialX)),
            initialX: this.normalize(e.clientX),
            initialY: this.normalize(e.clientY)
          });

          break;

        case "lm":
          this.setState({
            width:
              this.normalize(this.state.width) -
              (this.normalize(e.clientX) - this.normalize(this.state.initialX)),
            x:
              this.normalize(this.state.x) +
              this.normalize(e.clientX - this.normalize(this.state.initialX)),
            initialX: this.normalize(e.clientX)
          });

          break;

        default:
          break;
      }
    }
  };

  render() {
    return (
      <Resizable
        ref={this.selector}
        x={this.state.x}
        y={this.state.y}
        onMouseDown={e => {
          this.startMove(e);
        }}
        onMouseMove={e => {
          this.movePanel(e);
        }}
        onMouseUp={e => {
          this.stopMove(e);
        }}
        onClick={e => {
          e.stopPropagation();
          this.props.selectElement(this.props.id);
        }}
        style={{
          height: `${this.state.height}px`,
          width: `${this.state.width}px`,
          top: `${this.state.y}px`,
          left: `${this.state.x}px`,
          cursor: this.state.cursor,
          backgroundColor: this.props.bgColor,
          boxShadow: this.props.boxShadow + " " + this.props.shadowColor,
          zIndex: this.state.zIndex,
          borderRadius: `${this.props.borderRadius}%`,
          border: `${this.props.lineStroke}px solid ${this.props.borderColor}`
        }}
      >
        {this.props.isSelected ? (
          <Resizers>
            <ResizerTopLeft
              onMouseDown={e => this.startResize(e, "tl")}
              onMouseUp={e => this.stopResize()}
            />
            <ResizerTopMid
              onMouseDown={e => this.startResize(e, "tm")}
              onMouseUp={e => this.stopResize()}
            />
            <ResizerTopRight
              onMouseDown={e => this.startResize(e, "tr")}
              onMouseUp={e => this.stopResize()}
            />
            <ResizerRightMid
              onMouseDown={e => this.startResize(e, "mr")}
              onMouseUp={e => this.stopResize()}
            />
            <ResizerBottomRight
              onMouseDown={e => this.startResize(e, "br")}
              onMouseUp={e => this.stopResize()}
            />
            <ResizerBottomMid
              onMouseDown={e => this.startResize(e, "bm")}
              onMouseUp={e => this.stopResize()}
            />
            <ResizerBottomLeft
              onMouseDown={e => this.startResize(e, "bl")}
              onMouseUp={e => this.stopResize()}
            />
            <ResizerLeftMid
              onMouseDown={e => this.startResize(e, "lm")}
              onMouseUp={e => this.stopResize()}
            />
          </Resizers>
        ) : null}
        {this.props.children}
      </Resizable>
    );
  }
}
