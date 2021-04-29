import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { CloseOutlined } from "@ant-design/icons";
import axios from "axios";
import { config } from "../config";

const OpiModal = ({ close }) => {
    const [opinion, setOpinion] = useState();
    const submit = () => {
        if (opinion === "" || opinion === undefined) {
            window.alert("내용을 입력해 주세요");
            return;
        }
        const opi = {
            content: opinion,
        };
        axios({
            method: "post",
            url: `${config.api}/feedback`,
            data: opi,
        })
            .then(function (response) {
                window.alert("후기가 작성되었습니다");
                close();
            })
            .catch((error) => {
                console.log(error.response);
            });
    };
    return (
        <>
            <Modal>
                <Head>
                    의견을 들려주세요!
                    <CloseOutlined
                        styled={{ color: "#666" }}
                        onClick={() => {
                            close();
                        }}
                    />
                </Head>
                <Body>
                    보내주신 의견은 서비스 개선에 <br />
                    많은 도움이 됩니다
                </Body>
                <Input
                    placeholder="퇴근하고 뭐하지는 어떠셨나요?"
                    rows="20"
                    type="text"
                    value={opinion}
                    maxLength="80"
                    onChange={(e) => {
                        setOpinion(e.target.value);
                    }}
                />
                <Button onClick={submit}>의견 남기기</Button>
            </Modal>
        </>
    );
};

const openScale = keyframes`
    0%{
        transform: scale(0.6) ;
    }
    100% {
        transform: scale(1)  translate(-5%, -5%);
    }
`;

const Modal = styled.div`
    position: fixed;
    height: 100vh;
    bottom: 42px;
    right: 42px;
    width: 100%;
    max-width: 280px;
    height: 370px;
    padding: 16px 24px;
    background: linear-gradient(#d3c4ff, #fff 80%);
    text-align: left;
    border-radius: 15px;
    z-index: 999;
    box-shadow: 0 6px 35px rgb(24 25 31 / 20%);
    animation: ${openScale} 0.4s cubic-bezier(0.17, 0.67, 0.5, 1) forwards;
`;

const Head = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font: normal normal normal 18px/33px Noto Sans CJK KR;
    letter-spacing: -0.66px;
    color: #444;
    margin: 0 auto 16px auto;
    width: 100%;
`;

const Body = styled.span`
    font-size: 14px;
    font-weight: 400;
    color: #666;
`;

const Input = styled.textarea`
    display: block;
    width: 100%;
    height: 120px;
    text-indent: 5px;
    margin: 52px auto 18px auto;
    border: 1px solid #c0c0c0;
    box-sizing: border-box;
    font-size: 14px;
    border-radius: 6px;
    &:focus {
        outline: #d3c4ff;
    }
`;

const Button = styled.button`
    display: block;
    margin: 0 auto;
    height: 48px;
    width: 100%;
    font-size: 14px;
    font-weight: bold;
    color: #fff;
    background: #d3c4ff;
    border: 1px solid #d3c4ff;
    border-radius: 6px;
    &:hover {
        background: #fff;
        color: #d3c4ff;
        transition: color 0.4s, background 0.4s;
    }
`;

export default OpiModal;
