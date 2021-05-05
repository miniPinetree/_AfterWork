import React, { useState } from 'react';
import styled from 'styled-components';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { history } from '../redux/configStore';
import Permit from '../shared/Permit';
import CountDown from './CountDown';

function Banner(props) {
  const [search, setSearch] = useState('');

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
          {/* 회원일때만 퇴근 시간을 랜더링하므로 Permit으로 감싸줌 */}
          <Permit>
            <CountDown />
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
