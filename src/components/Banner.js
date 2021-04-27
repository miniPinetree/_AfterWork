import React from 'react';
import styled from 'styled-components';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

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
      document.getElementById(id).innerHTML = '퇴근시간입니다!';
      return;
    }

    const hours = Math.floor((distance % _day) / _hour);
    const minutes = Math.floor((distance % _hour) / _minute);
    const seconds = Math.floor((distance % _minute) / _second);

    document.getElementById(id).innerHTML = hours + '시간 ';
    document.getElementById(id).innerHTML += minutes + '분 ';
    document.getElementById(id).innerHTML += seconds + '초';
  }
  timer = setInterval(showRemaining, 1000);
}

function Banner(props) {
  const now = new Date();
  const today = now.toLocaleDateString();
  CountDownTimer(today + '18:50:00', 'time');

  return (
    <>
      <Section>
        <Container>
          <Timmer id='time' />
          <InputBox>
            <Input
              placeholder='검색어를 입력하세요'
              suffix={<SearchOutlined style={{ color: '#000' }} />}
              style={{
                borderRadius: '29px',
                font: 'normal normal normal 20px/30px Noto Sans CJK KR',
                letterSpacing: '-0.6px',
                color: '#bdbdbd',
                boxSizing: 'border-box',
                padding: '9px 27px 12px 27px',
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
  height: 650px;
  background: transparent
    linear-gradient(180deg, #efefef 0%, #efefeff6 54%, #dadada00 100%) 0% 0%
    no-repeat padding-box;
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
  height: 95px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0px;
`;

const InputBox = styled.div`
  width: 512px;
  height: 50px;
  position: absolute;
  top: 367px;
  box-sizing: border-box;
`;

export default Banner;
