import styled, { keyframes } from "styled-components";
import { GOOGLE_AUTH_URL, KAKAO_AUTH_URL, NAVER_AUTH_URL } from "../shared/social";
import Swal from "sweetalert2";
import naver from "../shared/images/naver.png";
import kakao from "../shared/images/kakao.png";
import google from "../shared/images/google.png";
import logo from "../shared/images/login.png";
import more from "../shared/images/more.svg";
import share from "../shared/images/share.svg";

const LoginModal = ({ close }, props) => {
    const ua = navigator.userAgent.toLowerCase();
    return (
        <>
            <Modal
                onClick={() => {
                    close();
                }}
            >
                <ModalContent>
                    <Img src={logo} alt="login" />
                    {ua.indexOf("kakao") > -1 ? (
                        <A
                            onClick={() => {
                                Swal.fire({
                                    text: `카카오내에서 구글 로그인은\n할 수 없어요 🥺 `,
                                    confirmButtonColor: "#7F58EC",
                                    confirmButtonText: "확인",
                                });
                            }}
                            google
                        >
                            <SocialLogo src={google} />
                            <Span>구글 계정으로 시작하기</Span>
                        </A>
                    ) : (
                        <A href={GOOGLE_AUTH_URL} google>
                            <SocialLogo src={google} />
                            <Span>구글 계정으로 시작하기</Span>
                        </A>
                    )}
                    <A href={NAVER_AUTH_URL} naver>
                        <SocialLogo src={naver} />
                        <Span>네이버 계정으로 시작하기</Span>
                    </A>
                    <A href={KAKAO_AUTH_URL}>
                        <SocialLogo src={kakao} />
                        <Span kakao>카카오 계정으로 시작하기</Span>
                    </A>
                    <PDiv>
                        <P>
                            구글 로그인은 <Color>인앱 브라우저(카카오톡 등)</Color>에서 지원되지
                            <br /> 않습니다. 오류 발생시 더보기 &#40; <img src={more} alt="more" />,
                            &nbsp;
                            <InfoImg src={share} alt="share" />
                            &#41;를 눌러서 <Color>다른 브라우저(Chrome, Safari 등)</Color>에서
                            실행해주세요.
                        </P>
                    </PDiv>
                </ModalContent>
            </Modal>

            <Back
                onClick={() => {
                    close();
                }}
            />
        </>
    );
};

const Img = styled.img`
    display: block;
    width: 200px;
    margin: 56px auto;
`;

const Back = styled.div`
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100vh;
    background: #000000 0% 0% no-repeat padding-box;
    opacity: 0.3;
    backdrop-filter: blur(5px);
    position: fixed;
    z-index: 3;
`;

const openScale = keyframes`
    0%{
        transform: scale(0.8) ;
    }
    100% {
        transform: scale(1) ;
    }
`;

const Modal = styled.div`
    position: fixed;
    z-index: 4;
    left: 0;
    top: 0;
    opacity: 4;
    width: 100%;
    height: 100%;
`;

const ModalContent = styled.div`
    background: #fefefe;
    margin: 12% auto 20% auto;
    padding: 20px;
    border-radius: 15px;
    max-width: 420px;
    height: 440px;
    overflow: auto;
    opacity: 1;
    z-index: 99;
    box-shadow: 0 6px 35px rgb(24 25 31 / 20%);
    text-align: center;
    animation: ${openScale} 0.4s cubic-bezier(0.17, 0.67, 0.5, 1) forwards;
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

const PDiv = styled.div`
    margin: 0 auto;
    width: 316px;
`;

const P = styled.p`
    font-weight: 400;
    font-size: 12px;
    margin-top: 36px;
`;

const Color = styled.p`
    color: #7f58ec;
    display: inline;
`;

const InfoImg = styled.img`
    width: 14px;
    margin-top: -4px;
`;

export default LoginModal;
