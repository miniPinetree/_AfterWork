import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { history } from "../redux/configStore";
import LoginModal from "./LoginModal";
import { actionCreators as userActions } from "../redux/modules/user";
import { deleteCookie } from "../shared/Cookie";

const Header = () => {
    const [isModal, setIsModal] = useState(false);
    const dispatch = useDispatch();
    const modalOpen = () => {
        setIsModal(true);
    };
    const modalClose = () => {
        setIsModal(false);
    };
    const user = useSelector((state) => state.user);

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
                        {user.is_login === true ? (
                            <>
                                <Login
                                    onClick={() => {
                                        dispatch(userActions.logOutDB());
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
`;

export default Header;
