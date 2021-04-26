import React from 'react';
import styled from 'styled-components';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import Slider from 'react-slick';
import '../../node_modules/slick-carousel/slick/slick.css';
import '../../node_modules/slick-carousel/slick/slick-theme.css';
function Prev(props) {
  const { onClick } = props;
  return (
    <PrevBtn onClick={onClick}>
      <LeftOutlined />
    </PrevBtn>
  );
}
function Next(props) {
  const { onClick } = props;
  return (
    <NextBtn onClick={onClick}>
      <RightOutlined />
    </NextBtn>
  );
}

function Carousel(props) {
  const { children, text, size } = props;
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: size ? parseInt(size) : 4,
    slidesToScroll: size ? parseInt(size) : 4,
    prevArrow: <Prev />,
    nextArrow: <Next />,
  };
  return (
    <>
      <Wrap>
        <TitleContainer>
          <Title>{text}</Title>
          {/* <div>전체보기</div> */}
        </TitleContainer>
        <CarouselContainer>
          <Slider {...settings}>{children}</Slider>
        </CarouselContainer>
      </Wrap>
    </>
  );
}
const Wrap = styled.div`
  margin: 75px 0;
`;

const TitleContainer = styled.div`
  max-width: 1004px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #000;
`;
const CarouselContainer = styled.div`
  max-width: 1004px;
  margin: 20px auto;
  color: #000;
  position: relative;
`;
const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
`;
const PrevBtn = styled.button`
  margin: 0;
  padding: 0;
  background: none;
  border: none;
  border-radius: 0;
  outline: none;
  position: absolute;
  font-size: 20px;
  top: 50%;
  margin-top: -15px;
  left: -50px;
`;
const NextBtn = styled.button`
  margin: 0;
  padding: 0;
  background: none;
  border: none;
  border-radius: 0;
  outline: none;
  position: absolute;
  font-size: 20px;
  top: 50%;
  margin-top: -15px;
  right: -50px;
`;

export default Carousel;
