import React from 'react';
import styled from 'styled-components';
import Permit from '../shared/Permit';
import CountDown from './CountDown';
import SearchInput from './SearchInput';
import Slider from 'react-slick';
import '../../node_modules/slick-carousel/slick/slick.css';
import '../../node_modules/slick-carousel/slick/slick-theme.css';
import img from '../shared/images/banner1.png';
import img2 from '../shared/images/banner2.png';
import img3 from '../shared/images/banner3.png';

function Banner(props) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    autoplay: true,
    autoplaySpeed: 8000,
    draggable: false,
    arrows: false,
    pauseOnHover: false,
  };
  return (
    <>
      <Main>
        <Slider {...settings}>
          <>
            <Section>
              <Container>
                {/* 회원일때만 퇴근 시간을 랜더링하므로 Permit으로 감싸줌 */}
                <Permit>
                  {/* 퇴근시간 카운트 다운 */}
                  <CountDown />
                </Permit>
                <div>
                  <TitleBox>
                    <span>
                      <strong>
                        퇴근하고 뭐 할지
                        <br />
                        고민될 땐
                        <br />
                        AFTER WORK
                      </strong>
                    </span>
                  </TitleBox>
                  <SubTitleBox>
                    <span>
                      퇴근하고 뭐하지?
                      <br />
                      모든 취미 클래스를 모아 볼 수 있는 AFTER WORK
                    </span>
                  </SubTitleBox>
                  <ImgBox>
                    <img src={img} alt='img' />
                  </ImgBox>
                </div>
              </Container>
            </Section>
          </>
          <>
            <Section>
              <Container>
                {/* 회원일때만 퇴근 시간을 랜더링하므로 Permit으로 감싸줌 */}
                <Permit>
                  {/* 퇴근시간 카운트 다운 */}
                  <CountDown />
                </Permit>
                <div>
                  <TitleBox>
                    <span>
                      <strong>
                        출근... 퇴근... 반복적인 삶
                        <br />
                        AFTER WORK에서
                        <br />
                        바꿔보자
                      </strong>
                    </span>
                  </TitleBox>
                  <SubTitleBox>
                    <span>
                      퇴근한 후에 하는 일은,
                      <br />
                      당신이 직장에서 어디까지
                      <br />
                      올라갈 수 있는지를 결정한다.
                    </span>
                  </SubTitleBox>
                  <ImgBox>
                    <img src={img2} alt='img2' />
                  </ImgBox>
                </div>
              </Container>
            </Section>
          </>
          <>
            <Section>
              <Container>
                {/* 회원일때만 퇴근 시간을 랜더링하므로 Permit으로 감싸줌 */}
                <Permit>
                  {/* 퇴근시간 카운트 다운 */}
                  <CountDown />
                </Permit>
                <div>
                  <TitleBox>
                    <span>
                      <strong>
                        퇴근 후 치맥 한잔 대신
                        <br />
                        AFTER WORK에서
                        <br />
                        취미 한번 추천받자!
                      </strong>
                    </span>
                  </TitleBox>
                  <SubTitleBox>
                    <span>
                      퇴근하는 순간은 누구나 기다린다
                      <br />
                      퇴근하고 뭐 할지는 직장에서 정해야 제맛인 법
                    </span>
                  </SubTitleBox>
                  <ImgBox>
                    <img src={img3} alt='img3' />
                  </ImgBox>
                </div>
              </Container>
            </Section>
          </>
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
  height: 615px;
  background: #ffffff 0% 0% no-repeat padding-box;
  cursor: default;
  @media only screen and (max-width: 1024px) {
    height: 490px;
  }
  @media only screen and (max-width: 414px) {
    height: 250px;
  }
`;

const Container = styled.div`
  max-width: 1004px;
  margin: 0 auto;
  position: relative;
  @media only screen and (max-width: 1024px) {
    margin: 0 27px;
  }
  @media only screen and (max-width: 414px) {
    margin: 0 17px;
  }
`;

const TitleBox = styled.div`
  max-width: 484px;
  letter-spacing: -0.9px;
  color: #333;
  font-size: 45px;
  position: absolute;
  top: 99px;
  line-height: 1.4;
  @media only screen and (max-width: 1024px) {
    font-size: 35px;
    letter-spacing: -0.7px;
    top: 88px;
  }
  @media only screen and (max-width: 768px) {
    top: 42px;
  }
  @media only screen and (max-width: 666px) {
    font-size: 30px;
    letter-spacing: -0.4px;
  }
  @media only screen and (max-width: 540px) {
    font-size: 27px;
    letter-spacing: -0.4px;
  }
  @media only screen and (max-width: 414px) {
    font-size: 19px;
    letter-spacing: -1.1px;
  }
  @media only screen and (max-width: 368px) {
    font-size: 15px;
  }
`;

const SubTitleBox = styled.div`
  width: 480px;
  letter-spacing: -0.6px;
  font-size: 20px;
  color: #333;
  position: absolute;
  top: 314.73px;
  @media only screen and (max-width: 1024px) {
    font-size: 16px;
    letter-spacing: -0.48px;
    top: 254px;
  }
  @media only screen and (max-width: 768px) {
    top: 214px;
  }
  @media only screen and (max-width: 666px) {
    font-size: 14px;
    letter-spacing: -0.4px;
  }
  @media only screen and (max-width: 540px) {
    top: 190px;
  }
  @media only screen and (max-width: 414px) {
    font-size: 11px;
    letter-spacing: -0.33px;
    top: 135px;
    width: 156px;
  }
  @media only screen and (max-width: 375px) {
    width: 151px;
    font-size: 9px;
  }
`;

const ImgBox = styled.div`
  max-width: 530px;
  position: absolute;
  top: 25.5px;
  right: -30px;
  & img {
    width: 100%;
  }

  @media only screen and (max-width: 1024px) {
    max-width: 450px;
  }
  @media only screen and (max-width: 768px) {
    max-width: 374px;
  }
  @media only screen and (max-width: 630px) {
    max-width: 320px;
  }
  @media only screen and (max-width: 562px) {
    max-width: 280px;
  }
  @media only screen and (max-width: 530px) {
    max-width: 260px;
  }
  @media only screen and (max-width: 414px) {
    max-width: 195.16px;
    right: 0;
    top: 33.32px;
  }
`;
const Wrap = styled.div`
  max-width: 1004px;
  margin: 0 auto;
`;

export default Banner;
