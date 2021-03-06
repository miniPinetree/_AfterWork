import React, { useState } from "react";
import styled from "styled-components";
import SearchHistory from "../components/SearchHistory";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import { history } from "../redux/configStore";

const MobileSearch = () => {
    const [search, setSearch] = useState("");

    const handleKeyword = (e) => {
        setSearch(e.target.value);
    };
    //엔터시 검색
    const handleSearch = (e) => {
        // eslint-disable-next-line no-useless-escape
        let RegExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi; //정규식 구문
        // 특수문자 제한
        if (RegExp.test(search)) {
            Swal.fire({
                text: "특수문자를 제외하고 입력해주세요 😭",
                confirmButtonColor: "#7F58EC",
                confirmButtonText: "확인",
            });
            return;
        }
        if (search === "" || search.trim() === "") {
            return;
        }
        handleAddKeyword(search);
        setSearch("");
        history.replace(`/find/search?keyword=${search}`);
    };
    //아이콘 터치시 검색
    const handleSearchButton = (e) => {
        // eslint-disable-next-line no-useless-escape
        let RegExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi; //정규식 구문
        // 특수문자 제한
        if (RegExp.test(search)) {
            Swal.fire({
                text: "특수문자를 제외하고 입력해주세요 😭",
                confirmButtonColor: "#7F58EC",
                confirmButtonText: "확인",
            });
            return;
        }
        if (search === "" || search.trim() === "") {
            return;
        }
        handleAddKeyword(search);
        setSearch("");
        history.replace(`/find/search?keyword=${search}`);
    };

    //검색어 저장
    const handleAddKeyword = (search) => {
        let temp = [...keywords, search];
        temp.unshift(search);
        temp = [...new Set(temp)];
        setKeywords(temp);
        localStorage.setItem("searchHistory", JSON.stringify(temp));
    };

    //단일 검색어 삭제
    const handleRemoveKeyword = (id) => {
        let temp = keywords.filter((thisKeyword, index) => {
            return index !== id;
        });
        setKeywords(temp);
        localStorage.setItem("searchHistory", JSON.stringify(temp));
    };

    //검색어 전체 삭제
    const handleClearKeywords = (props) => {
        Swal.fire({
            text: "전부 삭제하시겠어요? 😲",
            showCancelButton: true,
            confirmButtonColor: "#7F58EC",
            confirmButtonText: "삭제",
            cancelButtonText: "취소",
        }).then((res) => {
            if (res.isConfirmed) {
                setKeywords([]);
                localStorage.setItem("searchHistory", "[]");
            }
        });
    };
    const [keywords, setKeywords] = useState(
        JSON.parse(localStorage.getItem("searchHistory") || "[]")
    );

    return (
        <>
            <Body>
                <Wrap>
                    <Input
                        placeholder="검색어를 입력하세요"
                        suffix={
                            <SearchOutlined
                                style={{
                                    color: "#333",
                                    cursor: "pointer",
                                    fontSize: "20px",
                                }}
                                onClick={(e) => {
                                    handleSearchButton(e);
                                }}
                            />
                        }
                        onSearch={(e) => {
                            handleSearch(e);
                        }}
                        maxLength={30}
                        value={search}
                        onChange={handleKeyword}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                handleSearch();
                            }
                        }}
                        style={{
                            borderRadius: "29px",
                            fontSize: "14px",
                            letterSpacing: "-0.6px",
                            color: "#BDBDBD",
                            boxSizing: "border-box",
                            padding: "10px 20px",
                            width: "100%",
                            display: "flex",
                            textAlign: "left",
                            height: "40px",
                        }}
                    />
                </Wrap>

                <SearchHistory
                    keywords={keywords}
                    onClearKeywords={handleClearKeywords}
                    onRemoveKeyword={handleRemoveKeyword}
                />
            </Body>
        </>
    );
};

const Body = styled.div`
    hegiht: 100%;
    display: block;
`;

const Wrap = styled.div`
    width: 100%;
    position: sticky;
    top: 0px;
    padding: 14px 16px;
    z-index: 3;
    text-align: center;
`;

export default MobileSearch;
