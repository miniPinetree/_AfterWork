import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import styled from 'styled-components';
import { Select, Spin, Checkbox } from 'antd';
import { DownOutlined, RightOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';
import { debounce } from 'lodash';
import InfinityScroll from '../shared/InfinityScroll';
import SubBanner from '../components/SubBanner';
import PostCard from '../components/PostCard';
import SideBar from '../components/SideBar';
import UpBtn from '../elements/UpBtn';
import box from '../shared/images/box.png';

const { Option } = Select;
const CheckboxGroup = Checkbox.Group;
const plainOptions = [
  '탈잉',
  '클래스101',
  '하비인더박스',
  '아이디어스',
  '마이비스킷',
  '모카클래스',
  '하비풀',
];
const provinceData = [
  '시/도',
  '서울',
  '인천',
  '수원',
  '일산',
  '안양',
  '부천',
  '용인',
  '파주',
  '안산',
  '고양',
  '하남',
  '김포',
  '남양주',
  '시흥',
  '평택',
  '화성',
  '포천',
  '성남',
  '부산',
  '대구',
  '대전',
  '세종',
  '청주',
  '울산',
  '창원',
  '천안',
  '광주',
  '제주',
];
const cityData = {
  '시/도': ['상세지역'],
  서울: [
    '전체',
    '가산',
    '강남',
    '강동',
    '강북',
    '강서',
    '건대',
    '관악',
    '광진',
    '교대',
    '구로',
    '금천',
    '노원',
    '논현',
    '동대문',
    '동작',
    '마포',
    '목동',
    '문정',
    '미아',
    '사당',
    '서대문',
    '서초',
    '성동',
    '성북',
    '성수',
    '송파',
    '수유',
    '신림',
    '신사',
    '신촌홍대',
    '양천',
    '영등포',
    '올림픽공원',
    '왕십리',
    '용산',
    '은평',
    '잠실',
    '잠실새내',
    '종로',
    '천호',
    '청량리',
    '충무로',
    '혜화',
  ],
  인천: ['전체', '계양', '구월', '미추홀', '부평', '송도', '주안'],
  수원: ['전체'],
  일산: ['전체'],
  안양: ['전체'],
  부천: ['전체'],
  용인: ['전체'],
  파주: ['전체'],
  안산: ['전체'],
  고양: ['전체'],
  하남: ['전체'],
  김포: ['전체'],
  남양주: ['전체'],
  시흥: ['전체'],
  평택: ['전체'],
  화성: ['전체'],
  포천: ['전체'],
  성남: ['전체', '분당', '서현'],
  부산: [
    '전체',
    '광안리',
    '금정',
    '남구',
    '남포',
    '동례',
    '부경대',
    '부산대',
    '부산시청',
    '사상',
    '서면',
    '수영',
    '연제',
    '진구',
    '해운대',
  ],
  대구: ['전체', '남구', '달서', '동성로', '수성', '중앙'],
  대전: ['전체', '대전역', '둔산', ' 유성'],
  세종: ['전체'],
  청주: ['전체'],
  울산: ['전체', '울산시청'],
  창원: ['전체'],
  천안: ['전체'],
  광주: ['전체', '광산', '전남대'],
  제주: ['전체'],
};

function Search(props) {
  // 검색 페이지
  const dispatch = useDispatch();
  const query = queryString.parse(props.location.search);
  // 검색 키워드
  const { keyword } = query;
  // 셀랙트 박스 상태
  const [filterBox, setfilterBox] = useState('total');
  const [sortBox, setSortBox] = useState('popularity desc');

  // 지역 필터 박스
  const [cities, setCities] = useState(cityData[provinceData[0]]);
  const [firstCity, setFirstCity] = useState(provinceData[0]);
  const [secondCity, setSecondCity] = useState(cityData[provinceData[0]][0]);
  const handleProvinceChange = (value) => {
    setFirstCity(value);
    setCities(cityData[value]);
    setSecondCity(cityData[value][0]);
  };

  const onSecondCityChange = (value) => {
    setSecondCity(value);
  };

  const cityName =
    `${firstCity},${secondCity}` === '시/도,상세지역'
      ? '전체,전체'
      : `${firstCity},${secondCity}`;

  // 정렬(가격순, 인기순)
  const selectSort = (value) => {
    setSortBox(value);
  };
  // 필터(온, 오프리안, 전체)
  const selectFilter = (value) => {
    setfilterBox(value);
  };
  // 체크박스
  const [checkedList, setCheckedList] = useState(plainOptions);
  const [checkAll, setCheckAll] = useState(true);

  const onChange = (list) => {
    setCheckedList(list);
    setCheckAll(list.length === plainOptions.length);
  };

  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setCheckAll(e.target.checked);
  };
  // 게시물 정보
  let post_list = useSelector((state) => state.post.post_list);
  // 페이지 정보
  const paging = useSelector((state) => state.post.paging);
  // 무한스크롤 로딩 정보
  const is_loading = useSelector((state) => state.post.is_loading);
  // 게시물 조회 로딩 정보
  const view_loading = useSelector((state) => state.post.view_loading);
  // 찜 목록
  const collection_list = useSelector((state) => state.prefer.collection);
  const collection = collection_list.map((val) => {
    return val.productId;
  });

  const sortInfo = sortBox.split(' ');
  const sort = sortInfo[0];
  const direction = sortInfo[1];

  const sitename = checkedList.length === 0 ? '없음' : checkedList.join(',');

  useEffect(() => {
    // 검색한 게시물 조회
    dispatch(
      postActions.getSearchDB(
        keyword,
        sort,
        direction,
        filterBox,
        sitename,
        cityName,
      ),
    );
  }, [direction, dispatch, keyword, sort, filterBox, sitename, cityName]);
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  const handleResize = debounce(() => {
    setWindowSize(window.innerWidth);
  }, 100);
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);
  const [isToggle, setIstoggle] = useState(true);
  return (
    <>
      {keyword ? (
        <>
          <UpBtn />
          <SubBanner />
          {windowSize > 807 ? (
            <Container>
              <SideBar />
              <MainContainer>
                {!view_loading ? (
                  <>
                    <MainHeader>
                      <HeaderWrap>
                        <Title>
                          '{keyword}' 검색 결과 {paging.total}건{' '}
                        </Title>

                        <SelectDiv>
                          <Sort>
                            <Select
                              defaultValue='popularity desc'
                              style={{ width: '100%' }}
                              onChange={selectSort}
                              value={sortBox}
                            >
                              <Option value='popularity desc' className='opt'>
                                인기순
                              </Option>
                              <Option value='price asc' className='opt'>
                                가격 낮은순
                              </Option>
                              <Option value='price desc' className='opt'>
                                가격 높은순
                              </Option>
                            </Select>
                          </Sort>
                          <Filter>
                            <Select
                              defaultValue='total'
                              style={{ width: '100%' }}
                              onChange={selectFilter}
                              value={filterBox}
                            >
                              <Option value='total' className='opt'>
                                전체보기
                              </Option>
                              <Option value='online' className='opt'>
                                온라인
                              </Option>
                              <Option value='offline' className='opt'>
                                오프라인
                              </Option>
                            </Select>
                          </Filter>
                        </SelectDiv>
                      </HeaderWrap>
                      <SortWrap>
                        <SortTitle>지역필터</SortTitle>
                        <LocationDiv>
                          <Select
                            defaultValue='전체'
                            value={firstCity}
                            style={{ width: '100%' }}
                            onChange={handleProvinceChange}
                          >
                            {provinceData.map((province) => (
                              <Option
                                key={province}
                                value={province}
                                className='opt'
                              >
                                {province}
                              </Option>
                            ))}
                          </Select>
                        </LocationDiv>
                        <SecondLocationDiv>
                          <Select
                            defaultValue='전체'
                            value={secondCity}
                            style={{ width: '100%' }}
                            onChange={onSecondCityChange}
                          >
                            {cities.map((city) => (
                              <Option key={city} value={city} className='opt'>
                                {city}
                              </Option>
                            ))}
                          </Select>
                        </SecondLocationDiv>
                      </SortWrap>
                    </MainHeader>
                    <ChkWrap>
                      <ChkTitle>사이트별 보기</ChkTitle>
                      <ChkItem>
                        <Checkbox
                          onChange={onCheckAllChange}
                          checked={checkAll}
                          value='all'
                        >
                          전체
                        </Checkbox>
                        <CheckboxGroup
                          onChange={onChange}
                          value={checkedList}
                          style={{ display: 'inline' }}
                        >
                          <Checkbox value='탈잉'>탈잉</Checkbox>
                          <Checkbox value='클래스101'>클래스101</Checkbox>
                          <Checkbox value='하비인더박스'>하비인더박스</Checkbox>
                          <Checkbox value='아이디어스'>아이디어스</Checkbox>
                          <Checkbox value='마이비스킷'>마이비스킷</Checkbox>
                          <Checkbox value='모카클래스'>모카클래스</Checkbox>
                          <Checkbox value='하비풀'>하비풀</Checkbox>
                        </CheckboxGroup>
                      </ChkItem>
                    </ChkWrap>
                    <Main>
                      {post_list.length === 0 ? (
                        <>
                          {/* 항목 없을때 */}
                          <EmptyBox>
                            <img src={box} alt='empty' />
                            <p>항목이 없습니다!</p>
                          </EmptyBox>
                        </>
                      ) : (
                        <>
                          <InfinityScroll
                            callNext={() => {
                              // 게시물 호출
                              dispatch(postActions.scrollSearchDB());
                            }}
                            is_next={paging.page ? true : false}
                            loading={is_loading}
                          >
                            {post_list.map((val, idx) => {
                              return collection.includes(val.productId) ===
                                true ? (
                                <PostCard
                                  post_info={val}
                                  key={idx}
                                  like
                                  is_responsive
                                />
                              ) : (
                                <PostCard
                                  post_info={val}
                                  key={idx}
                                  is_responsive
                                />
                              );
                            })}
                          </InfinityScroll>
                        </>
                      )}
                    </Main>
                  </>
                ) : (
                  <Spin
                    size='large'
                    tip='Loading...'
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                )}
              </MainContainer>
            </Container>
          ) : (
            // 테블릿, 모바일 반응형
            <Container>
              <SideBar />
              <MainContainer>
                {!view_loading ? (
                  <>
                    <MainHeader>
                      <Title>
                        '{keyword}' 검색 결과 {paging.total}건{' '}
                      </Title>

                      <SelectDiv>
                        <Sort>
                          <Select
                            defaultValue='popularity desc'
                            style={{ width: '100%' }}
                            onChange={selectSort}
                            value={sortBox}
                          >
                            <Option value='popularity desc' className='opt'>
                              인기순
                            </Option>
                            <Option value='price asc' className='opt'>
                              가격 낮은순
                            </Option>
                            <Option value='price desc' className='opt'>
                              가격 높은순
                            </Option>
                          </Select>
                        </Sort>
                        <Filter>
                          <Select
                            defaultValue='total'
                            style={{ width: '100%' }}
                            onChange={selectFilter}
                            value={filterBox}
                          >
                            <Option value='total' className='opt'>
                              전체보기
                            </Option>
                            <Option value='online' className='opt'>
                              온라인
                            </Option>
                            <Option value='offline' className='opt'>
                              오프라인
                            </Option>
                          </Select>
                        </Filter>
                      </SelectDiv>
                    </MainHeader>
                    {isToggle ? (
                      <>
                        <ChkWrap>
                          <ChkTitle>
                            지역별/사이트별 보기
                            <DownOutlined
                              onClick={() => {
                                setIstoggle(false);
                              }}
                            />
                          </ChkTitle>
                          <div style={{ margin: '15px 22px 0 22px' }}>
                            <hr style={{ border: '1px solid #eee' }} />
                          </div>
                          <SortWrap
                            is_responsive
                            style={{ marginLeft: '22px', marginTop: '20px' }}
                          >
                            <SortTitle is_responsive>지역 필터</SortTitle>
                            <div
                              style={{ display: 'flex', marginRight: '22px' }}
                            >
                              <LocationDiv>
                                <Select
                                  defaultValue='전체'
                                  value={firstCity}
                                  style={{ width: '100%' }}
                                  onChange={handleProvinceChange}
                                >
                                  {provinceData.map((province) => (
                                    <Option
                                      key={province}
                                      value={province}
                                      className='opt'
                                    >
                                      {province}
                                    </Option>
                                  ))}
                                </Select>
                              </LocationDiv>
                              <SecondLocationDiv>
                                <Select
                                  defaultValue='전체'
                                  value={secondCity}
                                  style={{ width: '100%' }}
                                  onChange={onSecondCityChange}
                                >
                                  {cities.map((city) => (
                                    <Option
                                      key={city}
                                      value={city}
                                      className='opt'
                                    >
                                      {city}
                                    </Option>
                                  ))}
                                </Select>
                              </SecondLocationDiv>
                            </div>
                          </SortWrap>
                          <ChkTitle is_sub>사이트별 필터</ChkTitle>
                          <ChkItem>
                            <Checkbox
                              onChange={onCheckAllChange}
                              checked={checkAll}
                              value='all'
                            >
                              전체
                            </Checkbox>
                            <CheckboxGroup
                              onChange={onChange}
                              value={checkedList}
                              style={{ display: 'inline' }}
                            >
                              <Checkbox value='탈잉'>탈잉</Checkbox>
                              <Checkbox value='클래스101'>클래스101</Checkbox>
                              <Checkbox value='하비인더박스'>
                                하비인더박스
                              </Checkbox>
                              <Checkbox value='아이디어스'>아이디어스</Checkbox>
                              <Checkbox value='마이비스킷'>마이비스킷</Checkbox>
                              <Checkbox value='모카클래스'>모카클래스</Checkbox>
                              <Checkbox value='하비풀'>하비풀</Checkbox>
                            </CheckboxGroup>
                          </ChkItem>
                        </ChkWrap>
                      </>
                    ) : (
                      <>
                        <ChkWrap is_close>
                          <ChkTitle>
                            지역별/사이트별 보기
                            <RightOutlined
                              onClick={() => {
                                setIstoggle(true);
                              }}
                            />
                          </ChkTitle>
                        </ChkWrap>
                      </>
                    )}
                    <Main>
                      {post_list.length === 0 ? (
                        <>
                          {/* 항목 없을때 */}
                          <EmptyBox>
                            <img src={box} alt='empty' />
                            <p>항목이 없습니다!</p>
                          </EmptyBox>
                        </>
                      ) : (
                        <>
                          <InfinityScroll
                            callNext={() => {
                              // 게시물 호출
                              dispatch(postActions.scrollSearchDB());
                            }}
                            is_next={paging.page ? true : false}
                            loading={is_loading}
                          >
                            {post_list.map((val, idx) => {
                              return collection.includes(val.productId) ===
                                true ? (
                                <PostCard
                                  post_info={val}
                                  key={idx}
                                  like
                                  is_responsive
                                />
                              ) : (
                                <PostCard
                                  post_info={val}
                                  key={idx}
                                  is_responsive
                                />
                              );
                            })}
                          </InfinityScroll>
                        </>
                      )}
                    </Main>
                  </>
                ) : (
                  <Spin
                    size='large'
                    tip='Loading...'
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                )}
              </MainContainer>
            </Container>
          )}
        </>
      ) : null}
    </>
  );
}

