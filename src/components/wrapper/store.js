import React, { Component } from "react";
import { Provider } from "./context";
import * as tf from "@tensorflow/tfjs";

async function start() {
  let model = await tf.loadLayersModel(
    "https://raw.githubusercontent.com/vinicius-gr/prototype-it/master/model/model.json"
  );
  return model;
}

class Store extends Component {
  constructor(props) {
    super(props);

    start()
      .then(result => {
        this.state.model = result;
      })
      .catch(e => {
        console.log(e);
      });

    console.log(tf.version);

    this.state = {
      actions: {
        updateConfig: this.updateConfig,
        selectTool: this.selectTool,
        selectElement: this.selectElement,
        insertElement: this.insertElement,
        deleteElement: this.deleteElement,
        changeElement: this.changeElement,
        openPaint: this.openPaint,
        closePaint: this.closePaint
      },
      config: {
        lineStroke: 0,
        width: 100,
        height: 100,
        color: "#FFFFFF",
        boxShadow: "0px 0px 10px 10px",
        shadowColor: "#CCCCCC",
        borderColor: "#333333",
        borderRadius: 3
      },
      canvasElements: [],
      selectedTool: null,
      selectedElement: null,
      isPaintOpen: false
    };
  }

  updateConfig = newValue => {
    this.setState({
      config: {
        ...this.state.config,
        ...newValue
      }
    });
  };

  selectTool = type => {
    this.setState({ selectedTool: type });
  };

  selectElement = index => {
    this.setState({ selectedElement: index });
  };

  insertElement = (x, y) => {
    if (this.state.selectedTool) {
      let currentElements = this.state.canvasElements;
      currentElements.push({
        type: this.state.selectedTool,
        ...this.state.config,
        bgColor: this.state.config.color,
        zIndex: 0,
        x,
        y,
        id: Math.floor(Math.random() * 1000000)
      });
      this.setState({ canvasElements: currentElements, selectedTool: null });
    }
  };

  changeElement = (id, props) => {
    let obj = this.state.canvasElements.filter(val => val.id === id);
    if (obj[0]) {
      this.setState({
        canvasElements: this.state.canvasElements.map(val => {
          if (val.id === id) {
            return {
              ...val,
              ...props
            };
          } else {
            return {
              ...val
            };
          }
        })
      });
    }
  };

  deleteElement = () => {
    if (this.state.selectedElement) {
      this.setState({
        canvasElements: this.state.canvasElements.filter(
          val => val.id !== this.state.selectedElement
        )
      });
      this.selectElement(null);
    }
  };

  openPaint = () => {
    this.setState({ isPaintOpen: true });
  };

  closePaint = () => {
    this.setState({ isPaintOpen: false });
  };

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

export default Store;
