import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { history } from "../redux/configStore";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import hamburgerIcon from "../shared/images/text-align-justified.svg";
import searchIcon from "../shared/images/search.svg";
import MoDrawer from "./MobileDrawer";

const MoHeader = (props) => {
    const location = useSelector((state) => state.router.location.pathname);
    const [search, setSearch] = useState("");
    const [isSearch, setIsSearch] = useState(false);
    const [isDrawer, setIsDrawer] = useState(false);

    const drawerOpen = () => {
        setIsDrawer(true);
    };
    const drawerClose = () => {
        setIsDrawer(false);
    };
    const searchOpen = () => {
        setIsSearch(true);
    };
    const searchClose = () => {
        setIsSearch(false);
    };

    const searchHandler = () => {
        if (search === "") {
            return;
        }
        history.push(`/find/search?keyword=${search}`);
        setSearch("");
        setIsSearch(false);
    };

    return (
        <>
            {isSearch ? (
                <Wrap is_search>
                    <Body>
                        <Input
                            placeholder="검색어를 입력하세요"
                            prefix={
                                <SearchOutlined
                                    style={{
                                        color: "#333",
                                        cursor: "pointer",
                                        fontSize: "20px",
                                    }}
                                    onClick={searchHandler}
                                />
                            }
                            value={search}
                            style={{
                                borderRadius: "29px",
                                fontSize: "14px",
                                letterSpacing: "-0.6px",
                                color: "#BDBDBD",
                                boxSizing: "border-box",
                                padding: "10px 20px",
                                width: "85%",
                                display: "flex",
                                textAlign: "left",
                                height: "40px",
                            }}
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                            onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    searchHandler();
                                }
                            }}
                        />
                        <div onClick={searchClose}>취소</div>
                    </Body>
                </Wrap>
            ) : (
                <Wrap>
                    <Body>
                        <Img>
                            <img
                                src={hamburgerIcon}
                                alt="hamburger menu"
                                onClick={drawerOpen}
                            ></img>
                        </Img>
                        <Logo
                            onClick={() => {
                                history.push("/");
                            }}
                        >
                            퇴근하고 뭐하지?
                        </Logo>
                        <Img>
                            <img src={searchIcon} alt="hamburger menu" onClick={searchOpen}></img>
                        </Img>
                    </Body>
                </Wrap>
            )}

            {isDrawer === true ? <MoDrawer drawerClose={drawerClose} /> : null}
        </>
    );
};

const Wrap = styled.div`
    width: 100%;
    height: 88px;
    position: sticky;
    top: 0px;
    padding: ${(props) => (props.is_search ? "42px 18px 2px 18px" : "48px 16px 0 16px")};
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
`;

const Img = styled.div`
    width: 24px;
`;

export default MoHeader;
