import { useState } from "react";
import styled from "styled-components";
import { history } from "../redux/configStore";
import LoginModal from "./LoginModal";

const Header = () => {
    const [isModal, setIsModal] = useState(false);
    const modalOpen = () => {
        setIsModal(true);
    };
    const modalClose = () => {
        setIsModal(false);
    };

    return (
        <>
            <Wrap>
                <Body>
                    <Logo
                        onClick={() => {
                            history.push("/");
                        }}
                    >
                        퇴근하고 뭐하지?
                    </Logo>
                    <Login onClick={modalOpen}>로그인</Login>
                    {isModal === true ? <LoginModal close={modalClose} /> : null}
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
`;

const Login = styled.span`
    font-size: 17px;
    font-weight: normal;
    cursor: pointer;
    height: 100%;
`;

export default Header;
