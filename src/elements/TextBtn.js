import React from "react";
import styled from "styled-components";

const TextBtn = (props) => {
    const {children, _onClick} = props;

  return (
    <BtnBox onClick={_onClick}>
      <text>{children}</text>
      <hr/>
    </BtnBox>
  );

};
export default React.memo(TextBtn); 

const BtnBox = styled.div`
 display: inline-block;
  box-sizing: border-box-sizing;
  margin-top: 68px;
  cursor: pointer;
  & text {
    font-size: 14px;
    margin: 0px;
  }
  & hr {
    border: 0;
    height: 1px;
    background: #707070;
    margin: 0px;
  }
`;
