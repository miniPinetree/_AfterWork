import React from "react";
import styled from "styled-components";
import { Checkbox, Col } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";

const CheckBox=(props)=>{

    const { isChecked }=props;
    function onChange(checkedValues) {
        console.log("checked = ", checkedValues);
      }
      const style = {
        fontSize:'20px',
      };
    return(
        <Checkbox.Group style={{ width: "100%" }} onChange={onChange}>
        <Col>
          <Row span={16} isChecked={isChecked}>
            <CheckCircleFilled style={style}/>아트
          </Row>
          <Row span={16} isChecked={isChecked}>
            <CheckCircleFilled style={style}/>교육
          </Row>
          <Row span={16} isChecked={isChecked}>
            <CheckCircleFilled style={style}/>공예
          </Row>
          <Row span={16} isChecked={isChecked}>
            <CheckCircleFilled style={style}/>음악
          </Row>
        </Col>
      </Checkbox.Group>
    );
};

CheckBox.defaultProps={
    isChecked:true,
};

export default CheckBox;

const Row = styled.div`
margin-bottom: 18.25px;
font-size:17px;
& span{
    margin-right: 14px;
}
& svg{
    color: ${(props)=>props.isChecked? '#7F58EC':'#E8E8E8'};
}
`;