import React from 'react';
import styled from 'styled-components';
import { HeartFilled, HeartTwoTone, LikeOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { actionCreators as preferActions } from '../redux/modules/prefer';

function PostCard(props) {
  // 취미 상품 카드
  const dispatch = useDispatch();
  // 찜 여부와 상품 정보를 프롭스로 받는다
  const { like, post_info, is_responsive } = props;

  return (
    <>
      <CardWrap className='wrap' is_responsive={is_responsive}>
        {/* 카드 클릭 시 새창에서 해당 페이지로 이동 */}
        <a href={post_info.siteUrl} target='_blank' rel='noreferrer noopener'>
          <Img
            src={post_info?.imgUrl}
            alt='img'
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                'https://afterwork-webservice-static.s3.ap-northeast-2.amazonaws.com/logo/default_image.jpg';
            }}
          />
          <TextBox>
            <TitleWrap like={like}>
              <strong>{post_info?.title}</strong>

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
              <SiteName>{post_info?.siteName}</SiteName>
            </TitleWrap>
            <div>
              <TextInfo>
                {/* 인기도, 작성자, 지역 표시 */}
                <div>
                  <span>{post_info?.author}</span>
                  {post_info?.author && post_info?.location ? (
                    <span> / </span>
                  ) : null}
                  <span>{post_info?.location}</span>
                </div>
              </TextInfo>
              <PriceInfo>
                <InfoBox>
                  <div>
                    {/* 가격 정보 */}
                    {post_info && (
                      <>
                        <span style={{ fontWeight: '600' }}>
                          {post_info?.priceInfo}
                        </span>
                      </>
                    )}
                  </div>
                  <div>
                    {/* 좋아요 갯수 */}
                    <LikeOutlined style={{ color: '#7F58EC' }} />
                    <span style={{ marginLeft: '4px', color: '#7F58EC' }}>
                      {post_info?.popularity}
                    </span>
                  </div>
                </InfoBox>
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
  height: 320px;
  margin-bottom: 10px;
  cursor: pointer;
  position: relative;
  @media only screen and (max-width: 1024px) {
    margin-top: 11.27px;
    max-width: 215px;
    height: 280.73px;
    margin-bottom: 20px;
  }
  @media only screen and (max-width: 768px) {
    max-width: ${(props) => (props.is_responsive ? '168px' : '215px')};
  }
  @media only screen and (max-width: 414px) {
    margin-top: 11.27px;
    max-width: 162px;
    height: 235.73px;
    margin-bottom: 20px;
  }
`;
const Img = styled.img`
  width: 100%;
  object-fit:cover;
  height: 192px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  &:hover {
    opacity: 0.7;
  }
  @media only screen and (max-width: 1024px) {
    height: 165px;
  }
  @media only screen and (max-width: 414px) {
    height: 126px;
  }
`;
const TextBox = styled.div`
  width: 100%;
  padding: 15px 12px;
  box-sizing: border-box;
  line-height: 1.8;
  & strong {
    font-size: 15px;
    font-family: 'Noto Sans CJK KR';
    font-weight: 600;
    letter-spacing: -0.45px;
    color: #333;
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
  @media only screen and (max-width: 1024px) {
    & strong {
      font-size: 13px;
      letter-spacing: -0.26px;
    }
  }
  @media only screen and (max-width: 414px) {
    padding: 15px 10px;
    & strong {
      font-size: 13px;
      letter-spacing: -0.15px;
      line-height: 1.3;
    }
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
  @media only screen and (max-width: 1024px) {
    & svg {
      top: 120px;
      right: 11.3px;
    }
  }
  @media only screen and (max-width: 414px) {
    & svg {
      top: 98.42px;
      right: 7.87px;
    }
  }
`;

const SiteName = styled.div`
  position: absolute;
  top: 14px;
  padding: 1px 3px;
  box-sizing: border-box;
  font-size: 13px;
  letter-spacing: -0.39px;
  color: #7f58ec;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #7f58ec66;
  border-radius: 3px;
  @media only screen and (max-width: 1024px) {
    font-size: 11px;
    letter-spacing: -0.33px;
    top: 12px;
    left: 10px;
  }
  @media only screen and (max-width: 414px) {
    font-size: 10px;
    letter-spacing: -0.3px;
    top: 7px;
    left: 8px;
  }
`;

const TextInfo = styled.div`
  font-size: 13px;
  letter-spacing: -0.39px;
  color: #666;
  display: flex;
  flex-direction: column;
  line-height: 2.1;
  height: 27px;
  overflow: hidden;
  margin-top: -18.11px;
  @media only screen and (max-width: 1024px) {
    font-size: 11px;
    letter-spacing: -0.22px;
    overflow: hidden;
  }
  @media only screen and (max-width: 414px) {
    font-size: 11px;
    letter-spacing: -0.11px;
    height: 21px;
    overflow: hidden;
  }
`;
const InfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  letter-spacing: -0.42px;
  @media only screen and (max-width: 1024px) {
    font-size: 12px;
    letter-spacing: -0.24px;
  }
  @media only screen and (max-width: 414px) {
    font-size: 12px;
    letter-spacing: -0.12px;
  }
`;
const PriceInfo = styled.div`
  color: #333;
`;

export default PostCard;