const Container = styled.div`
  display: flex;
  color: #333;
`;

const MainContainer = styled.div`
  width: 60%;
  margin-left: 31px;
  position: relative;
  @media only screen and (max-width: 1024px) {
    width: 92%;
    margin: 0 auto;
    min-height: 600px;
    padding: 0 20px;
  }
  @media only screen and (max-width: 414px) {
    padding: 0;
  }

  @media only screen and (max-width: 372px) {
    width: 100%;
    margin: 0 5px;
  }
`;
const MainHeader = styled.div`
  margin: 35px 0 20px 10px;
  max-width: 87%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media only screen and (max-width: 1004px) {
    max-width: 100%;
    margin: 22px 10px 13px;
  }
  @media only screen and (max-width: 414px) {
    max-width: 100%;
    margin: 22px 10px 13px;
  }
`;

const HeaderWrap = styled.div`
  display: flex;
  align-items: center;
`;

const ChkWrap = styled.div`
  max-width: 87%;
  margin-left: 10px;
  margin-bottom: 31px;
  height: 149px;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 5px 15px #0000000d;
  border: 0.5px solid #e4e4e4;
  border-radius: 15px;

  @media only screen and (max-width: 1371px) {
    height: 179px;
  }
  @media only screen and (max-width: 1004px) {
    max-width: 100%;
  }
  @media only screen and (max-width: 807px) {
    max-width: 100%;
    height: ${(props) => (props.is_close ? '70px' : '308px')};
  }
  @media only screen and (max-width: 414px) {
    height: ${(props) => (props.is_close ? '70px' : '328px')};
  }
`;
const ChkTitle = styled.div`
  font-size: 17px;
  letter-spacing: -0.51px;
  font-weight: bold;
  color: ${(props) => (props.is_sub ? '#5E5E5E' : '#333')};
  margin-top: 22px;
  margin-left: 22px;
  @media only screen and (max-width: 1024px) {
    font-size: 16px;
    letter-spacing: -0.48px;
  }
  @media only screen and (max-width: 807px) {
    font-size: ${(props) => (props.is_sub ? '14px' : '16px')};
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 28px;
    cursor: pointer;
  }
  @media only screen and (max-width: 414px) {
    font-size: ${(props) => (props.is_sub ? '14px' : '16px')};
    margin-left: 22px;
  }
  @media only screen and (max-width: 392px) {
    margin-left: 22px;
  }
`;
const ChkItem = styled.div`
  margin-top: 18px;
  margin-left: 22px;
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #7f58ec;
    border-color: #7f58ec;
  }
  & label {
    width: 113px;
    margin-right: 60px;
    margin-top: 5px;
  }
  & div {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .ant-checkbox-wrapper + .ant-checkbox-wrapper {
      margin-left: 0;
    }
  }
  @media only screen and (max-width: 1024px) {
    & label {
      margin-right: 40px;
    }
  }
  @media only screen and (max-width: 414px) {
    margin-left: 42px;
    & label {
      margin-right: 40px;
      margin-top: 8px;
    }
  }
  @media only screen and (max-width: 392px) {
    margin-left: 22px;
  }
`;
const SelectDiv = styled.div`
  display: flex;
  align-items: center;
`;
const Sort = styled.div`
  max-width: 112px;
  min-width: 90px;
  margin-right: 15px;
  @media only screen and (max-width: 414px) {
    & span {
      font-size: 10px;
    }
  }
`;

