import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { history } from "../redux/configStore";
import LoginModal from "./LoginModal";
import { actionCreators as userActions } from "../redux/modules/user";
import { getCookie } from "../shared/Cookie";
import { useEffect } from "react";
const Header = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [isModal, setIsModal] = useState(false);
    const modalOpen = () => {
        setIsModal(true);
    };
    const modalClose = () => {
        setIsModal(false);
    };

    const cookie = getCookie("accessToken");

    return (
        <>
            <Wrap>
                <Body>
                    <div>
                        <Logo
                            onClick={() => {
                                history.push("/");
                            }}
                        >
                            퇴근하고 뭐하지?
                        </Logo>
                        <About onClick={() => history.push("/about")}>About</About>
                    </div>
                    <div>
                        {cookie ? (
                            <>
                                <Login
                                    onClick={() => {
                                        dispatch(userActions.logOut());
                                    }}
                                >
                                    로그아웃
                                </Login>
                                <Login onClick={() => history.push("/mypage")}>
                                    {user.user.name}님
                                </Login>
                            </>
                        ) : (
                            <Login onClick={modalOpen}>로그인</Login>
                        )}
                        {isModal === true ? <LoginModal close={modalClose} /> : null}
                    </div>
                </Body>
            </Wrap>
        </>
    );
};

const Wrap = styled.div`
    width: 100%;
    height: 100%;
    border-bottom: 1px solid #707070;
    position: sticky;
    top: 0px;
    padding: 14px 0;
    background: #fff;
    z-index: 3;
`;

const Body = styled.div`
    max-width: 1004px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
`;

const Logo = styled.span`
    font-size: 20px;
    font-weight: bold;
    letter-spacing: -0.6px;
    cursor: pointer;
    height: 100%;
    margin-right: 24px;
`;

const About = styled.span`
    font-size: 16px;
    font-weight: normal;
    letter-spacing: -0.6px;
    cursor: pointer;
    height: 100%;
`;

const Login = styled.span`
    font-size: 17px;
    font-weight: normal;
    cursor: pointer;
    height: 100%;
    margin-left: 12px;
`;

export default Header;
