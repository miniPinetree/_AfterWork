import React from "react";
import styled from "styled-components";
import {ItemCard} from "../components";
import Title from "../elements/Title";

const MyPage=(props)=>{
    return(
        <>
        <UserBox>
           
        <Title>마이 페이지</Title>
           
        </UserBox>
        <MarkList>
             <Title>찜 목록</Title>
        </MarkList>
        </>
    );
}
export default MyPage;


const UserBox = styled.div`

`;

const MarkList = styled.div`

`;