import React, { useState } from 'react';
import styled from 'styled-components';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { history } from '../redux/configStore';

function SubBanner(props) {
  // 카테고리, 검색 페이지 검색창 배너
  const [search, setSearch] = useState('');
  const searchHandler = () => {
    // 공란이면 리턴
    if (search === '' || search.trim() === '') {
      return;
    }
    history.push(`/find/search?keyword=${search}`);
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
            maxLength={30}
            value={search}
            style={{
              borderRadius: '29px',
              fontSize: '18px',
              letterSpacing: '-0.6px',
              color: '#666',
              boxSizing: 'border-box',
              padding: '8px 27px 10px 27px',
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
  position: sticky;
  top: 60px;
  z-index: 3;
  background: transparent linear-gradient(102deg, #7f58ec 0%, #5c5ce3 100%) 0%
    0% no-repeat padding-box;
  display: flex;
  align-items: center;
  @media only screen and (max-width: 768px) {
    height: 75px;
  }
  @media only screen and (max-width: 414px) {
    display: none;
  }
`;

const InputBox = styled.div`
  width: 512px;
  max-width: 512px;
  height: 48px;
  box-sizing: border-box;
  margin: 0 auto;
  @media only screen and (max-width: 768px) {
    width: 388px;
  }
`;

export default SubBanner;
