import React from 'react';
import styled from 'styled-components';
import { HeartFilled } from '@ant-design/icons';

function ItemCard(props) {
  const { small, like, post_info } = props;
  return (
    <>
      {/* 링크 연결 고려 */}
      {/* <a href='/' target='_blank'></a> */}
      <CardWrap small={small} className='wrap'>
        <Img small={small} src={post_info?.imgUrl} alt='img' />
        <TextBox small={small}>
          <TitleWrap like={like}>
            <strong>{post_info?.title}</strong>
            <HeartFilled />
          </TitleWrap>
          {/* 이름, 위치, 가격 */}
          <div>
            {post_info?.author}
            {post_info?.priceInfo}
            {post_info?.location}
          </div>
        </TextBox>
      </CardWrap>
    </>
  );
}
ItemCard.defaultProps = {
  small: false,
  like: false,
};
const CardWrap = styled.div`
  border-radius: 10px;
  box-shadow: 0px 4px 30px #0000000a;
  ${(props) =>
    props.small
      ? `width:23%; height:0; padding-bottom:28%; position:relative;
`
      : 'max-width:240px;'}
  height: 350px;
`;
const Img = styled.img`
  width: 100%;
  ${(props) =>
    props.small ? `height:70%; position:absolute;` : 'height:192px;'}
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;
const TextBox = styled.div`
  width: 100%;
  padding: 15px 12px;
  box-sizing: border-box;
  ${(props) => (props.small ? `position:absolute; bottom:0px;` : '')}
  & strong {
    font-size: 17px;
  }
  font-size: 13px;
  ${(props) => (props.small ? 'margin-bottom:5%' : '')}
`;
const TitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  & svg {
    font-size: 18.12px;
    color: ${(props) => (props.like ? '#7F58EC' : '#E2E2E2')};
    margin-top: 5px;
  }
`;
export default ItemCard;
