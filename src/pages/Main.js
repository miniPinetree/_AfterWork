import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Banner from "../components/Banner";
import Carousel from "../components/Carousel";
import CategoryCard from "../components/CategoryCard";
import PostCard from "../components/PostCard";
import { actionCreators as postActions } from "../redux/modules/post";
import Permit from "../shared/Permit";
import Swal from "sweetalert2";

function Main(props) {
    const { history } = props;
    const dispatch = useDispatch();
    const category_list = useSelector((state) => state.post?.category_list);
    const popularList = useSelector((state) => state.post?.popular_list);
    const nearList = useSelector((state) => state.post?.near_list);
    const interests = useSelector((state) => state.user.user?.interests);
    const collection_list = useSelector((state) => state.prefer?.collection);
    const collection = collection_list.map((val) => {
        return val.productId;
    });

    useEffect(() => {
        if (category_list.length === 0) {
            dispatch(postActions.getCategoryDB());
        }
        if (popularList.length === 0) {
            dispatch(postActions.getPopularListDB());
        }
        if (nearList.length === 0) {
            dispatch(postActions.getNearListDB());
        }
        if (props.location.state && props.location.state.error) {
            setTimeout(() => {
                Swal.fire({
                    text: "이미 가입된 이메일입니다. 다시 시도해 주세요",
                    confirmButtonColor: "#7F58EC",
                    confirmButtonText: "확인",
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
            <Carousel text="카테고리" size="5">
                {category_list.map((val, idx) => {
                    return <CategoryCard key={idx + "category"} {...val} />;
                })}
            </Carousel>
            <Carousel text="인기 취미 아이템">
                {popularList.map((val, idx) => {
                    return collection.includes(val.productId) === true ? (
                        <PostCard post_info={val} key={idx + "popular"} like />
                    ) : (
                        <PostCard post_info={val} key={idx + "popular"} />
                    );
                })}
            </Carousel>

            <Permit>
                {interests?.length ? (
                    <Carousel text="근처의 아이템">
                        {nearList.map((val, idx) => {
                            return collection.includes(val.productId) === true ? (
                                <PostCard post_info={val} key={idx + "near"} like />
                            ) : (
                                <PostCard post_info={val} key={idx + "near"} />
                            );
                        })}
                    </Carousel>
                ) : (
                    <Wrap>
                        <TitleContainer>
                            <Title>근처의 아이템</Title>
                        </TitleContainer>
                        <EmptyList>
                            <p>지역을 설정하고 근처의 아이템을 찾아보세요!</p>
                            <button
                                onClick={() => {
                                    history.push("/userdetail");
                                }}
                            >
                                지역 설정하러 가기 {">"}
                            </button>
                        </EmptyList>
                    </Wrap>
                )}
            </Permit>
        </>
    );
}

const Wrap = styled.div`
    margin: 75px 0;
    cursor: default;
`;

const TitleContainer = styled.div`
    max-width: 1004px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #000;
`;
const Title = styled.div`
    font-size: 20px;
    letter-spacing: -0.6px;
    font-weight: 700;
`;
const EmptyList = styled.div`
    max-width: 1004px;
    margin: 20px auto;
    color: #000;
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
        color: #676767;
    }
    & button {
        max-width: 165px;
        height: 28px;
        font-size: 15px;
        color: #ffffff;
        background: transparent linear-gradient(124deg, #7f58ec 0%, #5c5ce3 100%) 0% 0% no-repeat
            padding-box;
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
`;

export default Main;
