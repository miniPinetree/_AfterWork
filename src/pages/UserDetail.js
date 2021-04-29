import {useEffect, useState} from "react";
import styled from "styled-components";
import { Title, TextBtn } from "../elements";
import { UserInfo, InterestBox } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { TimePicker, Input } from "antd";
import moment from "moment";
import { range } from "lodash";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import { actionCreators as preferActions } from "../redux/modules/prefer";
import locationOpts from "../shared/locationOpts";

const UserDetail = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const locationNames = user.locations.map(location=>location.name);
  const categoryIds = user.interests.map(interest=>interest.categoryId);
  const [search, setSearch] = useState("");
  const [locations, setLocations] = useState(locationNames);
  const [categories, setCategories] = useState(categoryIds);
  const [time, setTime] = useState(user.offTime);
 
  const inputStyle = {
    borderRadius: "29px",
    font: "normal normal normal 20px/30px Noto Sans CJK KR",
    letterSpacing: "-0.6px",
    color: "#606060",
    boxSizing: "border-box",
    padding: "9px 27px 12px 27px",
  }
console.log(locations, time, search,categoryIds);
console.log(categoryIds, categories);

//관심 카테고리 변경
  const changeInterest =(id)=>{
    if(categories.includes(id)){
      let _categories = categories.filter((category)=>{
        console.log(category, id);
        return category !== id
      });
      setCategories(_categories);
    }else{
      console.log(categories, id);
      setCategories([...categories, id]);
    }
  }
//검색 키워드가 포함된 선택가능지역 리스트
  let searchedLocation = locationOpts.filter((option) => {
    return option.includes(search);
  });
//선택가능지역 클릭하여 추가
  const selectLocation = (val) => {
    setLocations([...locations, val]);
  };
//선택가능지역이 하나이면 엔터로도 추가 가능
  const enterLocation = () => {
    if (searchedLocation.length === 1) {
      setLocations([...locations, ...searchedLocation]);
      setSearch("");
    }
  };
  const deleteLocation = (val) => {
    let _location = locations.filter((l) => {
      return l !== val;
    });
    setLocations(_location);
  };
  const setValue = (time, location)=>{

  };
  return (
    <Container>
      <TextBox>
        <Title>회원정보 및 상세 설정</Title>
        <TextBtn>변경 사항 저장</TextBtn>
      </TextBox>
      <Wrap>
        <Col>
        {/* 프로필*/}
          <InfoBox>
            <UserInfo />
          </InfoBox>
          {/* 퇴근시간 설정 */}
          <BorderBox>
            <strong>퇴근시간 설정</strong>
            <TimePicker
              size="large"
              onChange={(time, timeString) => {
                setTime(timeString);
              }}
              defaultOpenValue={moment(time, "HH:mm:ss")}
              defaultValue={moment(time, "HH:mm:ss")}
              disabledHours={() => range(0, 15)}
            />
          </BorderBox>
        </Col>

        <Col>
        {/* 관심 카테고리 */}
          <BorderBox>
         <InterestBox toggle={changeInterest} selectedCategory={categories}/>
          </BorderBox>
          {/* 관심지역 설정 */}
          <BorderBox>
            <strong>관심지역 설정</strong>
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
            <text>지역 추가하기</text>
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
                onPressEnter={enterLocation}
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
          </BorderBox>
        </Col>
      </Wrap>
    </Container>
  );
};
export default UserDetail;

const Container = styled.div`
  width: 70%;
  min-width: 749px;
  max-width: 1004px;
  margin: 0 auto;
`;
const TextBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 16px;
  & div:last-of-type {
    color: #7f58ec;
    cursor: pointer;
  }
`;
const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Col = styled.div`
  width: 100%;
`;
const InfoBox = styled.div`
  width: 98%;
  box-sizing: border-box;
  border: 1px solid #707070;
  border-radius: 15px;
  position: relative;
  display: flex;
  align-items: center;
  padding: 25px 30px;
  margin: 0 0 20px 0;
`;
const BorderBox = styled.div`
  width: 98%;
  min-height: 239px;
  box-sizing: border-box;
  border: 1px solid #707070;
  border-radius: 15px;
  position: relative;
  padding: 25px 30px;
  margin: 0 0 20px 0;
  ${(props) => (props.flex ? `display:flex` : "")};
  & strong {
    font-size: 20px;
    font-weight: 600;
    display: block;
    width: 100%;
    margin: 0 0 16.5px 0;
  }
  & text {
    font-size: 18px;
    color: #747474;
    margin: 0 0 16.5px 0;
    display: block;
  }
  & input::-webkit-input-placeholder {
    /* WebKit browsers */
    color: #606060;
    font: normal normal normal 16px/30px Noto Sans CJK KR;
  }
  & input:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #606060;
    font: normal normal normal 16px/30px Noto Sans CJK KR;
  }
  & input::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #606060;
    font: normal normal normal 16px/30px Noto Sans CJK KR;
  }
  & input:-ms-input-placeholder {
    /* Internet Explorer 10+ */
    color: #606060;
    font: normal normal normal 16px/30px Noto Sans CJK KR;
  }
`;
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
