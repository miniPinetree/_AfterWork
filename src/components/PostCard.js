import React from 'react';
import styled from 'styled-components';
import Permit from '../shared/Permit';
import { HeartFilled, HeartTwoTone } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { actionCreators as preferActions } from '../redux/modules/prefer';

function PostCard(props) {
  // 취미 상품 카드
  const dispatch = useDispatch();
  // 찜 여부와 상품 정보를 프롭스로 받는다
  const { like, post_info } = props;
  const price = post_info?.priceInfo?.split('원');

  return (
    <>
      <CardWrap className='wrap'>
        {/* 카드 클릭 시 새창에서 해당 페이지로 이동 */}
        <a href={post_info.siteUrl} target='_blank' rel='noreferrer noopener'>
          <Img
            src={post_info?.imgUrl}
            alt='img'
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'http://admin.sjcam.kr/dev/upload/noimage.jpg';
            }}
          />
          <TextBox>
            <TitleWrap like={like}>
              <strong>{post_info?.title}</strong>
              <Permit>
                {/* 찜하는 기능은 회원만 가능하게 랜더링 */}
                {like ? (
                  <HeartFilled
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(preferActions.toggleLikeDB(post_info.productId));
                    }}
                  />
                ) : (
                  <HeartTwoTone
                    twoToneColor='#E2E2E2'
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(preferActions.toggleLikeDB(post_info.productId));
                    }}
                  />
                )}
              </Permit>
            </TitleWrap>
            <div>
              <TextInfo>
                {/* 작성자, 지역 표시 */}
                <span>{post_info?.author}</span>
                <span>{post_info?.location}</span>
              </TextInfo>
              <PriceInfo>
                {/* 가격 정보 */}
                {price && (
                  <>
                    <span style={{ fontWeight: '600' }}>{price[0]}</span>
                    {price[0] !== '문의' ? <span>원</span> : null}
                    {price[1]}
                  </>
                )}
              </PriceInfo>
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
  box-shadow: 0px 10px 15px #e0e0e0;
  max-width: 240px;
  height: 340px;
  cursor: pointer;
  position: relative;
`;
const Img = styled.img`
  width: 100%;
  height: 192px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  &:hover {
    opacity: 0.7;
  }
`;
const TextBox = styled.div`
  width: 100%;
  padding: 15px 12px;
  box-sizing: border-box;
  line-height: 1.8;
  & strong {
    font-size: 15px;
    font-family: Noto Sans CJK KR;
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
  & svg {
    font-size: 18.12px;
    color: #7f58ec;
    margin-top: 5px;
    position: absolute;
    top: 155.49px;
    right: 12px;
    :hover {
      opacity: 0.75;
      -webkit-transform: scale(1.2);
      transform: scale(1.2);
    }
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
`;
export default PostCard;
