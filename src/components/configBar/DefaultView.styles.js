import styled from "styled-components";
import { FormInput } from "./Form.styles";

export const FormWrapper = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr;
  margin-top: 20px;
  justify-items: end;
`;

export const BoxShadowInputWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;

  ${FormInput} {
    width: 40px;
    justify-items: end;
  }
`;
