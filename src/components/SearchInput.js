import React, { useState } from 'react';
import styled from 'styled-components';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { history } from '../redux/configStore';

function SearchInput() {
  // 배너 검색 창
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
    </>
  );
}

const InputBox = styled.div`
  width: 51%;
  height: 50px;
  position: absolute;
  top: 367px;
  box-sizing: border-box;
  @media only screen and (max-width: 414px) {
    display: none;
  }
`;

export default SearchInput;
