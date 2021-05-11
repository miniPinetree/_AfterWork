import React from 'react';
import styled from 'styled-components';
import ErrorImg from '../shared/images/404.png';

function Notfound(props) {
  return (
    <>
      <Container>
        <ImgWrap>
          <img
            src={ErrorImg}
            alt='errorImg'
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'http://admin.sjcam.kr/dev/upload/noimage.jpg';
            }}
          />
        </ImgWrap>
        <Info>
          <h1>Page not found</h1>
          <p style={{ marginBottom: '0' }}>
            요청하신 페이지를 찾을 수 없습니다.
          </p>
          <p style={{ marginBottom: '35px' }}>
            입력하신 주소가 정확한지 다시 한번 확인해 주세요.
          </p>
          <button
            onClick={() => {
              props.history.replace('/');
            }}
          >
            홈으로 가기
          </button>
        </Info>
      </Container>
    </>
  );
}

const Container = styled.div`
  max-width: 1004px;
  height: 66vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 524px) {
    height: auto;
    flex-direction: column;
  }
`;

const ImgWrap = styled.div`
  max-width: 400px;
  @media only screen and (max-width: 735px) {
    max-width: 300px;
  }
  @media only screen and (max-width: 524px) {
    max-width: 250px;
  }
  & img {
    width: 100%;
  }
`;
const Info = styled.div`
  color: #333;
  margin-left: 80px;
  & h1 {
    font-size: 47px;
    font-weight: bold;
    letter-spacing: -0.94px;
  }
  & p {
    font-size: 15px;
    letter-spacing: -0.3px;
    text-align: center;
  }
  & button {
    width: 105px;
    height: 37px;
    font-size: 15px;
    letter-spacing: -0.3px;
    background: transparent linear-gradient(144deg, #7f58ec 0%, #5c5ce3 100%) 0%
      0% no-repeat padding-box;
    border-radius: 5px;
    color: #fff;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin: 0 auto;
    &:hover {
      opacity: 0.7;
    }
  }
  @media only screen and (max-width: 820px) {
    margin-left: 0px;
  }
  @media only screen and (max-width: 735px) {
    & h1 {
      font-size: 30px;
      font-weight: bold;
      letter-spacing: -0.94px;
    }
    & p {
      font-size: 11px;
      letter-spacing: -0.3px;
      text-align: center;
    }
  }
`;

export default Notfound;
