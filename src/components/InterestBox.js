import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { CheckCircleFilled } from "@ant-design/icons";
import { actionCreators as postActions } from "../redux/modules/post";
const InterestBox = (props) => {
  const user = useSelector((state) => state.user.user);
  const categoryList = useSelector((state) => state.post.category_list);
  const dispatch = useDispatch();
  
  let { setCategories, categories } = props;
  useEffect(() => {
    if (categoryList.length === 0) {
      dispatch(postActions.getCategoryDB());
    }
  }, []);
  //관심 카테고리 변경
  const changeInterest =(id)=>{
    if(categories.includes(id)){
      let _categories = categories.filter((category)=>{
        return category !== id
      });
      setCategories(_categories);
    }else{
      setCategories([...categories, id]);
    }
  }
  return (
    <>
      <Grid>
        <strong>관심 카테고리</strong>
        <p>추가하기</p>
        {categoryList.map((category, idx) => {
          return(
            categories.some(
                (categoryId) => categoryId === category.categoryId
              )? (
              <Row key={idx}
                span={16}
                isChecked
                onClick={() => changeInterest(category.categoryId)}
              >
                <CheckCircleFilled />
                {category.name}
              </Row>
            ) : (
              <Row 
              key={idx}
              span={16}
              onClick={() => changeInterest(category.categoryId)} >
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

InterestBox.defaultProps = {
  isChecked: false,
};

export default React.memo(InterestBox);

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-flow: dense;
  & p {
    font-size: 18px;
    margin: 0 0 16.5px 0;
    display: block;
  }
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
  cursor: pointer;
  & span {
    margin-right: 14px;
  }
  & svg {
    color: ${(props) => (props.isChecked ? "#7F58EC" : "#E8E8E8")};
  }
  :hover {
    & svg {
      opacity: 0.75;
      -webkit-transform: scale(1.15);
      transform: scale(1.15);
    }
     
    }
`;
