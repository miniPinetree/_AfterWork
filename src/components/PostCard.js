import React from 'react';
import styled from 'styled-components';
import { HeartFilled } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { actionCreators as preferActions } from '../redux/modules/prefer';

function PostCard(props) {
  const dispatch = useDispatch();
  const { like, post_info } = props;

  return (
    <>
      <CardWrap className='wrap'>
        <a href={post_info.siteUrl} target='_blank' rel='noreferrer noopener'>
          <Img src={post_info?.imgUrl} alt='img' />
          <TextBox>
            <TitleWrap like={like}>
              <strong>{post_info?.title}</strong>
              <HeartFilled
                onClick={() => {
                  dispatch(preferActions.toggleLikeDB(post_info.productId));
                }}
              />
            </TitleWrap>
            <div>
              <TextInfo>
                <span>{post_info?.author}</span>
                <span>{post_info?.location}</span>
              </TextInfo>
              <PriceInfo>{post_info?.priceInfo}</PriceInfo>
            </div>
          </TextBox>
        </a>
      </CardWrap>
    </>
  );
}
PostCard.defaultProps = {
  small: false,
  like: false,
};
const CardWrap = styled.div`
  border-radius: 10px;
  box-shadow: 0px 4px 30px #0000000a;
  max-width: 240px;
  height: 320px;
  position: relative;
`;
const Img = styled.img`
  width: 100%;
  height: 192px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;
const TextBox = styled.div`
  width: 100%;
  padding: 15px 12px;
  box-sizing: border-box;
  line-height: 1.8;
  & strong {
    font: normal normal medium 15px/18px Noto Sans CJK KR;
    letter-spacing: -0.45px;
    color: #000;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    line-height: 1.2;
    height: 2.4em;
    text-align: left;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

const TitleWrap = styled.div`
  margin-bottom: -18.12px;
  & svg {
    font-size: 18.12px;
    color: ${(props) => (props.like ? '#7F58EC' : '#E2E2E2')};
    margin-top: 5px;
    position: absolute;
    top: 155.49px;
    right: 12px;
  }
`;

const TextInfo = styled.div`
  font-size: 13px;
  letter-spacing: -0.39px;
  color: #595959;
  display: flex;
  margin-right: 12px;
  justify-content: space-between;
  line-height: 2.1;
`;
const PriceInfo = styled.div`
  color: #000;
  font-weight: 600;
`;
export default PostCard;
