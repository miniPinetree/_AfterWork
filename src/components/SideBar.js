import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';
import { history } from '../redux/configStore';

function SideBar(props) {
  const dispatch = useDispatch();
  // 해당 페이지 카테고리 id
  const categoryNum = props.categoryId;
  const category_list = useSelector((state) => state.post.category_list);

  useEffect(() => {
    if (category_list.length === 0) {
      // 카테고리 정보 불러오기
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
                    id={val.categoryId}
                    onClick={() => {
                      history.push(`/category/${val.categoryId}`);
                      window.scrollTo({ top: 0, left: 0 });
                    }}
                    // 해당 카테고리 페이지가 어떤 것인지 사이드바에서 표시
                    className={val.categoryId === categoryNum ? 'active' : ''}
                  >
                    <div>
                      <span>{val.name}</span>
                    </div>
                    <div className='arr'>
                      <span></span>
                    </div>
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
  background: #f6f6f6 0% 0% no-repeat padding-box;
  color: #000000;
  @media only screen and (max-width: 414px) {
    display: none;
  }
`;

const SideBox = styled.div`
  position: sticky;
  width: 433px;
  top: 160px;
  left: 0;
  z-index: 3;
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
  margin-top: 44px;
  font-size: 23px;
  font-weight: bold;
  color: #000;
  letter-spacing: -0.69px;
`;
const List = styled.ul`
  list-style: none;
  font-size: 19px;
  margin-top: 25px;
  letter-spacing: -0.57px;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  & li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 59%;
    height: 49px;
    padding: 8px 13px;

    &:hover {
      background: #ffffff 0% 0% no-repeat padding-box;
      border-radius: 7px;
      .arr span::after {
        content: '';
        display: flex;
        width: 8px;
        height: 8px;
        border-top: 1px solid #000;
        border-right: 1px solid #000;
        transform: rotate(45deg);
      }
    }
  }

  & span {
    cursor: pointer;
  }

  .active {
    background: #ffffff 0% 0% no-repeat padding-box;
    border-radius: 7px;
    .arr span::after {
      content: '';
      display: flex;
      width: 8px;
      height: 8px;
      border-top: 1px solid #000;
      border-right: 1px solid #000;
      transform: rotate(45deg);
    }
  }
`;

export default React.memo(SideBar);
