import React, { useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useDispatch } from "react-redux";
import { history } from "../redux/configStore";
import { actionCreators as userActions } from "../redux/modules/user";
import { debounce } from "lodash";

const UserModal = ({ close }, props) => {
    const dispatch = useDispatch();
    const modal = useRef();

    const handleClickOutside = debounce((e) => {
        if (!modal.current?.contains(e.target)) close();
    });

    useEffect(() => {
        window.addEventListener("click", handleClickOutside);
        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, [handleClickOutside]);

    return (
        <UserBody ref={modal}>
            <Content
                onClick={() => {
                    history.push("/mypage");
                    close();
                }}
            >
                찜 목록
            </Content>
            <Content
                onClick={() => {
                    history.push("/userdetail");
                    close();
                }}
            >
                내 정보
            </Content>
            <hr />
            <Content
                onClick={() => {
                    close();
                    dispatch(userActions.logOut());
                    history.push("/");
                }}
            >
                로그아웃
            </Content>
        </UserBody>
    );
};
const openScale = keyframes`
    
        0%{
            height:0px ;
            opacity:0;
            transform: translateX(-40%) ;
            transition: opacity .1s ease;
         }
         100% {
            height:124px ;
            opacity:1;
            transform: translateX(-40%) ;
            transition: opacity .1s ease;
         }
    
`;

const UserBody = styled.div`
    width: 150px;
    top: 110%;
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 10px #0000001a;
    border-radius: 20px 0px 20px 20px;
    position: absolute;
    margin: 0;
    padding: 16px;
    z-index: 4;
    animation: ${openScale} 0.4s cubic-bezier(0.17, 0.67, 0.5, 1) forwards;
`;

const Content = styled.span`
    text-align: left;
    font: normal normal medium 14px/20px Noto Sans CJK KR;
    letter-spacing: -0.42px;
    color: #333333;
    opacity: 1;
    display: block;
    margin-bottom: 8px;
    z-index: 5;
    &:hover {
        color: #7f58ec;
        cursor: pointer;
        font-weight: bold;
    }
`;

export default UserModal;
