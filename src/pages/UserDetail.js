import { useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { history } from "../redux/configStore";
import { Title } from "../elements";
import {UserInfo,InterestBox,LocationBox,OffTimePicker} from "../components";
import { getCookie } from "../shared/Cookie";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as preferActions } from "../redux/modules/prefer";
import { actionCreators as userActions } from "../redux/modules/user";

const UserDetail = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const cookie = getCookie("is_login");

  if(!cookie){
    history.replace('/');
  };

  const [search, setSearch] = useState("");
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [time, setTime] = useState("");
    const setValue = () => {
        dispatch(preferActions.updateUserPreferDB(locations, categories, time));
        console.log(locations, categories, time);
    };
    return (
        <Bg>
        <Container>
            {user && (
                <>
                    <TextBox>
                        <Title>내 정보 및 상세 설정</Title>
                        <WebBtn onClick={setValue}>변경사항 저장</WebBtn>
                        {/* <TextBtn _onClick={setValue}>변경 사항 저장</TextBtn> */}
                    </TextBox>
                    <Wrap>
                        <Col>
                            {/* 프로필*/}
                            <InfoBox>
                                <UserInfo />
                                <DeleteUserBtn
                                    onClick={() => {
                                        Swal.fire({
                                            text: "정말 탈퇴하시려구요? 🥺",
                                            showCancelButton: true,
                                            confirmButtonColor: "#7F58EC",
                                            confirmButtonText: "네",
                                            cancelButtonText: "아니요",
                                        }).then((res) => {
                                            if (res.isConfirmed) {
                                                dispatch(userActions.deleteUserDB());
                                                history.replace("/");
                                            }
                                        });
                                    }}
                                >
                                    회원 탈퇴
                                </DeleteUserBtn>
                            </InfoBox>
                            {/* 관심 카테고리 */}
                            <BorderBox>
                                <ResOther>
                                <InterestBox
                                    setCategories={setCategories}
                                    categories={categories}
                                />
                                </ResOther>
                                <ResMobile>
                                <strong>퇴근시간 설정</strong>
                                <OffTimePicker time={time} setTime={setTime} />
                                </ResMobile>
                            </BorderBox>
                        </Col>
                        <Col>
                        <BorderBox>
                        <ResOther>
                                <strong>퇴근시간 설정</strong>
                                <OffTimePicker time={time} setTime={setTime} />
                                </ResOther>
                                <ResMobile>
                                <InterestBox
                                    setCategories={setCategories}
                                    categories={categories}
                                />
                                </ResMobile>
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
                        <ResMobile>
                        <Btn onClick={setValue}>변경사항 저장</Btn>
                        </ResMobile>
                    </Wrap>
                </>
            )}
        </Container>
        </Bg>
    );
};
export default UserDetail;
const Bg = styled.div`
background-color: #F8F8F8;
width:100%;
min-height:100vh;
`;
const Container = styled.div`
    width: 70%;
    min-width: 749px;
    max-width: 1004px;
    margin: 0 auto;
    @media all and (max-width: 768px) {
    width: 94%;
    min-width: 720px;
    }
    @media all and (max-width: 415px) {
        min-width: 374px;
        width: 100%;
    }
`;
const ResOther = styled.div`
@media all and (max-width: 415px) {
        display:none;
    }
`;
const ResMobile = styled.div`
display:none;
@media all and (max-width: 415px) {
    display:block;
    }
`;
const TextBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 16px;
    position:relative;
    & hr {
        background-color: #7f58ec;
    }
    @media all and (max-width: 415px) {
        justify-content: flex-end;
        width: 90%;
        padding-right: 0px;
        display:none;
    }
`;
const Wrap = styled.div`
    display: flex;
    justify-content: space-between;
    @media all and (max-width: 415px) {
        flex-direction: column;
        width: 90%;
        margin: auto;
    }
`;
const Col = styled.div`
    width: 100%;
`;
const InfoBox = styled.div`
    width: 98%;
    box-sizing: border-box;
    background-color: #ffffff;
    box-shadow: 0px 10px 15px #e0e0e0;
    border-radius: 15px;
    position: relative;
    display: flex;
    align-items: center;
    padding: 25px 30px;
    margin: 0 0 20px 0;
    @media all and (max-width: 415px) {
        margin-top:15px;
    }
`;
const DeleteUserBtn = styled.div`
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
    background-color: #ffffff;
    box-shadow: 0px 10px 15px #e0e0e0;
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
        @media all and (max-width: 768px){
            font-size: 19px;
        }
        @media all and (max-width: 414px){
            font-size: 16px;
        }
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
const Btn = styled.button`
width:102px;
height:35px;
font-size:13px;
color:white;
background:linear-gradient(to right,#7F58EC,#5C5CE3);
box-sizing:border-box;
border-radius:7px;
border:none;
margin:9px 36% 24px;
cursor: pointer;
@media all and (max-width: 414px){
    margin:9px 35% 24px;
        }
`;

const WebBtn = styled(Btn)`
width:102px;
height:35px;
font-size:14px;
margin:9px 40.5% 24px;
position:absolute;
top:50%;
left:45%;
@media all and (max-width: 414px){
    display:none;
        }
`;