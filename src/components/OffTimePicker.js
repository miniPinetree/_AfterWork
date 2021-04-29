import React from "react";
import { TimePicker } from "antd";
import { range } from "lodash";
import moment from "moment";

const OffTimePicker=(props)=>{
  const { setTime, time } =props;
    return(
        <TimePicker
        size="large"
        onChange={(time, timeString) => {
          setTime(timeString);
        }}
        defaultOpenValue={moment(time, "HH:mm:ss")}
        defaultValue={moment(time, "HH:mm:ss")}
        disabledHours={() => range(0, 15)}
      />
    );
};
export default React.memo(OffTimePicker);