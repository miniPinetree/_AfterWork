import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Select, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';
import InfinityScroll from '../shared/InfinityScroll';
import SubBanner from '../components/SubBanner';
import PostCard from '../components/PostCard';
import SideBar from '../components/SideBar';
import box from '../shared/images/box.png';

function Category(props) {
  // 카테고리 페이지
  const dispatch = useDispatch();
  const id = props.match.params.id;
  // 셀랙트 박스 상태
  const [filterBox, setfilterBox] = useState('total');
  const [sortBox, setSortBox] = useState('popularity desc');
  // 카테고리 정보
  const category_list = useSelector((state) => state.post.category_list);
  // 게시물 정보
  let post_list = useSelector((state) => state.post.post_list);
  // 페이지 정보
  const paging = useSelector((state) => state.post.paging);
  // 무한스크롤 로딩 정보
  const is_loading = useSelector((state) => state.post.is_loading);
  // 게시물 조회 로딩 정보
  const view_loading = useSelector((state) => state.post.view_loading);
  // 찜 목록
  const collection_list = useSelector((state) => state.prefer.collection);
  const collection = collection_list.map((val) => {
    return val.productId;
  });

  const idx = category_list.findIndex((val) => {
    return val.categoryId === parseInt(id);
  });

  // 카테고리 페이지 해당 카테고리
  const category = category_list[idx];

  const sortInfo = sortBox.split(' ');
  const sort = sortInfo[0];
  const direction = sortInfo[1];

  useEffect(() => {
    // 게시물 조회
    dispatch(postActions.getPostDB(id, sort, direction, filterBox));
  }, [dispatch, id, sort, direction, filterBox]);

  const { Option } = Select;

  // 정렬(가격순, 인기순)
  const selectSort = (value) => {
    setSortBox(value);
  };
  // 필터(온, 오프라인, 전체)
  const selectFilter = (value) => {
    setfilterBox(value);
  };

  return (
    <>
      <SubBanner />
      <Container>
        <SideBar categoryId={category?.categoryId} />
        <MainContainer>
          {!view_loading ? (
            <>
              <MainHeader>
                <Title>{category?.name}</Title>
                <SelectDiv>
                  <Sort>
                    <Select
                      defaultValue='popularity desc'
                      style={{ width: '100%' }}
                      onChange={selectSort}
                      value={sortBox}
                    >
                      <Option value='popularity desc'>인기순</Option>
                      <Option value='price asc'>가격 낮은순</Option>
                      <Option value='price desc'>가격 높은순</Option>
                    </Select>
                  </Sort>
                  <Filter>
                    <Select
                      defaultValue='total'
                      style={{ width: '100%' }}
                      onChange={selectFilter}
                      value={filterBox}
                    >
                      <Option value='total'>전체보기</Option>
                      <Option value='online'>온라인</Option>
                      <Option value='offline'>오프라인</Option>
                    </Select>
                  </Filter>
                </SelectDiv>
              </MainHeader>
              <Main>
                {post_list.length === 0 ? (
                  <>
                    {/* 항목 없을때 */}
                    <EmptyBox>
                      <img src={box} alt='empty' />
                      <p>항목이 없습니다!</p>
                    </EmptyBox>
                  </>
                ) : (
                  <>
                    <InfinityScroll
                      callNext={() => {
                        // 게시물 호출
                        dispatch(postActions.scrollGetPostDB());
                      }}
                      is_next={paging.page ? true : false}
                      loading={is_loading}
                    >
                      {post_list.map((val, idx) => {
                        return collection.includes(val.productId) === true ? (
                          <PostCard post_info={val} key={idx} like />
                        ) : (
                          <PostCard post_info={val} key={idx} />
                        );
                      })}
                    </InfinityScroll>
                  </>
                )}
              </Main>
            </>
          ) : (
            <Spin
              size='large'
              tip='Loading...'
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: '10',
              }}
            />
          )}
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
  position: relative;
  @media only screen and (max-width: 414px) {
    width: 100%;
    margin: 0 10px;
    min-height: 600px;
  }
`;
const MainHeader = styled.div`
  margin: 35px 0 20px 10px;
  max-width: 87%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media only screen and (max-width: 414px) {
    max-width: 100%;
    margin: 22px 10px 13px;
  }
`;
const SelectDiv = styled.div`
  display: flex;
`;
const Sort = styled.div`
  max-width: 112px;
  margin-right: 15px;
  @media only screen and (max-width: 414px) {
    & span {
      font-size: 10px;
    }
  }
`;

const Filter = styled.div`
  max-width: 94px;
  @media only screen and (max-width: 414px) {
    & span {
      font-size: 10px;
    }
  }
`;

const Title = styled.div`
  font-size: 16px;
  font-family: Noto Sans CJK KR;
  color: #000;
  cursor: default;
  @media only screen and (max-width: 414px) {
    font-size: 12px;
  }
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
    margin-right: 20px;
    margin-bottom: 20px;
  }
  @media only screen and (max-width: 414px) {
    justify-content: center;

    & .wrap {
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }
`;

const EmptyBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & img {
    max-width: 207px;
    max-height: 207px;
  }
  & p {
    font-size: 23px;
    font-family: Noto Sans CJK KR;
    letter-spacing: -0.69px;
    color: #676767;
  }
`;

export default Category;
