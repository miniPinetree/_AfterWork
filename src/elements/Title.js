import React from "react";
import styled from "styled-components";

const Title = (props) => {
    const {children} = props;

  return (
    <TitleBox>
      <text>{children}</text>
      <hr/>
    </TitleBox>
  );

};
export default Title; 

const TitleBox = styled.div`
display:inline-block;
height: 37px;
margin-bottom:36px;
box-sizing:border-box-sizing;

  & text {
    font-size: 23px;
    margin:0px;
    
  }
  & hr {
    border: 0;
    height: 3px;
    background: black;
    margin:0px;
  }
`;
