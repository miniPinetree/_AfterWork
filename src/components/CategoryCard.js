import React from 'react';
import styled from 'styled-components';
import { history } from '../redux/configStore';

function CategoryCard(props) {
  // 카테고리 카드 클릭시 카테고리 페이지로 이동
  return (
    <>
      <CardWrap
        onClick={() => {
          history.push({
            pathname: `/category/${props.categoryId}`,
            state: `${props.name}`,
          });

          window.scrollTo({ top: 0, left: 0 });
        }}
      >
        <Img
          src={props.imgUrl}
          alt='category-img'
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              'https://afterwork-webservice-static.s3.ap-northeast-2.amazonaws.com/logo/default_image.jpg';
          }}
        />

        <TextBox>{props.name}</TextBox>
      </CardWrap>
    </>
  );
}
const CardWrap = styled.div`
  max-width: 157px;
  height: 240px;
  border-radius: 10px;
  cursor: pointer;
  @media only screen and (max-width: 768px) {
    max-width: 107px;
    height: 150px;
  }
  @media only screen and (max-width: 414px) {
    max-width: 105px;
    height: auto;
  }
`;
const Img = styled.img`
  width: 100%;
  height: 157px;
  border-radius: 50%;
  box-shadow: 0px 10px 10px #e6e6e6;
  &:hover {
    opacity: 0.7;
  }
  @media only screen and (max-width: 768px) {
    height: 107px;
  }
  @media only screen and (max-width: 414px) {
    height: 105px;
  }
`;
const TextBox = styled.div`
  width: 100%;
  font: normal normal medium 18px/50px Noto Sans CJK KR;
  font-size: 16px;
  color: #333;
  text-align: center;
  letter-spacing: -0.48px;
  padding: 9px 5px;
  box-sizing: border-box;
  @media only screen and (max-width: 414px) {
    font-size: 15px;
    letter-spacing: -0.36px;
  }
`;

export default CategoryCard;
