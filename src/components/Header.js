import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import { history } from "../redux/configStore";

import { actionCreators as preferActions } from "../redux/modules/prefer";
import { actionCreators as userActions } from "../redux/modules/user";
import { debounce } from "lodash";
import { getCookie } from "../shared/Cookie";

import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import LoginModal from "./LoginModal";
import MoHeader from "./MobileHeader";
import UserModal from "./UserModal";
import header from "../shared/images/header.png";

const Header = () => {
    const dispatch = useDispatch();
    const cookie = getCookie("is_login");
    const user = useSelector((state) => state.user.user);
    const is_opened = useSelector((state) => state.prefer.is_opened);
    const is_loading = useSelector((state) => state.user.user_loading);
    const [isModal, setIsModal] = useState(false);
    const [userModal, setUserModal] = useState(false);

    const modalOpen = () => {
        setIsModal(true);
    };
    const modalClose = () => {
        setIsModal(false);
    };
    const userOpen = () => {
        if (!cookie) {
            history.replace("/");
        } else {
            setUserModal(true);
        }
    };
    const userClose = () => {
        setUserModal(false);
    };

    const [windowSize, setWindowSize] = useState(window.innerWidth);

    const handleResize = debounce(() => {
        setWindowSize(window.innerWidth);
    }, 100);

    useEffect(() => {
        if (is_opened) {
            setIsModal(true);
        }
        if (!isModal) {
            dispatch(preferActions.guideGuests(false));
        }
    }, [is_opened, dispatch, isModal]);

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [handleResize]);

    if (windowSize < 415) {
        return <MoHeader />;
    } else {
        return (
            <>
                <Wrap>
                    <Body>
                        <div>
                            <Logo
                                src={header}
                                onClick={() => {
                                    history.push("/");
                                }}
                                alt="header logo"
                            />
                        </div>

                        <div>
                            {is_loading ? null : cookie && user && user.image ? (
                                <>
                                    <Login onClick={userOpen} is_user>
                                        {user.name}님
                                    </Login>
                                    <ProfileImg src={user.image} onClick={userOpen}></ProfileImg>
                                </>
                            ) : cookie && user && !user.image ? (
                                <>
                                    <Login onClick={userOpen} is_user>
                                        {user.name}님
                                    </Login>
                                    <Avatar size={64} icon={<UserOutlined />} onClick={userOpen} />
                                </>
                            ) : (
                                <Login onClick={modalOpen}>로그인</Login>
                            )}

                            {isModal === true ? <LoginModal close={modalClose} /> : null}
                            {userModal === true ? <UserModal close={userClose} /> : null}
                        </div>
                    </Body>
                </Wrap>
            </>
        );
    }
};

const Wrap = styled.div`
    width: 100%;
    height: 60px;
    border-bottom: 1px solid #dbdbdb;
    position: sticky;
    top: 0px;
    padding: 14px 0;
    background: #fff;
    z-index: 4;
`;

const Body = styled.div`
    max-width: 1004px;
    display: flex;
    justify-content: space-between;
    vertical-align: middle;
    align-items: center;
    margin: 0 auto;
`;

const Logo = styled.img`
    width: 160px;
    cursor: pointer;
    height: 100%;
    margin-top: -8px;
    @media only screen and (max-width: 1024px) {
        margin-left: 26px;
    }
`;

const ProfileImg = styled.img`
    width: 30px;
    hegiht: 30px;
    object-fit: cover;
    border-radius: 40px;
    @media only screen and (max-width: 1024px) {
        margin-right: 26px;
    }
`;

const Login = styled.span`
    font-size: 16px;
    font-weight: normal;
    cursor: pointer;
    height: 100%;
    margin: ${(props) => (props.is_user ? "-4px 12px 0 0" : "0")};
    @media only screen and (max-width: 1024px) {
        margin-right: ${(props) => (props.is_user ? "12px" : "26px")};
    }
`;

export default Header;
