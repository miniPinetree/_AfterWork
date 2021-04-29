import { useState } from "react";
import styled from "styled-components";
import { Title, TextBtn } from "../elements";
import { UserInfo, InterestBox, LocationBox } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { TimePicker, Input } from "antd";
import moment from "moment";
import Swal from "sweetalert2";
import { range } from "lodash";
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
 
console.log(locations, locations.length, time, search,categoryIds);
console.log(categoryIds, categories);
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
         <InterestBox setCategories={setCategories} categories={categories}/>
          </BorderBox>
          {/* 관심지역 설정 */}
          <BorderBox>
            <LocationBox 
            setLocations={setLocations}
            search={search}
            setSearch={setSearch}
            locations={locations}
            />
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
