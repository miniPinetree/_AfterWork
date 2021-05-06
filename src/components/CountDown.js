import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { history } from '../redux/configStore';
import { useSelector } from 'react-redux';

function CountDown() {
  // 퇴근시간 카운트 다운
  const offTime = useSelector((state) => state.user.user?.offTime);
  const now = new Date();
  const today = now.toLocaleDateString();
  // 차이(퇴근시간 - 현재시간)
  let difference = +new Date(today + offTime) - +new Date();
  // 남은 시간 계산
  const calculateTimeLeft = () => {
    let timeLeft = {};
    // 차이가 양수일때만 계산 음수면 이미 퇴근이라 비활성화 할 것 이므로
    if (difference > 0) {
      timeLeft = {
        hours: `${Math.floor((difference / (1000 * 60 * 60)) % 24)}`,
        minutes: `${Math.floor((difference / 1000 / 60) % 60)}`,
        seconds: `${Math.floor((difference / 1000) % 60)}`,
      };
    }

    return timeLeft;
  };
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    // 타이머 1초 마다 갱신
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
      // 한자리 수는 01, 02 꼴로 나오게 처리
      <span key={idx}>
        {timeLeft[interval] < 10
          ? `0${timeLeft[interval]}`
          : `${timeLeft[interval]}`}
      </span>,
    );
  });

  return (
    <>
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
          {/* 남은 퇴근시간 카운트 */}
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
    </>
  );
}

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
  @media only screen and (max-width: 414px) {
    width: 172px;
    max-width: 172px;
    height: 58px;
    top: 133px;
    left: 0;
    border-radius: 7px;
  }
`;
const OffTimeTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  font-family: 'Noto Sans CJK KR';
  letter-spacing: -0.54px;
  color: #000000;
  @media only screen and (max-width: 414px) {
    font-size: 9px;
    letter-spacing: -0.27px;
  }
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
  @media only screen and (max-width: 414px) {
    font-size: 15px;
    & span {
      width: 36px;
    }
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
  @media only screen and (max-width: 414px) {
    width: 172px;
    max-width: 172px;
    height: 62px;
    top: 133px;
    left: 0;
    border-radius: 7px;
    & span {
      font-size: 12px;
      letter-spacing: -0.27px;
    }
    & button {
      width: 100px;
      font-size: 9px;
      height: 20px;
      padding: 0;
      margin-top: 5px;
    }
  }
`;

export default React.memo(CountDown);
