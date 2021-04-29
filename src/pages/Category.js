import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Select, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';
import InfinityScroll from '../shared/InfinityScroll';
import SubBanner from '../components/SubBanner';
import PostCard from '../components/PostCard';
import SideBar from '../components/SideBar';

function Category(props) {
  const dispatch = useDispatch();
  const id = props.match.params.id;
  const [filterBox, setfilterBox] = useState('total');
  const [sortBox, setSortBox] = useState('popularity desc');
  const category_list = useSelector((state) => state.post.category_list);
  let post_list = useSelector((state) => state.post.post_list);
  const paging = useSelector((state) => state.post.paging);
  const is_loading = useSelector((state) => state.post.is_loading);
  const view_loading = useSelector((state) => state.post.view_loading);

  const idx = category_list.findIndex((val) => {
    return val.categoryId === parseInt(id);
  });

  const category = category_list[idx];

  const sortInfo = sortBox.split(' ');
  const sort = sortInfo[0];
  const direction = sortInfo[1];

  useEffect(() => {
    dispatch(postActions.getPostDB(id, sort, direction));
  }, [direction, dispatch, id, sort]);

  const { Option } = Select;

  const selectSort = (value) => {
    setSortBox(value);
  };
  const selectFilter = (value) => {
    setfilterBox(value);
  };
  if (filterBox === 'online') {
    post_list = post_list.filter((val) => {
      return val.online === true;
    });
  } else if (filterBox === 'offline') {
    post_list = post_list.filter((val) => {
      return val.online === false;
    });
  }

  return (
    <>
      <SubBanner />
      <Container>
        <SideBar />
        <MainContainer>
          {!view_loading ? (
            <>
              <MainHeader>
                <div>{category?.name}</div>

                <div>
                  <Select
                    defaultValue='popularity desc'
                    style={{ width: 112, marginRight: '15px' }}
                    onChange={selectSort}
                    value={sortBox}
                  >
                    <Option value='popularity desc'>인기순</Option>
                    <Option value='price asc'>가격 낮은순</Option>
                    <Option value='price desc'>가격 높은순</Option>
                  </Select>
                  <Select
                    defaultValue='total'
                    style={{ width: 94 }}
                    onChange={selectFilter}
                    value={filterBox}
                  >
                    <Option value='total'>전체보기</Option>
                    <Option value='online'>온라인</Option>
                    <Option value='offline'>오프라인</Option>
                  </Select>
                </div>
              </MainHeader>
              <Main>
                <InfinityScroll
                  callNext={() => {
                    dispatch(postActions.scrollGetPostDB());
                  }}
                  is_next={paging.page ? true : false}
                  loading={is_loading}
                >
                  {post_list.map((val, idx) => {
                    return <PostCard post_info={val} key={idx} />;
                  })}
                </InfinityScroll>
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
    margin-right: 20px;
    margin-bottom: 20px;
  }
`;
export default Category;
