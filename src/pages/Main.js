import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Banner from '../components/Banner';
import Carousel from '../components/Carousel';
import CategoryCard from '../components/CategoryCard';
import ItemCard from '../components/ItemCard';
import { actionCreators as postActions } from '../redux/modules/post';

function Main(props) {
  const dispatch = useDispatch();
  const category_list = useSelector((state) => state.post.category_list);
  useEffect(() => {
    if (category_list.length === 0) {
      dispatch(postActions.getCategoryDB());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Banner />
      <Carousel text='카테고리' size='5'>
        {category_list.map((val, idx) => {
          return <CategoryCard key={val.id} {...val} />;
        })}
      </Carousel>
      <Carousel text='인기 취미 아이템'>
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
      </Carousel>
      {/* 로그인 유저, 프로필 설정을 한 경우 렌더링 */}
      <Carousel text='근처의 아이템'>
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
      </Carousel>
    </>
  );
}

export default Main;
