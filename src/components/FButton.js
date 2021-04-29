import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

import OpiModal from "./OpiModal";

const FButton = () => {
    const [isModal, setIsModal] = useState(false);
    const modalOpen = () => {
        setIsModal(true);
    };
    const modalClose = () => {
        setIsModal(false);
    };

    return (
        <>
            {isModal === true ? (
                <OpiModal close={modalClose} />
            ) : (
                <Body onClick={modalOpen}>
                    <Icon />
                    <Opi>의견을 들려주세요</Opi>
                </Body>
            )}
        </>
    );
};

const openScale = keyframes`
    0%{
        transform: scale(0);
        
    }
    100% {
        transform: scale(1) ;
    }
`;

const Body = styled.div`
    cursor: pointer;
`;

const Icon = styled.div`
    position: fixed;
    height: 52px;
    width: 52px;
    bottom: 52px;
    right: 52px;
    border-radius: 30px;
    background: #d6d6d6 0% 0% no-repeat padding-box;
    box-shadow: 3px 3px 6px rgb(24 25 31 / 10%);
    z-index: 2;
    animation: ${openScale} 0.6s cubic-bezier(0.17, 0.67, 0.5, 1) forwards;
`;

const Opi = styled.div`
    position: fixed;
    height: 52px;
    width: 168px;
    bottom: 52px;
    right: 52px;
    font-size: 12px;
    font-weight: normal;
    border-radius: 30px;
    background: #ededed 0% 0% no-repeat padding-box;
    box-shadow: 3px 3px 6px rgb(24 25 31 / 10%);
    z-index: 1;
    padding: 16px 36px 16px 16px;
    animation: ${openScale} 0.6s cubic-bezier(0.17, 0.67, 0.5, 1) forwards;
`;

export default FButton;
