import React from "react";
import { Avatar } from "antd";
import { UserOutlined, RightOutlined } from "@ant-design/icons";
import styled from "styled-components";
const UserInfo =(props)=>{
    return(
        <>
        <Avatar size={80} icon={<UserOutlined />} />
        <InfoBox>
          <p>
            <strong>퇴근근</strong>님
          </p>
          <p>email@email.com</p>
          <p>서울 강남구</p>
        </InfoBox>
        </>
    );
};
export default UserInfo;

const InfoBox = styled.div`
  font-size: 17px;
  margin: auto 40px;
  & strong {
    font-size: 21px;
    font-weight: 600;
  }
  & p {
    margin: 0;
  }
`;