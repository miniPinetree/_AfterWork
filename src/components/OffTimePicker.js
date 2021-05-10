import React from "react";
import { useSelector } from "react-redux";
import { TimePicker } from "antd";
import { range } from "lodash";
import moment from "moment";

const OffTimePicker=(props)=>{
  const user = useSelector((state) => state.user.user);
  const { setTime, time } =props;
  if(time==='' && user.offTime){
    setTime(user.offTime);
  }
  return(
    <>
  {user.offTime?
  <TimePicker
  size="large"
  onChange={(time, timeString) => {
    setTime(timeString);
  }}
  defaultOpenValue={moment(user.offTime, "HH:mm:ss")}
  defaultValue={moment(user.offTime, "HH:mm:ss")}
  disabledHours={() => range(0, 15)}
  showNow=false
/>
:
<TimePicker
  size="large"
  onChange={(time, timeString) => {
    setTime(timeString);
  }}
  defaultOpenValue={moment("18:00:00", "HH:mm:ss")}
  disabledHours={() => range(0, 15)}
  showNow=false
/>
}
  </>);
};
export default React.memo(OffTimePicker);