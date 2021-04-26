import styled, { keyframes } from "styled-components";

const LoginModal = ({ close }, props) => {
    return (
        <>
            <Modal>
                <Logo>퇴근하고 뭐하지?</Logo>
                <A href="/">
                    <SocialLogo />
                    <Span>구글 계정으로 시작하기</Span>
                </A>
                <A href="/">
                    <SocialLogo />
                    <Span>네이버 계정으로 시작하기</Span>
                </A>
                <A href="/">
                    <SocialLogo />
                    <Span>카카오 계정으로 시작하기</Span>
                </A>
            </Modal>

            <Back
                onClick={() => {
                    close();
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
        transform: scale(0) ;
    }
    100% {
        transform: scale(1) ;
    }
`;

const Modal = styled.div`
    position: fixed;
    height: 100vh;
    top: 30%;
    left: 38%;
    width: 100%;
    max-width: 400px;
    height: 350px;
    background: #fff;
    text-align: center;
    border-radius: 15px;
    z-index: 999;
    box-shadow: 0 6px 35px rgb(24 25 31 / 20%);
    animation: ${openScale} 0.4s cubic-bezier(0.17, 0.67, 0.5, 1) forwards;
`;

const Logo = styled.h4`
    font: normal normal bold 22px/33px Noto Sans CJK KR;
    letter-spacing: -0.66px;
    color: #000000;
    margin: 50px 0;
`;

const A = styled.a`
    display: flex;
    justify-content: space-between;
    font-style: none;
    width: 322px;
    height: 40px;
    align-items: center;
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 1px solid #707070;
    border-radius: 20px;
    margin: 0 auto 16px;
    cursor: pointer;
    padding: 0 80px 0 16px;
`;

const SocialLogo = styled.div`
    display: inline-block;
    width: 30px;
    height: 30px;
    background: #fff;
    border: 1px solid #707070;
    border-radius: 15px;
`;

const Span = styled.span`
    font-size: 15px;
    font-weight: 400;
    color: #000;
`;

export default LoginModal;
