import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { history } from "../redux/configStore";
import hamburgerIcon from "../shared/images/text-align-justified.svg";
import searchIcon from "../shared/images/search.svg";
import homeIcon from "../shared/images/home.svg";
import MoDrawer from "./MobileDrawer";

const MoHeader = (props) => {
    const push = useSelector((state) => state.router.action);
    const titles = useSelector((state) => state.router.location.state);

    const [isDrawer, setIsDrawer] = useState(false);

    const drawerOpen = () => {
        setIsDrawer(true);
    };
    const drawerClose = () => {
        setIsDrawer(false);
    };

    return (
        <>
            <Wrap>
                <Body>
                    <Imgs>
                        <img src={hamburgerIcon} alt="hamburger menu" onClick={drawerOpen}></img>
                        {push === "PUSH" && titles !== undefined ? (
                            <img
                                src={homeIcon}
                                alt="home"
                                onClick={() => {
                                    history.push("/");
                                }}
                            ></img>
                        ) : push === "POP" && titles !== undefined ? (
                            <img
                                src={homeIcon}
                                alt="home"
                                onClick={() => {
                                    history.push("/");
                                }}
                            ></img>
                        ) : null}
                    </Imgs>
                    <Logo>
                        {push === "PUSH" && titles !== undefined ? (
                            titles
                        ) : push === "POP" && titles !== undefined ? (
                            titles
                        ) : (
                            <span onClick={() => history.push("/")}>퇴근하고뭐하지?</span>
                        )}
                    </Logo>
                    <Img>
                        {titles === "검색" ? null : (
                            <img
                                src={searchIcon}
                                alt="search"
                                onClick={() => {
                                    history.push({ pathname: "/search", state: "검색" });
                                }}
                            ></img>
                        )}
                    </Img>
                </Body>
            </Wrap>

            {isDrawer === true ? <MoDrawer drawerClose={drawerClose} /> : null}
        </>
    );
};

const Wrap = styled.div`
    width: 100%;
    height: 44px;
    position: sticky;
    top: 0px;
    padding: 10px 16px;
    background: #fff;
    z-index: 3;
    text-align: center;
    border-bottom: none;
    box-shadow: 0px 3px 16px rgb(24 25 31 / 10%);
`;

const Body = styled.div`
    max-width: 420px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
`;

const Logo = styled.span`
    font-size: 18px;
    font-weight: bold;
    letter-spacing: -0.6px;
    cursor: pointer;
    height: 100%;
    margin-top: -2px;
    @media only screen and (max-width: 415px) {
        transform: translate(-10px);
    }
`;

const Img = styled.div`
    width: 24px;
`;

const Imgs = styled.div`
    display: flex;
    justify-content: space-between;
`;

export default MoHeader;
