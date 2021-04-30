import React from "react";
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import {useSelector} from "react-redux";
import styled from "styled-components";

const UserInfo =(props)=>{
const user = useSelector((state)=>state.user.user);
    return(
        <>
        {user.image?
        <UserImg src={user.image}/>
        : <Avatar size={64} icon={<UserOutlined />} />}
        <InfoBox>
          <p>
            <strong>{user.name}</strong>님
          </p>
          <p>{user.email}</p>
        </InfoBox>
        </>
    );
};
export default React.memo(UserInfo);

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
const UserImg = styled.img`
width:80px;
height:80px;
object-fit:cover;
border-radius:40px;
`;