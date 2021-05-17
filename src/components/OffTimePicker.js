import React from "react";
import { useSelector } from "react-redux";
import { TimePicker } from "antd";
import { range } from "lodash";
import moment from "moment";

const OffTimePicker=(props)=>{
  const user = useSelector((state) => state.user.user);
  const { setTime, time } =props;

React.useEffect(() => {
  if(time==='' && user.offTime){
    setTime(user.offTime);
  };
}, []); // eslint-disable-line react-hooks/exhaustive-deps

  return(
    <>
  {user.offTime?
  <TimePicker
  onChange={(time, timeString) => {
    setTime(timeString);
  }}
  size="large"
  defaultOpenValue={moment(time, "HH:mm:ss")}
  defaultValue={moment(time, "HH:mm:ss")}
  value={moment(time, "HH:mm:ss")}
  hideDisabledOptions={true}
  disabledHours={() => range(0, 9)}
  minuteStep={10}
  secondStep={60}
  showNow={false}
  autoFocus={true}
  onSelect={(value) => {
    const timeString = moment(value).format("HH:mm:ss");
    setTime(timeString);
    console.log(timeString);
  }}
/>
:
<TimePicker
 onChange={(time, timeString) => {
  setTime(timeString);
}}
  size="large"
  value={moment(time? time:"00:00:00", "HH:mm:ss")}
  hideDisabledOptions={true}
  disabledHours={() => range(0, 9)}
  minuteStep={10}
  secondStep={60}
  showNow={false}
  autoFocus={true}
  onSelect={(value) => {
    const timeString = moment(value).format("HH:mm:ss");
    setTime(timeString);
  }}
/>
}
  </>);
};
export default React.memo(OffTimePicker);

