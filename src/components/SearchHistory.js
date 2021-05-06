import React from "react";
import styled from "styled-components";
import x from "../shared/images/searchX.svg";

function SearchHistory({ keywords, onRemoveKeyword, onClearKeywords }) {
    console.log("searchHistory", keywords);
    if (keywords.length === 0) {
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
                        <KeywordContainer>
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
`;
const HeaderContainer = styled.div`
    overflow: hidden;
`;
const Title = styled.span`
    float: left;
    font-weight: 400;
    color: #666;
    font-size: ;
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

//&는 자기 자신을 나타냄
//즉, 나 자신(li)들에서 마지막 요소 값을 제외한 값에 margin-bottom 속성 지정
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
