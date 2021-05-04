import styled from "styled-components";

const Footer = () => {
    return (
        <Wrap>
            <Body>
                <span>
                    footer
                    <br />
                    개발자
                    <br />
                    이름
                    <br />
                </span>
            </Body>
        </Wrap>
    );
};

const Wrap = styled.div`
    width: 100%;
    background: #636363;
    height: 100%;
    padding: 66px 0;
    @media all and (max-width: 375px) {
        display: block;
        width: 100%;
        margin: 0;
        padding: 0;
    }
`;

const Body = styled.div`
    max-width: 1004px;
    text-align: left;
    margin: 0 auto;
    & > span {
        font-size: 20px;
        font-weight: normal;
        color: #fff;
        letter-spacing: -0.6px;
    }
    @media all and (max-width: 375px) {
        display: block;
        width: 375px;
        margin: 0;
    }
`;

export default Footer;
