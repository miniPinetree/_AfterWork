import React from 'react';
import styled from 'styled-components';

function ItemCard(props) {
  const {small} = props;
  return (
    <>
      <CardWrap small={small}>
        <Img small={small}
          src='data:image/jpeg;base64,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'
          alt='img'
        />
        <TextBox small={small}>
          <strong>클래스</strong>
          <div>설명설명설명설명</div>
        </TextBox>
      </CardWrap>
    </>
  );
};
ItemCard.defaultProps = {
  small : false,
};
const CardWrap = styled.div`
  border: 1px solid;
  border-radius: 10px;
  ${(props)=>(props.small?
  `width:23%; height:0; padding-bottom:28%; position:relative;
`:"max-width:240px;")}
`;
const Img = styled.img`
  width: 100%;
  ${(props)=>(props.small?
 `height:70%; position:absolute;`
 : "height:192px;")}
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;
const TextBox = styled.div`
  width: 100%;
  padding: 15px 12px;
  box-sizing: border-box;
  ${(props)=>(props.small?
  `position:absolute; bottom:0px;`:"")}
  & strong {
    font-size: 17px;
  }
  font-size: 13px;
  ${(props)=>(props.small?
  "margin-bottom:5%":"")}
`;
export default ItemCard;
