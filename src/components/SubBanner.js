import React, { useState } from 'react';
import styled from 'styled-components';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { history } from '../redux/configStore';

function SubBanner(props) {
  const [search, setSearch] = useState('');
  const searchHandler = () => {
    if (search === '') {
      return;
    }
    history.push(`/search?keyword=${search}`);
    setSearch('');
  };
  return (
    <>
      <Wrap>
        <InputBox>
          <Input
            placeholder='검색어를 입력하세요'
            suffix={
              <SearchOutlined
                style={{ color: '#7F58EC', cursor: 'pointer' }}
                onClick={searchHandler}
              />
            }
            value={search}
            style={{
              borderRadius: '29px',
              font: 'normal normal normal 20px/30px Noto Sans CJK KR',
              letterSpacing: '-0.6px',
              color: '#bdbdbd',
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
      </Wrap>
    </>
  );
}

const Wrap = styled.div`
  width: 100%;
  height: 100px;
  background: transparent linear-gradient(102deg, #7f58ec 0%, #5c5ce3 100%) 0%
    0% no-repeat padding-box;
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
