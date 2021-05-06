import React from "react";
import styled from "styled-components";
import x from "../shared/images/searchX.svg";
import { history } from "../redux/configStore";

function SearchHistory({ keywords, onRemoveKeyword, onClearKeywords }) {
    if (keywords.length === 0 || localStorage.getItem("searchHistory") === null) {
        return <HistoryContainer>최근 검색된 기록이 없습니다.</HistoryContainer>;
    }
    return (
        <HistoryContainer>
            <HeaderContainer>
                <Title>최근 검색어</Title>
                <RemoveText onClick={onClearKeywords}>전체삭제</RemoveText>
            </HeaderContainer>
            <ListContainer>
                {keywords.map((p, idx) => {
                    return (
                        <KeywordContainer
                            onClick={() => {
                                history.push(`/find/search?keyword=${p}`);
                            }}
                        >
                            <Keyword>{p}</Keyword>
                            <X
                                src={x}
                                alt="remove search"
                                onClick={() => {
                                    onRemoveKeyword(idx);
                                }}
                            ></X>
                        </KeywordContainer>
                    );
                })}
            </ListContainer>
        </HistoryContainer>
    );
}

const HistoryContainer = styled.div`
    padding: 18px;
    cursor: pointer;
`;
const HeaderContainer = styled.div`
    overflow: hidden;
`;
const Title = styled.span`
    float: left;
    font-weight: 400;
    color: #666;
`;
const RemoveText = styled.span`
    float: right;
    color: #a7a7a7;
    font-size: 12px;
`;

const ListContainer = styled.ul`
    margin: 10px 0;
    padding: 0;
`;

const KeywordContainer = styled.li`
    overflow: hidden;
    background: #f2f2f2;
    border-radius: 6px;
    padding: 5px 0px 5px 12px;
    &:not(:last-child) {
        margin-bottom: 10px;
    }
`;

const X = styled.img`
    float: right;
    width: 30px;
    padding: 3px 5px;
`;

const Keyword = styled.span`
    font-size: 13px;
    font-weight: 400;
    color: #333;
`;

export default SearchHistory;
