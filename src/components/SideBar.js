import React from 'react';
import styled from 'styled-components';

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
  border-bottom: 3px solid #000;
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
