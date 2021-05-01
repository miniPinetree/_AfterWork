import { useState, useEffect } from "react";
import styled from "styled-components";
import { Title, TextBtn } from "../elements";
import { UserInfo, InterestBox, LocationBox, OffTimePicker } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as preferActions } from "../redux/modules/prefer";

const UserDetail = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [search, setSearch] = useState("");
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [time, setTime] = useState('');

  if(user){
    if(locations.length===0 && user.locations.length>0){
      const locationNames = user.locations.map(location=>location.name);
      setLocations(locationNames);
    };
    if(categories.length===0 && user.interests.length>0){
    const categoryIds = user.interests.map(interest=>interest.categoryId);
    setCategories(categoryIds);
  };
  if(time==='' && user.offTime){
    setTime(user.offTime);
  }
};
  const setValue = ()=>{
dispatch(preferActions.updateUserInfoDB(locations,categories,time));
  };

  return (
    <Container>
     {user &&
     <>
      <TextBox>
        <Title>회원정보 및 상세 설정</Title>
        <TextBtn _onClick={setValue}>변경 사항 저장</TextBtn>
      </TextBox>
      <Wrap>
        <Col>
        {/* 프로필*/}
          <InfoBox>
            <UserInfo />
          </InfoBox>
          <BorderBox>
            <strong>퇴근시간 설정</strong>
          <OffTimePicker time={time} setTime={setTime}/>
          </BorderBox>
        </Col>

        <Col>
        {/* 관심 카테고리 */}
          <BorderBox>
         <InterestBox 
         setCategories={setCategories} 
         categories={categories}/>
          </BorderBox>
          <BorderBox>
          <strong>관심지역 설정</strong>
            <LocationBox 
            setLocations={setLocations}
            locations={locations}
            setSearch={setSearch}
            search={search}
            />
          </BorderBox>
        </Col>
      </Wrap>
     </>}
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
  & p {
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
