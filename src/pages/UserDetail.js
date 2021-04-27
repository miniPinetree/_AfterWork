import React from "react";
import styled from "styled-components";
import {Title, TextBtn } from "../elements";
import { UserInfo, CheckBox } from "../components";
import { TimePicker } from "antd";
import moment from "moment";
import { range } from "lodash";
import { Input } from "antd";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";

const UserDetail = (props) => {
  function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }

  function onChange(time, timeString) {
    console.log(time, timeString);
  }

  return (
    <Container>
      <TextBox>
      <Title>회원정보 및 상세 설정</Title>
      <TextBtn>변경 사항 저장</TextBtn>
      </TextBox>
      <Wrap>
        <Col>
          <InfoBox>
            <UserInfo />
          </InfoBox>
          <BorderBox>
            <strong>퇴근시간 설정</strong>
            <TimePicker
              onChange={onChange}
              defaultOpenValue={moment("16:00:00", "HH:mm:ss")}
              disabledHours={() => range(0, 15)}
            />
          </BorderBox>
        </Col>

        <Col>
          <BorderBox flex>
            <Divide>
              <strong>관심 카테고리</strong>
              <CheckBox/>
            </Divide>
            <Line />
            <Divide>
              <text>추가하기</text>
            <CheckBox/>
            </Divide>
          </BorderBox>

          <BorderBox>
            <strong>관심지역 설정</strong>
            <AreaList>
              <Area>
                서초구
                <CloseOutlined />
              </Area>
              <Area>
                송파구
                <CloseOutlined />
              </Area>
              <Area>
                성동구
                <CloseOutlined />
              </Area>
            </AreaList>
            <hr color="#E8E8E8" />
            <text>지역 추가하기</text>
            <InputBox>
              <Input
                placeholder="지역을 입력하세요"
                suffix={<SearchOutlined style={{ color: "#000" }} />}
                style={{
                  borderRadius: "29px",
                  font: "normal normal normal 20px/30px Noto Sans CJK KR",
                  letterSpacing: "-0.6px",
                  color: "#606060",
                  boxSizing: "border-box",
                  padding: "9px 27px 12px 27px",
                }}
              />
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
  min-width: 695px;
  margin: 0 auto;
`;
const TextBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items:center;
  padding-right:16px;
  & div:last-of-type{
    color:#7F58EC;
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
const Divide = styled.div`
  width: 50%;
  position: relative;
  & label {
    margin-bottom: 18.25px;
  }
`;
const AreaList = styled.div`
  display: flex;
  margin-bottom: 17px;
`;
const Area = styled.div`
  display: flex;
  width: 88px;
  height: 28px;
  background-color: #eeeeee;
  font-size: 15px;
  padding: 3.5px 11px 2.5px 11.53px;
  align-items: center;
  justify-content: space-between;
  margin: 0 13px 0 0;
`;
const Line = styled.div`
  border: 1px solid #e8e8e8;
  width: 0.1px;
  height: 65%;
  position: absolute;
  left: 46%;
  bottom: 10%;
`;
const InputBox = styled.div`
  & span {
    background-color: #eeeeee;
  }
  & input {
    background-color: #eeeeee;
  }
`;
