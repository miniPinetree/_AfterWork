import React from "react";
import styled from "styled-components";
import logo from "../shared/images/footer.png";

import { useSelector } from "react-redux";
import { history } from "../redux/configStore";

const Footer = () => {
    const titles = useSelector((state) => state.router.location.pathname);

    if (titles !== "/") {
        return null;
    }
    return (
        <Wrap>
            <Body>
                <Logo src={logo} alt="logo"></Logo>
                <Normal>
                    <A
                        href="https://www.notion.so/f6996fa9da9448928340463d6f5bd851"
                        target="#"
                        rel="noreferrer noopener"
                    >
                        팀원 소개
                    </A>
                    &nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;
                    <A
                        onClick={() => {
                            history.push("/privacy");
                            window.scrollTo({ top: 0, left: 0 });
                        }}
                    >
                        개인정보 처리 방침
                    </A>
                </Normal>
                <Bold>ⓒ 2021. Afterwork all rights reserved</Bold>
            </Body>
        </Wrap>
    );
};

const Wrap = styled.div`
    width: 100%;
    background: #636363;
    height: 120px;
    padding: 50px 0;
    margin-top: 160px;
    background: #fafbfc 0% 0% no-repeat padding-box;
    border: 1px solid #e4e8eb;
    @media all and (max-width: 768px) {
        display: block;
        width: 100%;
        margin-top: 120px;
        padding: 25px 20px;
        height: 140px;
    }
`;

const Body = styled.div`
    max-width: 1004px;
    text-align: left;
    margin: 0 auto;
    @media all and (max-width: 768px) {
        display: block;
        width: 314px;
        margin: 0;
    }
`;

const Logo = styled.img`
    width: 150px;
    @media all and (max-width: 768px) {
        display: block;
        width: 120px;
    }
`;

const Normal = styled.span`
    text-align: left;
    font: normal normal medium 14px/19px Noto Sans CJK KR;
    letter-spacing: -0.28px;
    color: #666666;
    opacity: 1;
    margin: 0 5%;
    @media all and (max-width: 768px) {
        display: block;
        margin: 16px 0 2px 0;
        font-size: 12px;
    }
`;

const Bold = styled.span`
    text-align: left;
    font: normal normal medium 14px/19px Noto Sans CJK KR;
    letter-spacing: 0px;
    color: #333333;
    opacity: 1;
    @media all and (max-width: 768px) {
        font-size: 12px;
        display: block;
    }
`;

const A = styled.a`
    text-decoration: none;
    color: #333;
    &:hover {
        color: #333;
    }
`;

export default Footer;
