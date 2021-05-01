import {useEffect} from "react";
import styled from "styled-components";
import {history} from "../redux/configStore";
import { RightOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as preferActions } from "../redux/modules/prefer";
import { actionCreators as userActions } from '../redux/modules/user';
import { ItemCard, PostCard, UserInfo } from "../components";
import {Title, TextBtn} from "../elements";
import { Empty } from 'antd';

const MyPage = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state)=>state.user.user);
  const collection = useSelector((state)=>state.prefer.collection);
  
  useEffect(() => {
    if(user){
      dispatch(preferActions.getCollectionDB());
    }
  }, []);

  return (
    <Container>
      {user &&
      <>
       <Title>마이 페이지</Title>

<Profile>
  <Area1>
  <UserInfo/>
  </Area1>
  <DetailBtn onClick={()=>{
      history.push('/userdetail');
  }}>
    회원정보 및 상세 설정 <RightOutlined />
  </DetailBtn>
</Profile>

<MarkList>
  <TextBox>
    <Area1>
      <Title>찜 목록</Title>
      <p>총 {collection.length}건</p>
    </Area1>
    <TextBtn 
    _onClick={()=>{
      dispatch(preferActions.deleteCollectionDB());
    }}
    >
      목록 전체 삭제
    </TextBtn>
  </TextBox>
  {collection.length?
  <>
  <ItemList>
    {collection.map((prd,idx)=>{
      return(
<PostCard key={idx} post_info={prd} like/>
      );
    })}
  </ItemList>
  </>
  : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}
  style={{ height:'20vh'}}/>
}
</MarkList>
      </>}
    </Container>
  );
};

export default MyPage;

const Container = styled.div`
  width: 70%;
  max-width: 1004px;
  margin: 0 auto;
`;
const TextBox = styled.div`
  display: flex;
  justify-content: space-between;
  & p {
    font-size: 17px;
    color: #6b6b6b;
    margin-top: 64px;
    font-weight: 100;
  }
`;
const Profile = styled.div`
  width: 100%;
  min-width: 495px;
  height: 137px;
  box-sizing: border-box;
  border: 1px solid #707070;
  border-radius: 15px;
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 30px;
`;
const DetailBtn = styled.button`
  color: white;
  border: none;
  border-radius: 15px;
  padding: 3px 10px 3px 15px;
  position: absolute;
  bottom: 23px;
  right: 30px;
  text-align: center;
  background:linear-gradient(to right,#7F58EC,#5C5CE3);
`;
const Area1 = styled.div`
  display: flex;
`;
const MarkList = styled.div`
  margin-bottom: 48px;
`;
const ItemList = styled.div`
  display: flex;
  flex-wrap:wrap;
  justify-content: flex-start;
  margin-bottom: 18px;
  min-height: 220px;
  & .wrap {
    margin-right: 10px;
    margin-bottom: 20px;
  }
`;
