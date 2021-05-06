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
export default React.memo(Title); 

const TitleBox = styled.div`
display:inline-block;
height: 37px;
margin:56px 29px 36px 0;
box-sizing:border-box-sizing;
cursor:default;
  & text {
    font-size: 23px;
    font-weight:600;
    margin:0px;
    
  }
  & hr {
    border: 0;
    height: 3px;
    background: black;
    margin:0px;
  }
  @media all and (max-width: 415px) {
        display: none;
    }
`;
