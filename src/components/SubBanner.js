import React from 'react';
import styled from 'styled-components';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

function SubBanner(props) {
  return (
    <>
      <Wrap>
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
      </Wrap>
    </>
  );
}

const Wrap = styled.div`
  width: 100%;
  height: 100px;
  background: #efefef;
  display: flex;
  align-items: center;
`;

const InputBox = styled.div`
  width: 512px;
  height: 50px;
  box-sizing: border-box;
  margin: 0 auto;
`;

export default SubBanner;
