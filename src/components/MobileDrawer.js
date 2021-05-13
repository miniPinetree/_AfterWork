import { useEffect } from "react";
import "../shared/App.css";
import styled, { keyframes } from "styled-components";

import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import x from "../shared/images/x.svg";
import logOut from "../shared/images/log-out.svg";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as userActions } from "../redux/modules/user";
import { getCookie } from "../shared/Cookie";
import { history } from "../redux/configStore";

const MoDrawer = ({ drawerClose }, props) => {
    const dispatch = useDispatch();

    const category_list = useSelector((state) => state.post.category_list);
    const user = useSelector((state) => state.user?.user);
    const cookie = getCookie("is_login");

    useEffect(() => {
        if (category_list.length === 0) {
            dispatch(postActions.getCategoryDB());
        }
    }, [dispatch, category_list]);

    return (
        <>
            <Body>
                {cookie ? (
                    <>
                        <Head is_user>
                            <X
                                src={x}
                                alt="close"
                                onClick={() => {
                                    drawerClose();
                                }}
                            ></X>

                            <UserProfile>
                                <div>
                                    {user && user.image ? (
                                        <ProfileImg src={user.image}></ProfileImg>
                                    ) : (
                                        <Avatar size={64} icon={<UserOutlined />} />
                                    )}
                                </div>
                                <div>
                                    <Logo is_user>
                                        {user.name}님<Email>{user.email}</Email>
                                    </Logo>
                                </div>
                            </UserProfile>
                            <UserInfoBody>
                                <Info
                                    onClick={() => {
                                        history.push({
                                            pathname: "/userdetail",
                                            state: "회원정보 및 상세 설정",
                                        });
                                        drawerClose();
                                    }}
                                >
                                    회원정보
                                </Info>
                                <Info
                                    onClick={() => {
                                        history.push({
                                            pathname: "/mypage",
                                            state: "찜 목록",
                                        });
                                        drawerClose();
                                    }}
                                >
                                    찜 목록
                                </Info>
                            </UserInfoBody>
                        </Head>

                        <CategoryBody is_user>
                            <Name>카테고리</Name>
                            <hr></hr>
                            {category_list.map((p, idx) => {
                                return (
                                    <Category
                                        onClick={() => {
                                            history.replace({
                                                pathname: `/category/${p.categoryId}`,
                                                state: `${p.name}`,
                                            });
                                            window.scrollTo({ top: 0, left: 0 });
                                            drawerClose();
                                        }}
                                        key={idx}
                                    >
                                        {p.name}
                                    </Category>
                                );
                            })}
                        </CategoryBody>
                        <LogOutBody>
                            <LogOutImg src={logOut} alt="log out" />
                            <LogOut
                                onClick={() => {
                                    drawerClose();
                                    dispatch(userActions.logOut());
                                    history.replace("/");
                                }}
                            >
                                로그아웃
                            </LogOut>
                        </LogOutBody>
                    </>
                ) : (
                    <>
                        <Head>
                            <X
                                src={x}
                                alt="close"
                                onClick={() => {
                                    drawerClose();
                                }}
                            ></X>
                            <Logo
                                onClick={() => {
                                    history.replace({ pathname: "/login", state: "로그인" });
                                    drawerClose();
                                }}
                            >
                                로그인
                            </Logo>
                        </Head>

                        <CategoryBody>
                            <Name>카테고리</Name>
                            <hr></hr>
                            {category_list.map((p, idx) => {
                                return (
                                    <Category
                                        onClick={() => {
                                            history.replace({
                                                pathname: `/category/${p.categoryId}`,
                                                state: `${p.name}`,
                                            });
                                            window.scrollTo({ top: 0, left: 0 });
                                            drawerClose();
                                        }}
                                        key={idx}
                                    >
                                        {p.name}
                                    </Category>
                                );
                            })}
                        </CategoryBody>
                    </>
                )}
            </Body>

            <Back
                onClick={() => {
                    drawerClose();
                }}
            />
        </>
    );
};

const Back = styled.div`
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: #000000 0% 0% no-repeat padding-box;
    opacity: 0.3;
    backdrop-filter: blur(5px);
    position: fixed;
    z-index: 3;
`;

const openScale = keyframes`
    0%{
       width:0px ;
       opacity:0;
    }
    100% {
       width:278px ;
       opacity:1;
    }
`;

