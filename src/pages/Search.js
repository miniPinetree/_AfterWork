import React from 'react';
import styled from 'styled-components';
import { Select } from 'antd';
import SubBanner from '../components/SubBanner';
import ItemCard from '../components/ItemCard';
import SideBar from '../components/SideBar';

function Search(props) {
  const searchResult = props.match.params.keyword;
  const { Option } = Select;

  const handleChange = (value) => {
    console.log(value);
  };

  return (
    <>
      <SubBanner />
      <Container>
        <SideBar />
        <MainContainer>
          <MainHeader>
            <div>'{searchResult}' 검색 결과 0건 </div>

            <div>
              <Select
                defaultValue='인기순'
                style={{ width: 112, marginRight: '15px' }}
                onChange={handleChange}
              >
                <Option value='인기순'>인기순</Option>
                <Option value='가격 낮은순'>가격 낮은순</Option>
                <Option value='가격 높은순'>가격 높은순</Option>
              </Select>
              <Select
                defaultValue='전체보기'
                style={{ width: 94 }}
                onChange={handleChange}
              >
                <Option value='전체보기'>전체보기</Option>
                <Option value='온라인'>온라인</Option>
                <Option value='오프라인'>오프라인</Option>
              </Select>
            </div>
          </MainHeader>
          <Main>
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
          </Main>
        </MainContainer>
      </Container>
    </>
  );
}
const Container = styled.div`
  display: flex;
  color: #000;
`;

const MainContainer = styled.div`
  width: 60%;
  margin-left: 31px;
`;
const MainHeader = styled.div`
  margin: 35px 0 20px 10px;
  max-width: 85%;
  display: flex;
  justify-content: space-between;
`;
const Main = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  flex-wrap: wrap;
  cursor: default;
  & .wrap {
    margin-right: 10px;
    margin-bottom: 20px;
  }
`;
export default Search;
