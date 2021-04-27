import React from 'react';
import styled from 'styled-components';
import Banner from '../components/Banner';
import Carousel from '../components/Carousel';
import CategoryCard from '../components/CategoryCard';
import ItemCard from '../components/ItemCard';

function Main(props) {
  return (
    <>
      <Banner />
      <Carousel text='카테고리' size='5'>
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
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
