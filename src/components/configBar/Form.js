import React from "react";
import { FormTitle, FormInput } from "./Form.styles";

export default function Form({ title, type, onChange, value }) {
  return (
    <React.Fragment>
      <FormTitle>{title}</FormTitle>
      <FormInput type={type} onChange={onChange} value={value} />
    </React.Fragment>
  );
}
