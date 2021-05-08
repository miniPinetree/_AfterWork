import React from 'react';
import styled from 'styled-components';
import Permit from '../shared/Permit';
import CountDown from './CountDown';
import SearchInput from './SearchInput';
import Slider from 'react-slick';
import '../../node_modules/slick-carousel/slick/slick.css';
import '../../node_modules/slick-carousel/slick/slick-theme.css';

function Banner(props) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    pauseOnHover: false,
  };
  return (
    <>
      <Main>
        <Slider {...settings}>
          <Section>
            <Container>
              {/* 회원일때만 퇴근 시간을 랜더링하므로 Permit으로 감싸줌 */}
              <Permit>
                {/* 퇴근시간 카운트 다운 */}
                <CountDown />
              </Permit>
              <TitleBox>
                <span>
                  <strong>
                    퇴근하는 순간은 누구나 기다린다
                    <br />
                    퇴근하고 뭐 할지는
                    <br />
                    직장에서 정해야 제맛인 법
                  </strong>
                </span>
              </TitleBox>
            </Container>
          </Section>
          <Section>
            <Container>
              {/* 회원일때만 퇴근 시간을 랜더링하므로 Permit으로 감싸줌 */}
              <Permit>
                {/* 퇴근시간 카운트 다운 */}
                <CountDown />
              </Permit>
              {/* 검색 창 */}

              <SearchInput />
              <TitleBox>
                <span>
                  <strong>
                    123
                    <br />
                    456
                    <br />
                    789
                  </strong>
                </span>
              </TitleBox>
            </Container>
          </Section>
        </Slider>
        {/* 검색 창 */}
        <Wrap>
          <SearchInput />
        </Wrap>
      </Main>
    </>
  );
}

const Main = styled.div`
  width: 100%;
  position: relative;
`;

const Section = styled.div`
  width: 100%;
  height: 681px;
  background: transparent
    linear-gradient(
      180deg,
      rgba(160, 122, 244, 0.24) 0%,
      rgba(159, 122, 243, 0.21) 27%,
      rgba(159, 122, 243, 0.14) 67%,
      rgba(203, 185, 245, 0.08) 87%,
      rgba(255, 255, 255, 0.24) 100%
    )
    0% 0% no-repeat padding-box;
  cursor: default;
  @media only screen and (max-width: 414px) {
    height: 340px;
  }
`;

const Container = styled.div`
  max-width: 1004px;
  margin: 0 auto;
  position: relative;
  @media only screen and (max-width: 414px) {
    margin: 0 17px;
  }
`;

const TitleBox = styled.div`
  max-width: 484px;
  letter-spacing: -1.11px;
  color: #333;
  font: normal normal 800 37px/55px NanumSquare;
  position: absolute;
  top: 99px;
  line-height: 1.4;
  @media only screen and (max-width: 414px) {
    width: auto;
    font-size: 16px;
    letter-spacing: -0.48px;
    color: #333;
    position: absolute;
    top: 32px;
  }
`;
const Wrap = styled.div`
  max-width: 1004px;
  margin: 0 auto;
`;

export default Banner;
