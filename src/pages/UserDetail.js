import { useState, useEffect } from "react";
import styled from "styled-components";
import { Title, TextBtn } from "../elements";
import { UserInfo, InterestBox, LocationBox, OffTimePicker } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as preferActions } from "../redux/modules/prefer";
import { actionCreators as userActions } from "../redux/modules/user";
import Swal from "sweetalert2";

const UserDetail = (props) => {
<<<<<<< HEAD
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [search, setSearch] = useState("");
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [time, setTime] = useState('');
console.log(user);
console.log(time);

useEffect(() => {
  console.log('이펙트');
  if(user){
    console.log(user);
    
    if(categories.length===0 && user.interests.length>0){
    const categoryIds = user.interests.map(interest=>interest.categoryId);
    setCategories(categoryIds);
  };

}else{
  console.log('none');
}
}, []);

  const setValue = ()=>{
dispatch(preferActions.updateUserPreferDB(locations,categories,time));
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
            <AbsBtn onClick={()=>{
                dispatch(userActions.deleteUserDB());
            }
            
            }>회원 탈퇴</AbsBtn>
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
=======
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const [search, setSearch] = useState("");
    const [locations, setLocations] = useState([]);
    const [categories, setCategories] = useState([]);
    const [time, setTime] = useState("");

    if (user) {
        if (locations.length === 0 && user.locations.length > 0) {
            const locationNames = user.locations.map((location) => location.name);
            setLocations(locationNames);
        }
        if (categories.length === 0 && user.interests.length > 0) {
            const categoryIds = user.interests.map((interest) => interest.categoryId);
            setCategories(categoryIds);
        }
        if (time === "" && user.offTime) {
            setTime(user.offTime);
        }
    }
    const setValue = () => {
        dispatch(preferActions.updateUserInfoDB(locations, categories, time));
    };
    return (
        <Container>
            {user && (
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
                                <AbsBtn
                                    onClick={() => {
                                        setTimeout(() => {
                                            Swal.fire({
                                                text: "정말 탈퇴하시겠어요? 🥺",
                                                showCancelButton: true,
                                                confirmButtonColor: "#7F58EC",
                                                confirmButtonText: "탈퇴",
                                                cancelButtonText: "취소",
                                            }).then((result) => {
                                                if (result.isConfirmed) {
                                                    dispatch(userActions.deleteUserDB());
                                                    props.history.replace({
                                                        pathname: "/",
                                                        state: {},
                                                    });
                                                }
                                            }, 500);
                                        });
                                    }}
                                >
                                    회원 탈퇴
                                </AbsBtn>
                            </InfoBox>
                            <BorderBox>
                                <strong>퇴근시간 설정</strong>
                                <OffTimePicker time={time} setTime={setTime} />
                            </BorderBox>
                        </Col>
                        <Col>
                            {/* 관심 카테고리 */}
                            <BorderBox>
                                <InterestBox
                                    setCategories={setCategories}
                                    categories={categories}
                                />
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
                </>
            )}
        </Container>
    );
>>>>>>> 9c0692a9d52d18e3874d695b564bf3d86fccb7b6
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
const AbsBtn = styled.div`
    display: inline-block;
    box-sizing: border-box-sizing;
    cursor: pointer;
    position: absolute;
    right: 20px;
    top: 15px;
    color: #636363;
`;
const BorderBox = styled.div`
    width: 98%;
    min-height: 140px;
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
        cursor: default;
    }
    & p {
        color: #747474;
        cursor: default;
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
