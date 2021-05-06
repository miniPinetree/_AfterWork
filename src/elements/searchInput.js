import React, { useState } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { history } from "../redux/configStore";

const SearchInput = ({ onAddKeyword }) => {
    const [search, setSearch] = useState("");

    const handleKeyword = (e) => {
        setSearch(e.target.value);
    };

    const handleEnter = (e) => {
        if (search && e.keyCode === 13) {
            //엔터일때 부모의 addkeyword에 전달
            history.push(`/find/search?keyword=${search}`);
            onAddKeyword(search);
            setSearch("");
        }
    };

    return (
        <Input
            placeholder="검색어를 입력하세요"
            prefix={
                <SearchOutlined
                    style={{
                        color: "#333",
                        cursor: "pointer",
                        fontSize: "20px",
                    }}
                />
            }
            value={search}
            onChange={handleKeyword}
            onKeyDown={handleEnter}
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
    );
};

export default SearchInput;
