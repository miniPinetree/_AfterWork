import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getCookie } from '../shared/Cookie';
import Banner from '../components/Banner';
import Carousel from '../components/Carousel';
import CategoryCard from '../components/CategoryCard';
import PostCard from '../components/PostCard';
import { actionCreators as postActions } from '../redux/modules/post';
import Swal from 'sweetalert2';

function Main(props) {
  // 메인 페이지
  const dispatch = useDispatch();
  const { history } = props;
  const cookie = getCookie('is_login');
  const is_user = cookie ? true : false;
  // 카테고리 리스트
  const category_list = useSelector((state) => state.post?.category_list);
  // 인기 취미 추천 리스트
  const popularList = useSelector((state) => state.post?.popular_list);
  // 지역별 추천 리스트
  const nearList = useSelector((state) => state.post?.near_list);
  // 관심 카테고리 리스트
  const recommend_list = useSelector((state) => state.post?.recommend_list);
  // 해당 유저가 설정한 지역 정보
  const locations = useSelector((state) => state.user.user?.locations);
  // 해당 유저가 설정한 관심 카테고리 정보
  const interests = useSelector((state) => state.user.user?.interests);
  // 찜목록
  const collection_list = useSelector((state) => state.prefer?.collection);
  const collection = collection_list.map((val) => {
    return val.productId;
  });

  useEffect(() => {
    // 카테고리 리스트 조회
    if (category_list.length === 0) {
      dispatch(postActions.getCategoryDB());
    }
    // 인기 취미 리스트 조회
    if (popularList.length === 0) {
      dispatch(postActions.getPopularListDB());
    }
    // 지역별 추천 리스트 조회
    if (nearList.length === 0 && is_user) {
      dispatch(postActions.getNearListDB());
    }
    // 관심 카테고리 리스트 조회
    if (recommend_list.length === 0 && is_user) {
      dispatch(postActions.getCategoryRecommendDB());
    }
    if (props.location.state && props.location.state.error) {
      setTimeout(() => {
        Swal.fire({
          text: '이미 가입된 이메일입니다. 다시 시도해 주세요',
          confirmButtonColor: '#7F58EC',
          confirmButtonText: '확인',
        });
        props.history.replace({
          pathname: props.location.pathname,
          state: {},
        });
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Banner />
      <CarouselWrap>
        <Carousel text='카테고리' size='6' category>
          {category_list.map((val, idx) => {
            return <CategoryCard key={idx + 'category'} {...val} />;
          })}
        </Carousel>
      </CarouselWrap>
      <Carousel text='인기 취미 아이템'>
        {popularList.map((val, idx) => {
          return collection.includes(val.productId) === true ? (
            <PostCard post_info={val} key={idx + 'popular'} like />
          ) : (
            <PostCard post_info={val} key={idx + 'popular'} />
          );
        })}
      </Carousel>
      {is_user ? (
        <>
          {locations?.length ? (
            <Carousel text='근처의 아이템'>
              {nearList.map((val, idx) => {
                return collection.includes(val.productId) === true ? (
                  <PostCard post_info={val} key={idx + 'near'} like />
                ) : (
                  <PostCard post_info={val} key={idx + 'near'} />
                );
              })}
            </Carousel>
          ) : (
            // 지역을 설정하지 않았을 경우
            <Wrap>
              <TitleContainer>
                <Title>근처의 아이템</Title>
              </TitleContainer>
              <EmptyList>
                <p>지역을 설정하고 근처의 아이템을 찾아보세요!</p>
                <button
                  onClick={() => {
                    history.push('/userdetail');
                  }}
                >
                  지역 설정하러 가기 {'>'}
                </button>
              </EmptyList>
            </Wrap>
          )}
        </>
      ) : (
        <Wrap>
          <TitleContainer>
            <Title>근처의 아이템</Title>
          </TitleContainer>
          <EmptyList>
            <p>로그인 후 근처의 아이템을 찾아보세요!</p>
          </EmptyList>
        </Wrap>
      )}
      {is_user ? (
        <>
          {interests?.length ? (
            <Carousel text='카테고리 추천 아이템'>
              {recommend_list.map((val, idx) => {
                return collection.includes(val.productId) === true ? (
                  <PostCard post_info={val} key={idx + 'recommend'} like />
                ) : (
                  <PostCard post_info={val} key={idx + 'recommend'} />
                );
              })}
            </Carousel>
          ) : (
            // 관심 카테고리 설정하지 않았을 경우
            <Wrap>
              <TitleContainer>
                <Title>카테고리 추천 아이템</Title>
              </TitleContainer>
              <EmptyList>
                <p>관심 카테고리를 설정하고 아이템을 추천받아보세요!</p>
                <button
                  onClick={() => {
                    history.push('/userdetail');
                  }}
                >
                  설정하러 가기 {'>'}
                </button>
              </EmptyList>
            </Wrap>
          )}
        </>
      ) : (
        <Wrap>
          <TitleContainer>
            <Title>카테고리 추천 아이템</Title>
          </TitleContainer>
          <EmptyList>
            <p>로그인 후 취미를 추천받아보세요!</p>
          </EmptyList>
        </Wrap>
      )}
    </>
  );
}

const CarouselWrap = styled.div`
  margin-top: -75px;

  @media only screen and (max-width: 414px) {
    margin-top: -30px;
    padding: 1px 0;
    background: #fafafa 0% 0% no-repeat padding-box;
  }
`;

const Wrap = styled.div`
  margin: 75px 0;
  cursor: default;
  @media only screen and (max-width: 1024px) {
    margin: 75px 27px;
  }
  @media only screen and (max-width: 414px) {
    margin: 55px 17px;
  }
`;

const TitleContainer = styled.div`
  max-width: 1004px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #333;
`;
const Title = styled.div`
  font-size: 20px;
  letter-spacing: -0.6px;
  font-weight: 700;
  @media only screen and (max-width: 1024px) {
    font-size: 16px;
    letter-spacing: -0.48px;
  }
  @media only screen and (max-width: 414px) {
    font-size: 15px;
    letter-spacing: -0.45px;
  }
`;
const EmptyList = styled.div`
  max-width: 1004px;
  margin: 20px auto;
  color: #333;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 209px;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 5px 15px #0000000d;
  border-radius: 15px;
  & p {
    text-align: center;
    font-size: 18px;
    font-family: Noto Sans CJK KR;
    letter-spacing: -0.54px;
    color: #666;
  }
  & button {
    max-width: 165px;
    height: 28px;
    font-size: 15px;
    color: #ffffff;
    background: transparent linear-gradient(124deg, #7f58ec 0%, #5c5ce3 100%) 0%
      0% no-repeat padding-box;
    border-radius: 14px;
    border: none;
    padding: 3px 17px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
      opacity: 0.9;
    }
  }
  @media only screen and (max-width: 414px) {
    & p {
      font-size: 16px;
    }
    & button {
      font-size: 13px;
    }
  }
`;

export default Main;
