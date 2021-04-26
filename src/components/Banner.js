import React from 'react';
import styled from 'styled-components';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

function Banner(props) {
  return (
    <>
      <Section>
        <Container>
          <div>banner</div>
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
`;

const Container = styled.div`
  max-width: 1004px;
  margin: 0 auto;
  position: relative;
`;
const InputBox = styled.div`
  width: 512px;
  height: 50px;
  position: absolute;
  top: 367px;
  box-sizing: border-box;
`;

export default Banner;
