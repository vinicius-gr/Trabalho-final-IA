import React from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { contextWrapper } from "../wrapper/context";
import * as Icon from "react-feather";
import CanvasDraw from "react-canvas-draw";
import * as tf from "@tensorflow/tfjs";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "385px",
    width: "302px"
  }
};

const CloseBtn = styled.button`
  color: white;
  background-color: #ff3636;
  border: none;
  display: grid;
  padding: 5px;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 5px;
  position: absolute;
  right: 85px;
  bottom: 20px;
  cursor: pointer;
  outline: none;

  :focus {
    outline: none;
  }
`;

const DoneBtn = styled.button`
  color: white;
  background-color: #00b068;
  border: none;
  display: grid;
  padding: 5px;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 5px;
  position: absolute;
  right: 20px;
  bottom: 20px;
  cursor: pointer;
  outline: none;

  :focus {
    outline: none;
  }
`;

const Canvas = styled(CanvasDraw)`
  width: 100%;
  height: 320px;
  border: 1px dashed #ccc;
`;

class PaintModal extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.imgRef = React.createRef();

    this.state = {
      count: 0
    };

    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  afterOpenModal() {
    this.subtitle.style.color = "#3c2dff";
    this.subtitle.style.margin = "0";
  }

  closeModal() {
    this.props.actions.closePaint();
  }

  preprocess(imgData) {
    return tf.tidy(() => {
      let tensor = tf.browser.fromPixels(imgData, 1);
      const resized = tf.image.resizeBilinear(tensor, [28, 28]).toFloat();
      const offset = tf.scalar(255.0);
      const normalized = tf.scalar(1.0).sub(resized.div(offset));
      const batched = normalized.expandDims(0);
      return batched;
    });
  }

  processCanvas(path) {
    const jsonPath = JSON.parse(path);
    const mbb = this.getMinBox(jsonPath.lines[0].points);
    const dpi = window.devicePixelRatio;
    const ctx = this.saveableCanvas.ctx.drawing;

    const imgData = ctx.getImageData(
      mbb.min.x * dpi,
      mbb.min.y * dpi,
      (mbb.max.x - mbb.min.x) * dpi,
      (mbb.max.y - mbb.min.y) * dpi
    );

    const pred = this.props.model.predict(this.preprocess(imgData)).dataSync();
    this.props.actions.selectTool(this.findMatch(pred));
  }

  findMatch(pred) {
    let classes = [
      "camera",
      "circle",
      "square",
      "computer",
      "paper_clip",
      "line",
      "house",
      "cell_phone"
    ];

    if (pred.length === 0) {
      return -1;
    }

    var max = pred[0];
    let maxIndex = 0;
    for (let i = 0; i < pred.length; i++) {
      if (pred[i] > max) {
        maxIndex = i;
        max = pred[i];
      }
    }

    return classes[maxIndex];
  }

  getMinBox = coords => {
    var coorX = coords.map(function(p) {
      return p.x;
    });
    var coorY = coords.map(function(p) {
      return p.y;
    });

    var min_coords = {
      x: Math.min.apply(null, coorX) - 10,
      y: Math.min.apply(null, coorY) - 10
    };
    var max_coords = {
      x: Math.max.apply(null, coorX) + 10,
      y: Math.max.apply(null, coorY) + 10
    };

    return {
      min: min_coords,
      max: max_coords
    };
  };

  render() {
    const defaultProps = {
      loadTimeOffset: 5,
      lazyRadius: 10,
      brushRadius: 2,
      brushColor: "black",
      catenaryColor: "#0a0302",
      gridColor: "#ddd",
      hideGrid: false,
      canvasWidth: 300,
      canvasHeight: 300,
      disabled: false,
      imgSrc: "",
      saveData: null,
      immediateLoading: false
    };
    return (
      <Modal
        isOpen={this.props.isPaintOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel="Paint"
      >
        <h2 ref={subtitle => (this.subtitle = subtitle)}>Draw something</h2>
        <Canvas
          {...defaultProps}
          ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
        />
        <CloseBtn onClick={this.closeModal}>
          <Icon.XCircle />
        </CloseBtn>
        <DoneBtn
          onClick={() => {
            this.closeModal();
            this.processCanvas(this.saveableCanvas.getSaveData());
          }}
        >
          <Icon.CheckCircle />
        </DoneBtn>
      </Modal>
    );
  }
}

export default contextWrapper(PaintModal);