const Body = styled.div`
    position: fixed;
    height: 100%;
    width: 0;
    top: 0;
    max-width: 278px;
    background: #fff;
    z-index: 4;
    box-shadow: 0 6px 35px rgb(24 25 31 / 20%);
    overflow: auto;
    animation: ${openScale} 0.6s cubic-bezier(0.17, 0.67, 0.5, 1) forwards;
`;

const Head = styled.div`
    position: ${(props) => (props.is_user ? "" : "absolute")};
    display: block;
    height: ${(props) => (props.is_user ? "200px" : "160px")};
    width: 0;
    top: 0;
    padding: 0 20px;
    background: transparent linear-gradient(124deg, #8f6bf3 0%, #5c5ce3 100%) 0% 0% no-repeat
        padding-box;
    animation: ${openScale} 0.6s cubic-bezier(0.17, 0.67, 0.5, 1) forwards;
    border-radius: ${(props) => (props.is_user ? "none " : "0 0 20px 20px ")};
`;

const UserProfile = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    top: 72px;
`;

const ProfileImg = styled.img`
    width: 50px;
    hegiht: 50px;
    object-fit: cover;
    border-radius: 40px;
    margin-right: 16px;
`;

const openX = keyframes`
    0%{
        width:0px ;
       opacity:0;
    }
    100% {
        width:24px ;
       opacity:1;
    }
`;

const X = styled.img`
    position: absolute;
    top: 18px;
    left: 240px;
    animation: ${openX} 0.6s cubic-bezier(0.17, 0.67, 0.5, 1) forwards;
`;

const Logo = styled.h4`
    font: normal normal bold 16px Noto Sans CJK KR;
    letter-spacing: -0.66px;
    color: #fff;
    margin: ${(props) => (props.is_user ? "5px 0 " : "100px 0 ")};
    cursor: ${(props) => (props.is_user ? "" : "pointer")};
`;

const Email = styled.span`
    display: block;
    font-size: 12px;
    font-weight: 400;
`;

const openCategoryScale = keyframes`
    0%{
       width:0px ;
       opacity:0;
    }
    100% {
       width:244px ;
       opacity:1;
    }
`;

const CategoryBody = styled.div`
    position: ${(props) => (props.is_user ? "" : "absolute")};
    display: block;
    height: 100vh;
    top: ${(props) => (props.is_user ? "200px" : "160px")};
    height: 350px;
    background: #fff;
    padding: 16px;
    text-align: left;
    border-radius: 15px;
    z-index: 999;
    margin: 24px 18px;
    box-shadow: 0 6px 15px rgb(24 25 31 / 20%);
    animation: ${openCategoryScale} 0.6s cubic-bezier(0.17, 0.67, 0.5, 1) forwards;
`;

const Name = styled.span`
    display: block;
    font-weight: bold;
    font-size: 16px;
    color: #333;
    margin-bottom: 23px;
`;

const Category = styled.span`
    display: block;
    font-size: 14px;
    color: #333;
    z-index: 99;
    margin: 12px 0 24px 0;
    cursor: pointer;
`;

const openUserScale = keyframes`
    0%{
       width:0px ;
    }
    100% {
       width:244px ;
    }
`;

const UserInfoBody = styled.div`
    position: absolute;
    display: flex;
    justify-content: space-between;
    height: 48px;
    top: 140px;
    left: 16px;
    padding: 12px 40px;
    border-radius: 10px;
    background: transparent linear-gradient(127deg, #7059e0 0%, #5550d7 100%) 0% 0% no-repeat
        padding-box;
    animation: ${openUserScale} 0.6s cubic-bezier(0.17, 0.67, 0.5, 1) forwards;
`;

const Info = styled.span`
    display: inline;
    color: #fff;
    &:after {
        content: "";
        display: inline;
        position: fixed;
        width: 1px;
        height: 20px;
        top: 150px;
        left: 144px;
        background: #bbb;
    }
`;

const LogOutBody = styled.div`
    height: 48px;
    background: #fff;
    padding: 12px 16px;
    border-radius: 10px;
    z-index: 99;
    margin: 170px 18px 60px 18px;
    box-shadow: 0 6px 35px rgb(24 25 31 / 20%);
    animation: ${openCategoryScale} 0.6s cubic-bezier(0.17, 0.67, 0.5, 1) forwards;
`;

const LogOutImg = styled.img`
    width: 16px;
    margin-top: -3px;
`;

const LogOut = styled.span`
    display: inline-block;
    margin-left: 8px;
`;

export default MoDrawer;
