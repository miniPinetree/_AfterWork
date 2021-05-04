import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { history } from '../redux/configStore';
import Permit from '../shared/Permit';
import { useSelector } from 'react-redux';

function Banner(props) {
  // 퇴근시간 카운트 다운
  const offTime = useSelector((state) => state.user.user?.offTime);
  const now = new Date();
  const today = now.toLocaleDateString();
  let difference = +new Date(today + offTime) - +new Date();
  // 남은 시간 계산
  const calculateTimeLeft = () => {
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        hours: `${Math.floor((difference / (1000 * 60 * 60)) % 24)}`,
        minutes: `${Math.floor((difference / 1000 / 60) % 60)}`,
        seconds: `${Math.floor((difference / 1000) % 60)}`,
      };
    }

    return timeLeft;
  };

  const [search, setSearch] = useState('');
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    // 타이머 1000밀리 초 마다 갱신
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval, idx) => {
    // diff < 0 이면 값이 없으므로 리턴
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      // 한자리 수는 01 꼴로 나오게 처리
      <span key={idx}>
        {timeLeft[interval] < 10
          ? `0${timeLeft[interval]}`
          : `${timeLeft[interval]}`}
      </span>,
    );
  });

  const searchHandler = () => {
    // 검색이 공란일때는 리턴
    if (search === '') {
      return;
    }
    history.push(`/find/search?keyword=${search}`);
    setSearch('');
  };

  return (
    <>
      <Section>
        <Container>
          {/* 회원일때만 랜더링하므로 Permit으로 감싸줌 */}
          <Permit>
            {/* 퇴근시간을 설정하지 않은 경우 */}
            {offTime === null || offTime === undefined ? (
              <SettingBox>
                <span>퇴근 시간을 설정해주세요!</span>
                <div>
                  <button
                    onClick={() => {
                      history.push('/userdetail');
                    }}
                  >
                    시간 설정하러 가기 {'>'}
                  </button>
                </div>
              </SettingBox>
            ) : (
              <>
                {difference > 0 ? (
                  <Timer>
                    <>
                      {timerComponents.length ? (
                        <OffTimeTitle>퇴근 시간 카운트</OffTimeTitle>
                      ) : null}
                      <OffTimeCnt>
                        {timerComponents.length ? (
                          <>
                            {timerComponents[0]}: {timerComponents[1]} :{' '}
                            {timerComponents[2]}
                          </>
                        ) : null}
                      </OffTimeCnt>{' '}
                    </>
                  </Timer>
                ) : // diff < 0 이면 퇴근시간이 지난것이므로 표시해주지 않게 처리
                null}
              </>
            )}
          </Permit>
          <TitleBox>
            <span>
              <strong>퇴근하는 순간</strong>은 누구나 기다린다 퇴근하고{' '}
              <strong>뭐 할지는</strong> <br /> 직장에서 정해야 <br />
              <strong>제맛인 법</strong>
            </span>
          </TitleBox>
          <InputBox>
            <Input
              placeholder='검색어를 입력하세요'
              suffix={
                <SearchOutlined
                  style={{
                    color: '#7F58EC',
                    cursor: 'pointer',
                  }}
                  onClick={searchHandler}
                />
              }
              value={search}
              style={{
                borderRadius: '29px',
                fontSize: '20px',
                letterSpacing: '-0.6px',
                color: '#BDBDBD',
                boxSizing: 'border-box',
                padding: '9px 27px 12px 27px',
                boxShadow: '0px 10px 15px #F3E8F6',
              }}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  searchHandler();
                }
              }}
            />
          </InputBox>
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

const Timer = styled.div`
  width: 357px;
  max-width: 357px;
  height: 102px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  right: 0px;
  background: #fff;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  box-shadow: 3px 10px 15px #f3e8f6;
`;
const OffTimeTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  font-family: 'Noto Sans CJK KR';
  letter-spacing: -0.54px;
  color: #000000;
`;
const OffTimeCnt = styled.div`
  margin-top: 8px;
  font-size: 32px;
  font-weight: bold;
  color: #000;
  font-family: 'Noto Sans CJK KR';
  & span {
    display: inline-block;
    width: 64px;
    text-align: center;
    background: #f5f5f5 0% 0% no-repeat padding-box;
    border-radius: 6px;
    letter-spacing: 1px;
  }
`;

const SettingBox = styled.div`
  width: 357px;
  max-width: 357px;
  height: 102px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  right: 0px;
  background: #fff;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  & span {
    font-size: 18px;
    font-weight: 600;
    font-family: 'Noto Sans CJK KR';
    letter-spacing: -0.54px;
    color: #000000;
  }
  & button {
    margin-top: 12px;
    width: 165px;
    max-width: 165px;
    height: 28px;
    font-size: 15px;
    padding: 3px 17px;
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 0;
    color: #ffffff;
    background: transparent linear-gradient(124deg, #7f58ec 0%, #5c5ce3 100%) 0%
      0% no-repeat padding-box;
    border-radius: 14px;
    border: none;
    cursor: pointer;
    &:hover {
      opacity: 0.9;
    }
  }
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

const InputBox = styled.div`
  width: 51%;
  height: 50px;
  position: absolute;
  top: 367px;
  box-sizing: border-box;
`;

export default Banner;
