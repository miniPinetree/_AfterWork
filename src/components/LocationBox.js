import React from "react";
import styled from "styled-components";
import { Input } from "antd";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import locationOpts from "../shared/locationOpts";
import Swal from "sweetalert2";

const LocationBox=(props)=>{
    const {search, locations,setSearch,setLocations}=props;
    const inputStyle = {
        borderRadius: "29px",
        font: "normal normal normal 20px/30px Noto Sans CJK KR",
        letterSpacing: "-0.6px",
        color: "#606060",
        boxSizing: "border-box",
        padding: "9px 27px 12px 27px",
      }

//검색 키워드가 포함된 선택가능지역 리스트
  let searchedLocation = locationOpts.filter((option) => {
    return option.includes(search);
  });
//선택가능지역 클릭하여 추가
  const selectLocation = (val) => {
    if(locations.length>=5){
        Swal.fire({
          text: "관심지역은 5개까지 설정 가능합니다.",
          confirmButtonColor: "#7F58EC",
          confirmButtonText: "확인",
        });
      }else{
    setLocations([...locations, val]);
      }
  };
//선택가능지역이 하나이면 엔터로도 추가 가능
  const enterLocation = (e) => {
      if(e.keyCode !== 13){
          return;
      }else{
        if(locations.length>=5){
            Swal.fire({
              text: "관심지역은 5개까지 설정하실 수 있어요. 😧",
              confirmButtonColor: "#7F58EC",
              confirmButtonText: "확인",
            });
              }else{
                if (searchedLocation.length === 1) {
                  setLocations([...locations, ...searchedLocation]);
                  setSearch("");
                }
              }
      }
  };
  const deleteLocation = (val) => {
    let _location = locations.filter((l) => {
      return l !== val;
    });
    setLocations(_location);
  };
      return(
          <>
            <AreaList>
              {locations?.map((location, idx) => {
                return (
                  <Area>
                    {location}
                    <CloseOutlined
                      onClick={() => {
                        deleteLocation(location);
                      }}
                    />
                  </Area>
                );
              })}
            </AreaList>
            <hr color="#E8E8E8" />
            <p>지역 추가하기</p>
            <InputBox>
              <Input
                placeholder="지역을 입력하세요"
                suffix={
                  <SearchOutlined
                    style={{ color: "#000", cursor: "pointer" }}
                    onClick={enterLocation}
                  />
                }
                style={inputStyle}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                onKeyUp={(e)=>{enterLocation(e)}}
                value={search}
              />

              {searchedLocation.length !== locationOpts.length ? (
                <Autofill>
                  {searchedLocation.length === 0 ? (
                    <p>서비스 지역이 아닙니다</p>
                  ) : (
                    <p>원하는 지역을 선택해주세요</p>
                  )}
                  {searchedLocation.map((location, idx) => {
                    return (
                      <div
                        onClick={() => {
                          selectLocation(location);
                        }}
                      >
                        {location}
                      </div>
                    );
                  })}
                </Autofill>
              ) : null}
            </InputBox>
            </>
      );
};
export default React.memo(LocationBox);

const AreaList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 0px;
`;
const Area = styled.div`
  display: flex;
  min-width: 88px;
  height: 28px;
  background-color: #eeeeee;
  font-size: 15px;
  padding: 3.5px 5px 2.5px 11.53px;
  align-items: center;
  justify-content: space-between;
  margin: 0 13px 10px 0;
  & svg {
    margin-left: 2px;
  }
`;
const InputBox = styled.div`
  position: relative;
  & span {
    background-color: #eeeeee;
  }
  & input {
    background-color: #eeeeee;
  }
`;
const Autofill = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 5px 8px;
  font-size: 15px;
  position: absolute;
  left: 10%;
  background-color: #eeeeee;
  & p {
    margin-bottom: 3px;
    font-weight: 600;
  }
  & div {
    cursor: pointer;
    :hover {
      color: #7f58ec;
    }
  }
`;