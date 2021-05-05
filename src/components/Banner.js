import React from 'react';
import styled from 'styled-components';
import Permit from '../shared/Permit';
import CountDown from './CountDown';
import SearchInput from './SearchInput';

function Banner(props) {
  return (
    <>
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
              <strong>퇴근하는 순간</strong>은 누구나 기다린다 퇴근하고{' '}
              <strong>뭐 할지는</strong> <br /> 직장에서 정해야 <br />
              <strong>제맛인 법</strong>
            </span>
          </TitleBox>
        </Container>
      </Section>
    </>
  );
}

const Section = styled.div`
  width: 100%;
  height: 670px;
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
`;

const Container = styled.div`
  max-width: 1004px;
  margin: 0 auto;
  position: relative;
`;

const TitleBox = styled.div`
  max-width: 484px;
  letter-spacing: -1.11px;
  color: #000;
  font: normal normal normal 37px/55px Noto Sans CJK KR;
  position: absolute;
  top: 78px;
  line-height: 1.4;
`;

export default Banner;
