import React from "react";
import {history} from "../redux/configStore";
import { RightOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { ItemCard, UserInfo } from "../components";
import Title from "../elements/Title";

const MyPage = (props) => {
  return (
    <Container>
      <Title>마이 페이지</Title>

      <Profile>
        <Area1>
        <UserInfo/>
        </Area1>
        <DetailBtn onClick={()=>{
            history.push('/userdetail');
        }}>
          회원정보 및 상세 설정 <RightOutlined />
        </DetailBtn>
      </Profile>

      <MarkList>
        <TextBox>
          <Area1>
            <Title>찜 목록</Title>
            <p>총 {10}건</p>
          </Area1>

          <DeleteBox>
            <text>목록 전체 삭제</text>
            <hr />
          </DeleteBox>
        </TextBox>
        <ItemList>
          <ItemCard small />
          <ItemCard small />
          <ItemCard small />
          <ItemCard small />
        </ItemList>
        <ItemList>
          <ItemCard small />
          <ItemCard small />
          <ItemCard small />
          <ItemCard small />
        </ItemList>
      </MarkList>
    </Container>
  );
};

export default MyPage;

const Container = styled.div`
  width: 70%;
  min-width: 779px;
  margin: 0 auto;
`;
const TextBox = styled.div`
  display: flex;
  justify-content: space-between;
  & p {
    font-size: 17px;
    color: #6b6b6b;
    margin-top: 64px;
    font-weight: 100;
  }
`;
const Area1 = styled.div`
  display: flex;
`;
const DeleteBox = styled.div`
  display: inline-block;
  box-sizing: border-box-sizing;
  margin-top: 68px;
  & text {
    font-size: 14px;
    margin: 0px;
  }
  & hr {
    border: 0;
    height: 1px;
    background: #707070;
    margin: 0px;
  }
`;
const Profile = styled.div`
  width: 100%;
  height: 137px;
  box-sizing: border-box;
  border: 1px solid #707070;
  border-radius: 15px;
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 30px;
`;
const DetailBtn = styled.button`
  background-color: #575757;
  color: white;
  border: none;
  border-radius: 15px;
  padding: 3px 10px 3px 15px;
  position: absolute;
  bottom: 23px;
  right: 30px;
  text-align: center;
`;
const MarkList = styled.div`
  margin-bottom: 48px;
`;

const ItemList = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 18px;
  min-height: 220px;
`;
