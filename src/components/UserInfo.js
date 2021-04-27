import React from "react";
import {useSelector} from "react-redux";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styled from "styled-components";
const UserInfo =(props)=>{
const user = useSelector((state)=>state.user.user);
    return(
        <>
        <Avatar size={80} icon={<UserOutlined />} />
        <InfoBox>
          <p>
            <strong>{user.nickname}</strong>님
          </p>
          <p>{user.email}</p>
          <p>{user.address}</p>
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