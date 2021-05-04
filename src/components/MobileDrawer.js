import { useEffect } from "react";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styled, { keyframes } from "styled-components";
import x from "../shared/images/x.svg";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/configStore";

const MoDrawer = ({ drawerClose }, props) => {
    const dispatch = useDispatch();

    const category_list = useSelector((state) => state.post.category_list);
    const user = useSelector((state) => state.user?.user);

    useEffect(() => {
        if (category_list.length === 0) {
            dispatch(postActions.getCategoryDB());
        }
    }, []);

    return (
        <>
            <Body>
                {user ? (
                    <>
                        <Head is_user>
                            <X
                                src={x}
                                alt="close"
                                onClick={() => {
                                    drawerClose();
                                }}
                            ></X>

                            <Flex>
                                <div>
                                    {user && user.image ? (
                                        <ProfileImg src={user.image}></ProfileImg>
                                    ) : (
                                        <Avatar size={64} icon={<UserOutlined />} />
                                    )}
                                </div>
                                <div>
                                    <Logo is_user>
                                        {user.name}님<Emial>{user.email}</Emial>
                                    </Logo>
                                </div>
                            </Flex>
                        </Head>
                        <InfoBody>
                            <Info
                                onClick={() => {
                                    history.push("/userdetail");
                                    drawerClose();
                                }}
                            >
                                회원정보
                            </Info>
                            <span
                                onClick={() => {
                                    history.push("/mypage");
                                    drawerClose();
                                }}
                            >
                                찜 목록
                            </span>
                        </InfoBody>
                        <CategoryBody is_user>
                            <Name>카테고리</Name>
                            <hr></hr>
                            {category_list.map((p) => {
                                return (
                                    <Category
                                        onClick={() => {
                                            history.push(`/category/${p.categoryId}`);
                                            window.scrollTo({ top: 0, left: 0 });
                                            drawerClose();
                                        }}
                                        key={p}
                                    >
                                        {p.name}
                                    </Category>
                                );
                            })}
                        </CategoryBody>
                        <LogOut
                            onClick={() => {
                                drawerClose();
                                dispatch(userActions.logOut());
                                history.push("/");
                            }}
                        >
                            로그아웃
                        </LogOut>
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
                                    history.push("/login");
                                    drawerClose();
                                }}
                            >
                                로그인
                            </Logo>
                        </Head>

                        <CategoryBody>
                            <Name>카테고리</Name>
                            <hr></hr>
                            {category_list.map((p) => {
                                return (
                                    <Category
                                        onClick={() => {
                                            history.push(`/category/${p.categoryId}`);
                                            window.scrollTo({ top: 0, left: 0 });
                                            drawerClose();
                                        }}
                                        key={p}
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
    height: 100vh;
    background: #000000 0% 0% no-repeat padding-box;
    opacity: 0.3;
    backdrop-filter: blur(5px);
    position: fixed;
    z-index: 99;
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
    height: 100vh;
    width: 0;
    top: 0;
    max-width: 278px;
    background: #fff;
    z-index: 999;
    box-shadow: 0 6px 35px rgb(24 25 31 / 20%);
    overflow: scroll;
    animation: ${openScale} 0.6s cubic-bezier(0.17, 0.67, 0.5, 1) forwards;
`;

const Head = styled.div`
    position: absolute;
    display: block;
    height: 185px;
    width: 0;
    top: 0;
    padding: 0 20px;
    background: transparent linear-gradient(124deg, #8f6bf3 0%, #5c5ce3 100%) 0% 0% no-repeat
        padding-box;
    animation: ${openScale} 0.6s cubic-bezier(0.17, 0.67, 0.5, 1) forwards;
    border-radius: ${(props) => (props.is_user ? "none " : "0 0 20px 20px ")};
`;

const Flex = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    top: 96px;
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
    top: 54px;
    left: 240px;
    animation: ${openX} 0.6s cubic-bezier(0.17, 0.67, 0.5, 1) forwards;
`;

const Logo = styled.h4`
    font: normal normal bold 16px Noto Sans CJK KR;
    letter-spacing: -0.66px;
    color: #fff;
    margin: ${(props) => (props.is_user ? "5px 0 " : "125px 0 ")};
    cursor: ${(props) => (props.is_user ? "" : "pointer")};
`;

const Emial = styled.span`
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
    position: fixed;
    height: 100vh;
    top: ${(props) => (props.is_user ? "230px" : "200px")};
    left: 16px;
    height: 350px;
    background: #fff;
    padding: 16px;
    text-align: left;
    border-radius: 15px;
    z-index: 999;
    box-shadow: 0 6px 35px rgb(24 25 31 / 20%);
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

const InfoBody = styled.div`
    position: fixed;
    display: flex;
    justify-content: space-between;
    height: 48px;
    top: 164px;
    left: 16px;
    background: #fff;
    padding: 12px 40px;
    border-radius: 10px;
    z-index: 99;
    box-shadow: 0 6px 35px rgb(24 25 31 / 20%);
    animation: ${openCategoryScale} 0.6s cubic-bezier(0.17, 0.67, 0.5, 1) forwards;
`;

const Info = styled.span`
    display: inline;
    &:after {
        content: "";
        display: inline;
        position: fixed;
        width: 1px;
        height: 20px;
        top: 178px;
        left: 144px;
        z-index: 999;
        background: #bbb;
    }
`;

const LogOut = styled.span`
    position: absolute;
    top: 612px;
    left: 24px;
    z-index: 999;
    color: #333;
    font-size: 12px;
`;

export default MoDrawer;
