import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { TimePicker } from "antd";
import { range } from "lodash";
import moment from "moment";

const OffTimePicker=(props)=>{
  const user = useSelector((state) => state.user.user);
  const { setTime, time } =props;
  if(time==='' && user.offTime){
    setTime(user.offTime);
  };
  return(
    <Contatiner>
  {user.offTime?
  <TimePicker
  size="large"
  onChange={(time, timeString) => {
    setTime(timeString);
  }}
  defaultOpenValue={moment(user.offTime, "HH:mm:ss")}
  defaultValue={moment(user.offTime, "HH:mm:ss")}
  disabledHours={() => range(0, 15)}
  minuteStep={10}
  secondStep={30}
/>
:
<TimePicker
  size="large"
  onChange={(time, timeString) => {
    setTime(timeString);
  }}
  defaultOpenValue={moment("16:00:00", "HH:mm:ss")}
  disabledHours={() => range(0, 15)}
  minuteStep={10}
  secondStep={30}
/>
}
  </Contatiner>);
};
export default React.memo(OffTimePicker);

const Contatiner = styled.div`
& .ant-picker-now{
  display:none;
}
`;