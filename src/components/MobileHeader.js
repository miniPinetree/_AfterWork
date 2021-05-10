import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { history } from "../redux/configStore";

import hamburgerIcon from "../shared/images/text-align-justified.svg";
import searchIcon from "../shared/images/search.svg";
import homeIcon from "../shared/images/home.svg";
import header from "../shared/images/mobileHeader.png";
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
                    {titles !== undefined ? (
                        <>
                            <Imgs>
                                <img
                                    src={hamburgerIcon}
                                    alt="hamburger menu"
                                    onClick={drawerOpen}
                                ></img>

                                <img
                                    src={homeIcon}
                                    alt="home"
                                    onClick={() => {
                                        history.push("/");
                                    }}
                                ></img>
                            </Imgs>
                            <Logo isState>{titles}</Logo>
                        </>
                    ) : (
                        <>
                            <Imgs>
                                <img
                                    src={hamburgerIcon}
                                    alt="hamburger menu"
                                    onClick={drawerOpen}
                                ></img>
                            </Imgs>
                            <Logo>
                                <ImgLogo
                                    src={header}
                                    onClick={() => history.push("/")}
                                    alt="mobile header logo"
                                ></ImgLogo>
                            </Logo>
                        </>
                    )}
                    <Img>
                        <SearchImg
                            src={searchIcon}
                            alt="search"
                            onClick={() => {
                                history.replace({ pathname: "/search", state: "검색" });
                            }}
                        ></SearchImg>
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
        transform: ${(props) => (props.isState ? "translate(-15px)" : "")};
    }
`;

const Img = styled.div`
    width: 24px;
`;

const ImgLogo = styled.img`
    width: 160px;
    margin-top: -4px;
`;

const Imgs = styled.div`
    display: flex;
    justify-content: space-between;
`;

const SearchImg = styled.img`
    margin-top: -8px;
`;

export default MoHeader;
