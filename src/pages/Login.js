import styled from "styled-components";
import { GOOGLE_AUTH_URL, KAKAO_AUTH_URL, NAVER_AUTH_URL } from "../shared/social";
import naver from "../shared/images/naver.png";
import kakao from "../shared/images/kakao.png";
import google from "../shared/images/google.png";
import logo from "../shared/images/login.png";

const Login = () => {
    return (
        <>
            <Body>
                <Img src={logo} alt="login" />
                <A href={GOOGLE_AUTH_URL} google>
                    <SocialLogo src={google} />
                    <Span>구글 계정으로 시작하기</Span>
                </A>
                <A href={NAVER_AUTH_URL} naver>
                    <SocialLogo src={naver} />
                    <Span>네이버 계정으로 시작하기</Span>
                </A>
                <A href={KAKAO_AUTH_URL}>
                    <SocialLogo src={kakao} />
                    <Span kakao>카카오 계정으로 시작하기</Span>
                </A>
            </Body>
        </>
    );
};

const Img = styled.img`
    width: 200px;
    margin: 24px 4px 44px 0;
`;

const Body = styled.div`
    text-align: center;
    margin: 40% 0;
`;

const A = styled.a`
    display: flex;
    justify-content: space-between;
    font-style: none;
    width: 322px;
    height: 40px;
    align-items: center;
    background: ${(props) => (props.google ? "#dc4e41;" : props.naver ? "#00C63B;" : "#FCE000;")}
    border-radius: 20px;
    margin: 0 auto 16px;
    cursor: pointer;
    padding: 0 80px 0 16px;
`;

const SocialLogo = styled.img`
    display: inline-block;
    width: 30px;
    height: 30px;
`;

const Span = styled.span`
    font-size: 15px;
    font-weight: 400;
    color: ${(props) => (props.kakao ? "#3C1E20" : "#fff")};
`;

export default Login;
