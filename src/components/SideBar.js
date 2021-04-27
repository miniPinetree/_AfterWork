import React from 'react';
import styled from 'styled-components';
import Title from '../elements/Title';

function SideBar() {
  return (
    <>
      <SideBox>
        <Container>
          <Title>카테고리</Title>
          <List>
            <li>
              <span>운동/건강</span>
            </li>
            <li>
              <span>요리</span>
            </li>
            <li>
              <span>아트</span>
            </li>
            <li>
              <span>교육</span>
            </li>
            <li>
              <span>공예</span>
            </li>
            <li>
              <span>음악</span>
            </li>
          </List>
        </Container>
      </SideBox>
    </>
  );
}

const SideBox = styled.div`
  position: sticky;
  width: 433px;
  height: 100%;
  top: 60px;
  left: 0;
  z-index: 100;
  cursor: default;
`;

const Container = styled.div`
  text-align: center;
`;
const List = styled.ul`
  list-style: none;
  font-size: 19px;
  padding: 0;
  & li {
    & span {
      cursor: pointer;
    }
  }
`;

export default SideBar;
