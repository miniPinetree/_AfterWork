import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SearchHistory from "../components/SearchHistory";
import SearchInput from "../elements/searchInput";

const MobileSearch = () => {
    const [keywords, setKeywords] = useState(
        JSON.parse(localStorage.getItem("searchHistory") || "[]")
    );

    useEffect(() => {
        localStorage.getItem("searchHistory");
    }, [keywords]);

    const handleAddKeyword = (search) => {
        console.log("text", search);
        // const newKeyword = {
        //     id: Date.now(),
        //     text: search,
        // };
        localStorage.setItem("searchHistory", JSON.stringify([search]));
    };

    const handleRemoveKeyword = (id) => {
        const nextKeyword = keywords.filter((thisKeyword) => {
            return thisKeyword.id !== id;
        });
        setKeywords(nextKeyword);
    };

    //검색어 전체 삭제
    const handleClearKeywords = () => {
        setKeywords([]);
    };

    return (
        <>
            <Body>
                <Wrap>
                    <SearchInput onAddKeyword={handleAddKeyword} />
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
    hegiht: 100vmax;
    display: block;
`;

const Wrap = styled.div`
    width: 100%;
    position: sticky;
    top: 0px;
    padding: 14px 16px;
    background: #fff;
    z-index: 3;
    text-align: center;
`;

export default MobileSearch;
