import styled from "styled-components"
import { BaseButton } from "../shared_style"
import { FONT_SIZE } from "../../style_constants"

const OrderButton = styled(BaseButton)`
  width: 390px;
  background-color: black;
  color: white;
  border-style: none;
  padding: 8px 16px;
  font-size: ${FONT_SIZE.BODY1}
`;

export default OrderButton