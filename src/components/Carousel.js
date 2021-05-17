import React from 'react';
import styled from 'styled-components';
import { LeftOutlined, RightOutlined, SyncOutlined } from '@ant-design/icons';
import Slider from 'react-slick';
import '../../node_modules/slick-carousel/slick/slick.css';
import '../../node_modules/slick-carousel/slick/slick-theme.css';
import { actionCreators as postActions } from '../redux/modules/post';
import { useDispatch } from 'react-redux';

function Prev(props) {
  const { onClick } = props;
  return (
    <PrevBtn onClick={onClick}>
      <LeftOutlined style={{ color: '#BDBDBD' }} />
    </PrevBtn>
  );
}
function MobilePrev(props) {
  const { onClick, is_category } = props;
  return (
    <MobilePrevBtn is_category={is_category}>
      <button onClick={onClick}>
        <LeftOutlined style={{ color: '#666', fontSize: '12px' }} />
      </button>
    </MobilePrevBtn>
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
function MobileNext(props) {
  const { onClick, is_category } = props;
  return (
    <MobileNextBtn is_category={is_category}>
      <button onClick={onClick}>
        <RightOutlined style={{ color: '#666', fontSize: '12px' }} />
      </button>
    </MobileNextBtn>
  );
}
function Carousel(props) {
  const { children, text, size, category, is_location, is_interest } = props;
  const dispatch = useDispatch();
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
        breakpoint: 1024,
        settings: {
          slidesToShow: category ? 6 : 4,
          slidesToScroll: category ? 6 : 4,
          dots: true,
        },
      },
      {
        breakpoint: 780,
        settings: {
          slidesToShow: category ? 6 : 3,
          slidesToScroll: category ? 6 : 3,
          dots: true,
        },
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: category ? 3 : 2,
          slidesToScroll: category ? 3 : 2,
          slidesPerRow: category ? 1 : 2,
          swipe: false,
          dots: true,
          dotsClass: category ? 'slick-dots' : 'slideDots',
          prevArrow: <MobilePrev is_category={category} />,
          nextArrow: <MobileNext is_category={category} />,
        },
      },
    ],
  };
  return (
    <>
      <Wrap>
        <TitleContainer>
          <Title>{text}</Title>
          {is_location ? (
            <button
              onClick={() => {
                dispatch(postActions.getNearListDB());
              }}
            >
              <SyncOutlined />
            </button>
          ) : null}
          {is_interest ? (
            <button
              onClick={() => {
                dispatch(postActions.getCategoryRecommendDB());
              }}
            >
              <SyncOutlined />
            </button>
          ) : null}
        </TitleContainer>
        <CarouselContainer>
          {/* children => postCard or CategoryCard */}
          {children.length > 0 && <Slider {...settings}>{children}</Slider>}
        </CarouselContainer>
      </Wrap>
    </>
  );
}

const Wrap = styled.div`
  margin: 75px 0;
  cursor: default;
  @media only screen and (max-width: 1024px) {
    margin: 75px 27px;
  }
  @media only screen and (max-width: 414px) {
    margin: 55px 17px;
  }
`;

const TitleContainer = styled.div`
  max-width: 1004px;
  margin: 0 auto;
  display: flex;
  justify-content: start;
  align-items: center;
  color: #333;
  & button {
    margin-left: 10px;
    line-height: 1.5715;
    position: relative;
    display: inline-block;
    font-weight: 400;
    white-space: nowrap;
    background-image: none;
    border: 1px solid transparent;
    box-shadow: 0 2px 0 rgb(0 0 0 / 2%);
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    user-select: none;
    touch-action: manipulation;
    color: rgba(0, 0, 0, 0.85);
    background: #fff;
    border-color: #d9d9d9;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    padding: 0px 0;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:active {
      color: #7f58ec;
      border-color: #7f58ec;
    }
    &:hover {
      color: #7f58ec;
      border-color: #7f58ec;
    }
    @media only screen and (max-width: 414px) {
      width: 20px;
      height: 20px;
      font-size: 12px;
      &:hover {
        color: rgba(0, 0, 0, 0.85);
        border-color: #d9d9d9;
      }
      &:active {
        color: #7f58ec;
        border-color: #7f58ec;
      }
    }
  }
`;
const Title = styled.div`
  font-size: 20px;
  letter-spacing: -0.6px;
  font-weight: 700;
  @media only screen and (max-width: 1024px) {
    font-size: 16px;
    letter-spacing: -0.48px;
  }
`;
const CarouselContainer = styled.div`
  max-width: 1004px;
  margin: 20px auto;
  color: #333;
  position: relative;
  cursor: default;
  & .slick-dots li button::before {
    color: #c8adff;
  }
  & .slideDots {
    display: flex !important;
    font-size: 12px;
    list-style: none;
    margin: 0;
    margin-top: 10px;
    padding: 0;
    justify-content: center;
    align-items: center;
    & li {
      margin-right: 4px;
    }
    & li:last-child {
      margin-right: 0;
    }
    & button {
      border: none;
      background: none;
      cursor: pointer;
    }
  }

  & .slideDots .slick-active {
    color: #fff;
    background: #c8adff 0% 0% no-repeat padding-box;
    border-radius: 2px;
  }
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
  @media only screen and (max-width: 1024px) {
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
  @media only screen and (max-width: 1024px) {
    display: none;
  }
`;

const MobilePrevBtn = styled.div`
  position: absolute;
  bottom: ${(props) => (props.is_category ? '-23px' : '0px')};
  left: ${(props) => (props.is_category ? '110px' : '35px')};
  width: 24px;
  height: 20px;
  z-index: 2;
  & button {
    width: 24px;
    height: 20px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${(props) => (props.is_category ? '#fafafa' : '#fff')};
    box-shadow: 0px 2px 5px #0000001a;
    border-radius: 2px;
  }
`;
const MobileNextBtn = styled.div`
  position: absolute;
  bottom: ${(props) => (props.is_category ? '-23px' : '0px')};
  right: ${(props) => (props.is_category ? '110px' : '35px')};
  width: 24px;
  height: 20px;
  z-index: 2;
  & button {
    width: 24px;
    height: 20px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${(props) => (props.is_category ? '#fafafa' : '#fff')};
    box-shadow: 0px 2px 5px #0000001a;
    border-radius: 2px;
  }
`;

export default Carousel;
