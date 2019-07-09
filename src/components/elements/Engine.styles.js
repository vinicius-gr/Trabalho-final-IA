import styled from "styled-components";
export const Resizable = styled.div`
  position: absolute;
  user-select: none;
  min-height: 10px;
  min-width: 10px;
`;
export const ResizerTopLeft = styled.div`
  left: -5px;
  top: -5px;
  cursor: nwse-resize;
`;
export const ResizerTopRight = styled.div`
  right: -5px;
  top: -5px;
  cursor: nesw-resize;
`;
export const ResizerBottomRight = styled.div`
  right: -5px;
  bottom: -5px;
  cursor: nwse-resize;
`;
export const ResizerBottomLeft = styled.div`
  left: -5px;
  bottom: -5px;
  cursor: nesw-resize;
`;
export const ResizerTopMid = styled.div`
  right: 50%;
  transform: translateX(50%);
  top: -6px;
  cursor: ns-resize;
`;
export const ResizerRightMid = styled.div`
  top: 50%;
  transform: translateY(-50%);
  right: -6px;
  cursor: ew-resize;
`;
export const ResizerLeftMid = styled.div`
  top: 50%;
  transform: translateY(-50%);
  left: -6px;
  cursor: ew-resize;
`;
export const ResizerBottomMid = styled.div`
  right: 50%;
  transform: translateX(50%);
  bottom: -6px;
  cursor: ns-resize;
`;
export const Resizers = styled.div`
  width: 100%;
  height: 100%;
  border: 3px dashed #4286f4;
  box-sizing: border-box;
  z-index: 99999;

  ${ResizerTopLeft}, ${ResizerTopRight}, ${ResizerBottomRight}, ${ResizerBottomLeft}, ${ResizerTopMid}, ${ResizerRightMid}, ${ResizerBottomMid}, ${ResizerLeftMid}{
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: white;
    border: 3px solid #4286f4;
    position: absolute;
    user-select: none;
  }
`;
