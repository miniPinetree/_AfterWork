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
      <LeftOutlined style={{ color: '#BDBDBD' }} />
    </PrevBtn>
  );
}
function Next(props) {
  const { onClick } = props;
  return (
    <NextBtn onClick={onClick}>
      <RightOutlined style={{ color: '#BDBDBD' }} />
    </NextBtn>
  );
}

function Carousel(props) {
  const { children, text, size, category } = props;
  // 케러셀 셋팅
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: size ? parseInt(size) : 4,
    slidesToScroll: size ? parseInt(size) : 4,
    prevArrow: <Prev />,
    nextArrow: <Next />,
    responsive: [
      {
        breakpoint: 450,
        settings: {
          slidesToShow: category ? 3 : 2,
          slidesToScroll: category ? 3 : 2,
          slidesPerRow: category ? 1 : 2,
        },
      },
    ],
  };
  return (
    <>
      <Wrap>
        <TitleContainer>
          <Title>{text}</Title>
        </TitleContainer>
        <CarouselContainer>
          {/* children => postCard or CategoryCard */}
          <Slider {...settings}>{children}</Slider>
        </CarouselContainer>
      </Wrap>
    </>
  );
}

const Wrap = styled.div`
  margin: 75px 0;
  cursor: default;
  @media only screen and (max-width: 414px) {
    margin: 55px 20px;
  }
`;

const TitleContainer = styled.div`
  max-width: 1004px;
  margin: 0 auto;
  display: flex;
  justify-content: start;
  align-items: center;
  color: #000;
`;
const Title = styled.div`
  font-size: 20px;
  letter-spacing: -0.6px;
  font-weight: 700;
  @media only screen and (max-width: 414px) {
    font-size: 15px;
    letter-spacing: -0.45px;
  }
`;
const CarouselContainer = styled.div`
  max-width: 1004px;
  margin: 20px auto;
  color: #000;
  position: relative;
  cursor: default;
`;

const PrevBtn = styled.button`
  margin: 0;
  padding: 0;
  background: none;
  border: none;
  border-radius: 0;
  outline: none;
  cursor: pointer;
  position: absolute;
  font-size: 20px;
  top: 50%;
  transform: translate(-50%, -50%);
  margin-top: -20px;
  left: -50px;
  @media only screen and (max-width: 414px) {
    display: none;
  }
`;
const NextBtn = styled.button`
  margin: 0;
  padding: 0;
  background: none;
  border: none;
  border-radius: 0;
  outline: none;
  cursor: pointer;
  position: absolute;
  font-size: 20px;
  top: 50%;
  transform: translate(-50%, -50%);
  margin-top: -20px;
  right: -50px;
  @media only screen and (max-width: 414px) {
    display: none;
  }
`;

export default Carousel;
