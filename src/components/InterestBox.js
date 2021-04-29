import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Checkbox, Col } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";
import { actionCreators as postActions } from "../redux/modules/post";
const CheckBox = (props) => {
  const categoryList = useSelector((state) => state.post.category_list);
  const dispatch = useDispatch();
  const { toggle, selectedCategory } = props;

  useEffect(() => {
    if (categoryList.length === 0) {
      dispatch(postActions.getCategoryDB());
    }
  }, []);

  return (
    <>
      <Grid>
        <strong>관심 카테고리</strong>
        <text>추가하기</text>
        {categoryList.map((category, idx) => {
          return(
           selectedCategory.some(
                (categoryId) => categoryId === category.categoryId
              )? (
              <Row
                span={16}
                isChecked
                onClick={() => toggle(category.categoryId)}
              >
                <CheckCircleFilled />
                {category.name}
              </Row>
            ) : (
              <Row span={16} onClick={() => toggle(category.categoryId)}>
                <CheckCircleFilled />
                {category.name}
              </Row>
            )
          )
        })}
        <Line />
      </Grid>
    </>
  );
};

CheckBox.defaultProps = {
  isChecked: false,
};

export default CheckBox;

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-flow: dense;
`;
const Line = styled.div`
  border: 1px solid #e8e8e8;
  width: 0.1px;
  height: 65%;
  position: absolute;
  left: 46%;
  bottom: 10%;
`;

const Row = styled.div`
  margin-bottom: 18.25px;
  font-size: 17px;
  grid-column-start: ${(props) => (props.isChecked ? 1 : 2)};
  & span {
    margin-right: 14px;
  }
  & svg {
    cursor: pointer;
    color: ${(props) => (props.isChecked ? "#7F58EC" : "#E8E8E8")};
    :hover {
      opacity: 0.75;
      -webkit-transform: scale(1.15);
      transform: scale(1.15);
    }
  }
`;
