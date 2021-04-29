import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';
import { history } from '../redux/configStore';

function SideBar(props) {
  const dispatch = useDispatch();
  const category_list = useSelector((state) => state.post.category_list);

  useEffect(() => {
    if (category_list.length === 0) {
      dispatch(postActions.getCategoryDB());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Wrap>
        <SideBox>
          <Container>
            <Title>카테고리</Title>
            <List>
              {category_list.map((val, idx) => {
                return (
                  <li
                    key={idx}
                    onClick={() => {
                      history.push(`/category/${val.categoryId}`);
                      window.scrollTo({ top: 0, left: 0 });
                    }}
                  >
                    <span>{val.name}</span>
                  </li>
                );
              })}
            </List>
          </Container>
        </SideBox>
      </Wrap>
    </>
  );
}
const Wrap = styled.div`
  background: #555555 0% 0% no-repeat padding-box;
  color: #ffffff;
`;

const SideBox = styled.div`
  position: sticky;
  width: 433px;
  top: 60px;
  left: 0;
  z-index: 100;
  cursor: default;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.div`
  display: inline-block;
  margin-top: 35px;
  font-size: 23px;
  letter-spacing: -0.69px;
  border-bottom: 3px solid #fff;
`;
const List = styled.ul`
  list-style: none;
  font-size: 19px;
  margin-top: 48px;
  letter-spacing: -0.57px;
  padding: 0;
  & li {
    margin-top: 20px;
    & span {
      cursor: pointer;
    }
  }
`;

export default SideBar;