const Filter = styled.div`
  max-width: 94px;
  @media only screen and (max-width: 414px) {
    & span {
      font-size: 10px;
    }
  }
`;

const SortWrap = styled.div`
  margin-left: 10px;
  max-width: 87%;
  display: flex;
  align-items: center;
  justify-content: ${(props) =>
    props.is_responsive ? 'space-between' : 'flex-end'};
  @media only screen and (max-width: 1004px) {
    max-width: 100%;
  }
  @media only screen and (max-width: 414px) {
    margin: 0 10px 20px 10px;
  }
`;

const SortTitle = styled.div`
  font-size: 15px;
  letter-spacing: -0.45px;

  color: ${(props) => (props.is_responsive ? '#5E5E5E' : '#333')};
  font-weight: bold;
  margin-right: 12px;
  @media only screen and (max-width: 768px) {
    font-size: ${(props) => (props.is_responsive ? '14px' : '13px')};
    letter-spacing: -0.39px;
  }
  @media only screen and (max-width: 414px) {
    font-size: ${(props) => (props.is_responsive ? '14px' : '12px')};
    letter-spacing: -0.36px;
  }
`;

const LocationDiv = styled.div`
  margin-right: 15px;
  max-width: 112px;
  min-width: 90px;
  @media only screen and (max-width: 414px) {
    & span {
      font-size: 10px;
    }
  }
`;

