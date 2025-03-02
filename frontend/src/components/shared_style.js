import styled from "styled-components";
import { COLORS } from "../style_constants";


export const BaseButton = styled.button`
  cursor: pointer;
  :hover {
    opacity: 0.7;
  }
  :forcus {
    outline: 0;
  }
`;

export const RoundButton = styled(BaseButton)`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: none;
  background-color: ${COLORS.SUB_BUTTON}
`;
