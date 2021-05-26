import React, {useEffect, useState, useRef} from "react";
import styled, {css} from "styled-components";
import { Input } from "antd";
import { SearchOutlined, CloseOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import locationOpts from "../shared/locationOpts";
import Swal from "sweetalert2";

const LocationBox = (props) => {
  const { search, locations, setSearch, setLocations } = props;
  const user = useSelector((state) => state.user.user);
  const [selectedIndex, setIndex] = useState(-1);
  const sequence = useRef(5);
  const scrollTarget = useRef();
  useEffect(() => {
    if (locations.length === 0 && user.locations.length > 0) {
      const locationNames = user.locations.map((location) => location.name);
      setLocations(locationNames);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  useEffect(() => {
    setIndex(-1);
    sequence.current = 5;
  }, [search]);

  //검색 키워드가 포함된 지역 필터링
  let searchedLocation = locationOpts.filter((option) => {
    return option.includes(search);
  });

  // 키보드로 자동완성리스트 항목 이동
  const moveOpt = (e)=>{
    if(searchedLocation.length === 0 || searchedLocation.length === locationOpts.length){
      return;
    }else{
      if (e.key === "ArrowDown" && selectedIndex<searchedLocation.length-1){
        setIndex(selectedIndex+1);
        if(sequence.current===5 && selectedIndex>=5){
          scrollTarget.current.scrollBy(0,23.2);
        };
        if(sequence.current<5){
          sequence.current += 1;
        };
      }else if(e.key === "ArrowUp" && selectedIndex>=0){
        setIndex(selectedIndex-1);
        if(sequence.current===0 && scrollTarget.current.scrollTop>0){
          scrollTarget.current.scrollBy (0,-23.2);
        };
        if(sequence.current>0){
          sequence.current -= 1;
        };
      }
    }
  };
  const alertMaxLocation = ()=>{
    Swal.fire({
      text: "관심지역은 4개까지 설정 가능합니다.",
      confirmButtonColor: "#7F58EC",
      confirmButtonText: "확인",
    });
    setSearch("");
  };
  // 지역 추가 전 중복 검사
  const checkSameLocation = (locationFullName)=>{
    setSearch("");
    let _location = locationFullName.split(" ");
    _location = _location.length>1 && _location[1] !=="전체" ? _location[1] : _location[0];
    if(locations.includes(_location)){
      Swal.fire({
        text: "이미 등록된 지역입니다.",
        confirmButtonColor: "#7F58EC",
        confirmButtonText: "확인",
      });
      return false;
    }else{
      return _location;
    }
  };
  //선택가능지역 클릭하여 추가
  const selectLocation = (selectedLocation) => {
    if (locations.length >= 4) {
      alertMaxLocation();
      return;
    } else {
      if(checkSameLocation(selectedLocation)){
        setLocations([...locations, checkSameLocation(selectedLocation)]);
      }
    }
    };
  //선택가능지역 엔터로 추가
  const enterLocation = (e) => {
    if (e.key !== "Enter") {
      return;
    } else {
      if (locations.length >= 4) {
        alertMaxLocation();
        return;
      } else {
        // 검색결과가 하나라면 해당 지역 추가
        if (searchedLocation.length === 1) {
          if(checkSameLocation(searchedLocation[0])){
            setLocations([...locations, checkSameLocation(searchedLocation[0])]);
          }
          // 검색결과가 다수라면 키보드로 포커스된 지역 추가
        }else if (searchedLocation.length > 1 && searchedLocation.length < locationOpts.length){
          // 포커스된 지역이 없으면 알림창
          if(selectedIndex===-1){
            Swal.fire({
              text: "지역을 선택해주세요.",
              confirmButtonColor: "#7F58EC",
              confirmButtonText: "확인",
              allowEnterKey : false,
            });
          }else{
            if(checkSameLocation(searchedLocation[selectedIndex])){
              setLocations([...locations, checkSameLocation(searchedLocation[selectedIndex])]);
            };
          };
        };
      };
    };
  };
  const deleteLocation = (val) => {
    let _location = locations.filter((l) => {
      return l !== val;
    });
    setLocations(_location);
  };

  const inputStyle = {
    borderRadius: "29px",
    font: "normal normal normal 20px/30px Noto Sans CJK KR",
    letterSpacing: "-0.6px",
    color: "#606060",
    boxSizing: "border-box",
    padding: "9px 27px 12px 27px",
  };

  return (
    <>
    <TitleArea>
    <strong>관심지역 설정</strong>
        <p><InfoCircleOutlined /> 4개 지역 등록 가능</p>
        </TitleArea>
      <AreaList
       onClick={(e) => {
        e.stopPropagation();
      }}>
        {locations?.map((location, idx) => {
          return (
            <Area key={idx}>
              {location}
              <CloseOutlined
                onClick={(e) => {
                  deleteLocation(location);
                }}
              />
            </Area>
          );
        })}
      </AreaList>
      <hr color="#E8E8E8" />
      <Text>지역 추가하기</Text>
      <InputBox
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}>
        <Input
          placeholder="지역을 입력하세요"
          suffix={
            <SearchOutlined
              style={{ color: "#000", cursor: "pointer" }}
              onClick={(e) => {
                enterLocation(e);
                e.stopPropagation();
              }}
            />
          }
          style={inputStyle}
          // 검색어 인식
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          // 엔터로 추가
          onKeyUp={(e) => {
            enterLocation(e);
            e.stopPropagation();
          }}
          onKeyDown={(e)=>{
            if (e.key === "ArrowUp" || e.key === "ArrowDown") {
              moveOpt(e);
            }
          }}
          value={search}
        />
        {/* 검색 키워드가 포함된 선택 가능 지역 목록 */}
        {searchedLocation.length !== locationOpts.length ? (
          <Autofill ref={scrollTarget}>
            {searchedLocation.length === 0 ? (
              <p>서비스 지역이 아닙니다</p>
            ) : (
              <p>지역을 선택해주세요</p>
            )}
            {searchedLocation.map((location, idx) => {
              return idx === selectedIndex ?
              (
                <Option
                selected
                key={location}
                value={location}
                  onClick={(e) => {
                    const _location = e.target.getAttribute('value');
                    selectLocation(_location);
                    e.stopPropagation();
                  }}
                  onMouseOver={()=>{
                    setIndex(-1);
                  }}
                >
                  {location}
                </Option>
              )
              :
              (
                <Option
                key={location}
                value={location}
                  onClick={(e) => {
                    const _location = e.target.getAttribute('value')
                    selectLocation(_location);
                    e.stopPropagation();
                  }}
                  onMouseOver={()=>{
                    setIndex(-1);
                  }}
                >
                  {location}
                </Option>
              )
            })}
          </Autofill>
        ) : null}
      </InputBox>
    </>
  );
};
export default React.memo(LocationBox);
const TitleArea = styled.div`
position:relative;
& p {
  position:absolute;
  top:18%;
  left:137px;
  color:#7F58EC;
  font-size:13.5px;
}
`;
const AreaList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 0px;
`;
const Text = styled.p`
  font-size: 18px;
  margin: 0 0 16.5px 0;
  display: block;
  @media all and (max-width: 768px) {
    font-size: 18px;
  }
  @media all and (max-width: 414px) {
    font-size: 15px;
  }
`;
const Area = styled.div`
  display: flex;
  min-width: 60px;
  height: 28px;
  background-color: #eeeeee;
  font-size: 15px;
  padding: 3.5px 5px 2.5px 10px;
  align-items: center;
  justify-content: space-between;
  margin: 0 10px 10px 0;
  & svg {
    margin-left: 5px;
  }
  @media all and (max-width: 768px) {
    font-size: 14px;
    min-width: 56px;

    & svg {
      margin-left: 2px;
    }
  }
  @media all and (max-width: 414px) {
    font-size: 14px;
    min-width: 56px;

    & svg {
      margin-left: 2px;
    }
  }
`;
const InputBox = styled.div`
  position: relative;
  & span {
    background-color: #eeeeee;
    @media all and (max-width: 768px) {
        padding:3px 0px 5px;
      }
      @media all and (max-width: 414px) {
        padding:2px 0px 4px;
      }
  }
  & input {
    background-color: #eeeeee;
    margin-top: 4px;
    & .ant-input-affix-wrapper {
      @media all and (max-width: 414px) {
        padding: 5px 15px 7px;
      }
    }
    ::-webkit-input-placeholder {
      /* WebKit browsers */
      font-size: 15px;
    }
    :-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      font-size: 15px;
    }
    ::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      font-size: 15px;
    }
    :-ms-input-placeholder {
      /* Internet Explorer 10+ */
      font-size: 15px;
    }
  }
`;
const SelectedStyle = css`
background-color:#ffffff;
    color: #7f58ec;
    border-radius:5px;
    `;

const Autofill = styled.div`
  width: 80%;
  max-height: 170px;
  overflow: auto;
  margin: 0 auto;
  padding: 0px 8px;
  font-size: 15px;
  position: absolute;
  left: 10%;
  background-color: #eeeeee;
  z-index:4;
  & p {
    background-color: #eeeeee;
    position: sticky;
    top: 0px;
    font-size: 15px;
    margin-bottom: 3px;
    font-weight: 600;
  }
`;
const Option = styled.div`
    cursor: pointer;
    /* ${(props)=> (props.selected?
      `background-color:#ffffff;
      color: #7f58ec;
      border-radius:5px;`
      :'')} */
    ${(props)=> (props.selected? SelectedStyle:'')}
    :hover {
      background-color:#ffffff;
      color: #7f58ec;
      border-radius:5px;
    }
`;