const SecondLocationDiv = styled.div`
  min-width: 94px;
  @media only screen and (max-width: 414px) {
    min-width: 78.81px;
    & span {
      font-size: 10px;
    }
  }
`;

const Title = styled.div`
  font-size: 16px;
  font-family: Noto Sans CJK KR;
  color: #333;
  cursor: default;
  letter-spacing: -0.48px;
  margin-right: 24px;
  @media only screen and (max-width: 768px) {
    font-size: 13px;
    letter-spacing: -0.24px;
    margin-right: 10px;
  }
  @media only screen and (max-width: 414px) {
    font-size: 13px;
    letter-spacing: -0.24px;
  }
`;

const Main = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  flex-wrap: wrap;
  cursor: default;
  & .wrap {
    margin-right: 20px;
    margin-bottom: 20px;
  }
  @media only screen and (max-width: 936px) {
    & .wrap {
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }
  @media only screen and (max-width: 414px) {
    justify-content: space-between;
    padding: 0 15px;
  }
  @media only screen and (max-width: 407px) {
    padding: 0;
  }
`;

const EmptyBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & img {
    max-width: 207px;
    max-height: 207px;
  }
  & p {
    font-size: 23px;
    font-family: Noto Sans CJK KR;
    letter-spacing: -0.69px;
    color: #676767;
  }
`;

export default Search;
