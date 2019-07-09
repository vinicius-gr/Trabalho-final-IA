import React from "react";

import { contextWrapper } from "../wrapper/context";

import { FormWrapper, BoxShadowInputWrapper } from "./DefaultView.styles";
import Form from "./Form";
import SketchExample from "./ColorPicker";
import { FormTitle, FormInput } from "./Form.styles";

const DefaultView = ({ actions, config }) => {
  return (
    <FormWrapper>
      <Form
        title="Line Stroke"
        value={config.lineStroke}
        onChange={e => actions.updateConfig({ lineStroke: e.target.value })}
        type="number"
      />
      <Form
        title="Width"
        value={config.width}
        onChange={e => actions.updateConfig({ width: e.target.value })}
        type="number"
      />
      <Form
        title="Height"
        value={config.height}
        onChange={e => actions.updateConfig({ height: e.target.value })}
        type="number"
      />
      <Form
        title="Box Shadow"
        value={config.boxShadow}
        onChange={e => actions.updateConfig({ boxShadow: e.target.value })}
        type="string"
      />
      <Form
        title="Border Radius"
        value={config.borderRadius}
        onChange={e => actions.updateConfig({ borderRadius: e.target.value })}
        type="number"
      />
      <FormTitle>Color</FormTitle>
      <SketchExample
        color={config.color}
        changeColor={color => actions.updateConfig({ color: color })}
      />
      <FormTitle>Border Color</FormTitle>
      <SketchExample
        color={config.borderColor}
        changeColor={color => actions.updateConfig({ borderColor: color })}
      />
      <FormTitle>Shadow Color</FormTitle>
      <SketchExample
        color={config.shadowColor}
        changeColor={color => actions.updateConfig({ shadowColor: color })}
      />
    </FormWrapper>
  );
};

export default contextWrapper(DefaultView);
