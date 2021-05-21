import styled from "styled-components";
import { history } from "../redux/configStore";
import { RightOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as preferActions } from "../redux/modules/prefer";
import { PostCard, UserInfo } from "../components";
import { Title, TextBtn } from "../elements";
import { getCookie } from "../shared/Cookie";
import box from "../shared/images/box.png";

const MyPage = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const collection = useSelector((state) => state.prefer.collection);
  const cookie = getCookie("is_login");

  if(!cookie){
    history.replace('/');
  };

  return (
    <Bg>
      <Container>
        {user && (
          <>
            <Title>마이 페이지</Title>
            <Profile>
              <Area1>
                <UserInfo />
              </Area1>
              <DetailBtn
                onClick={() => {
                  history.push("/userdetail");
                }}
              >
                내 정보 및 상세 설정 <RightOutlined />
              </DetailBtn>
            </Profile>
            <MarkList>
              <TextBox>
                <Area1>
                  <Title>찜 목록</Title>
                  {collection.length ? (
                    <Count>총 {collection.length}건</Count>
                  ) : null}
                </Area1>
                <TextBtn
                  _onClick={() => {
                    dispatch(preferActions.deleteCollectionDB());
                  }}
                >
                  전체 삭제
                </TextBtn>
              </TextBox>
              {collection.length ? (
                <>
                  <CardList>
                    {collection.map((prd, idx) => {
                      return <PostCard key={idx} post_info={prd} like />;
                    })}
                  </CardList>
                </>
              ) : (
                <EmptyBox>
                  <img src={box} alt="empty" />
                  <p>찜 목록이 비어있습니다.</p>
                </EmptyBox>
              )}
            </MarkList>
          </>
        )}
      </Container>
    </Bg>
  );
};

export default MyPage;
const Bg = styled.div`
  background-color: #f8f8f8;
  min-height: 100vh;
  width: 100%;
`;
const Container = styled.div`
  width: 70%;
  max-width: 1004px;
  margin: 0 auto;
  @media all and (max-width: 768px) {
    width: 90%;
  }
  @media all and (max-width: 415px) {
    width: 90%;
  }
`;
const TextBox = styled.div`
  display: flex;
  justify-content: space-between;
  @media all and (max-width: 415px) {
    width: 98%;
    padding: 12px 0 0 0;
    box-sizing: border-box;
    height: 21.6px;
    & p {
      font-size: 12px;
      color: #333333;
      margin: auto 0px;
      font-weight: 400;
    }
  }
`;
const Count = styled.p`
  font-size: 17px;
  color: #6b6b6b;
  margin-top: 64px;
  font-weight: 100;
  @media all and (max-width: 415px) {
    font-size: 12px;
    color: #333333;
    margin: auto 0px;
    font-weight: 400;
  }
`;
const Profile = styled.div`
  width: 100%;
  min-width: 495px;
  height: 137px;
  box-sizing: border-box;
  background-color: #ffffff;
  box-shadow: 0px 10px 15px #e0e0e0;
  border-radius: 15px;
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 30px;
  @media all and (max-width: 415px) {
    display: none;
  }
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
  cursor: pointer;
  background: linear-gradient(to right, #7f58ec, #5c5ce3);
  &:hover {
    opacity: 0.9;
  }
`;
const Area1 = styled.div`
  display: flex;
  & p {
    cursor: default;
  }
`;
const MarkList = styled.div``;
const CardList = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: flex-start;
  min-height: 220px;
  min-width: 500.26px;
  margin-bottom: 48px;
  & .wrap {
    margin-bottom: 20px;
    margin-right: 10px;
  }
  @media all and (max-width: 415px) {
    min-width: 344px;
    width: 344px;
    margin-top: 13px;
    & .wrap {
      margin-bottom: 0px;
      margin-right: 10px;
    }
    & .wrap:nth-child(2n-1) {
      margin-bottom: 4px;
    }
  }
`;

const EmptyBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 58vh;
  & img {
    margin-top: -10%;
    max-width: 207px;
    max-height: 207px;
  }
  & p {
    font-size: 15px;
    font-family: Noto Sans CJK KR;
    letter-spacing: -0.69px;
    color: #676767;
  }
  @media all and (max-width: 768px) {
    & img {
      margin-top: -30%;
    }
  }
  @media all and (max-width: 415px) {
    height: 100vh;
    & img {
      margin-top: -30%;
    }
  }
`;
