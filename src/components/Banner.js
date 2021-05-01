import React, { useState } from 'react';
import styled from 'styled-components';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { history } from '../redux/configStore';
import Permit from '../shared/Permit';
import { useSelector } from 'react-redux';

function CountDownTimer(dt, id) {
  const end = new Date(dt);
  const _second = 1000;
  const _minute = _second * 60;
  const _hour = _minute * 60;
  const _day = _hour * 24;
  let timer;
  function showRemaining() {
    const now = new Date();
    const distance = end - now;
    if (document.getElementById(id) === null) {
      clearInterval(timer);
      return;
    }
    if (distance < 0) {
      clearInterval(timer);
      document.getElementById(id).textContent = '퇴근시간입니다!';
      return;
    }

    const hours = Math.floor((distance % _day) / _hour);
    const minutes = Math.floor((distance % _hour) / _minute);
    const seconds = Math.floor((distance % _minute) / _second);

    document.getElementById(id).textContent = hours + '시간 ';
    document.getElementById(id).textContent += minutes + '분 ';
    document.getElementById(id).textContent += seconds + '초';
  }
  timer = setInterval(showRemaining, 1000);
}

function Banner(props) {
  const [search, setSearch] = useState('');
  const now = new Date();
  const today = now.toLocaleDateString();
  const offTime = useSelector((state) => state.user.user?.offTime);
  CountDownTimer(today + offTime, 'time');

  const searchHandler = () => {
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
          <Permit>
            {offTime === null ? (
              <SettingBox>
                <span>퇴근 시간을 설정해주세요!</span>
                <div style={{ textAlign: 'center' }}>
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
              <Timmer id='time' />
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

const Timmer = styled.div`
  width: 357px;
  max-width: 357px;
  height: 102px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0px;
  background: #fff;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
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
  width: 512px;
  height: 50px;
  position: absolute;
  top: 367px;
  box-sizing: border-box;
`;

export default Banner;
