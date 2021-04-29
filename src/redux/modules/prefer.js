import { createAction, handleActions } from "redux-actions";
import { config } from "../../config";
import Swal from "sweetalert2";
import produce from "immer";
import axios from "axios";

//actions
const UPDATE_USER_INFO = "UPDATE_USER_INFO";
const GET_COLLECTION = "GET_COLLECTION";
const LIKE_TOGGLE = "LIKE_TOGGLE";
const DELETE_COLLECTION = "DELETE_COLLECTION";

//action Creators
const updateUserInfo = createAction(UPDATE_USER_INFO, (user_prefer) => ({
  user_prefer,
}));
const getCollection = createAction(GET_COLLECTION, (collection) => ({
  collection,
}));
const likeToggle = createAction(LIKE_TOGGLE, (collection) => ({ collection }));
const deleteCollection = createAction(DELETE_COLLECTION, (collection = []) => ({
  collection,
}));

//initialState
const initialState = {
  collection: [
    //테스트용 임시 데이터 삭제예정
    {
        "productId": 433,
        "title": "일반인 운동 쉽고 빠르게 그리고 간단하게",
        "price": 44000,
        "priceInfo": "￦44,000/시간",
        "author": "신성영",
        "imgUrl": "https://img.taling.me/Content/Uploads/Cover/s_4794141ff0871fbdc5f5bec51b2778a246de813e.jpg",
        "location": "서울,강남",
        "popularity": 18,
        "status": "N",
        "siteName": "Taling",
        "siteUrl": "https://taling.me/Talent/Detail/18634",
        "category": null,
        "collects": [], // 불필요하다 생각 성능상 이슈
        "online": false
    },
    {
        "productId": 426,
        "title": "(도봉역)초보자/근력운동 편하고 즐겁게 하기^^/1대1PT /추가비용없이!",
        "price": 36300,
        "priceInfo": "￦36,300",
        "author": "민병철",
        "imgUrl": "https://img.taling.me/Content/Uploads/Cover/s_0e982244cee2f1ae22a36534c0a23d4c23f13cc7.jpg",
        "location": "서울,노원",
        "popularity": 125,
        "status": "N",
        "siteName": "Taling",
        "siteUrl": "https://taling.me/Talent/Detail/12623",
        "category": null,
        "collects": [],
        "online": false
    }
],
};

//회원 관심사 수정
const updateUserInfoDB = (location, offTime, interests) => {
  return function (dispatch, getState, { history }) {
    const id = getState().user.user.uid;
    let user_prefer = {
      offTime: offTime,
      locations: location,
      interests: interests,
    };
    axios
      .post(`${config}/api/profile/${id}`, user_prefer)
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
};
//찜 목록 불러오기
const getCollectionDB = () => {
  return function (dispatch, getState, { history }) {
    axios
      .get(`${config}/api/collects`)
      .then((res) => {
        console.log(res.data); //테스트 후 삭제예정
        dispatch(getCollection(res.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

//찜 등록 및 개별 삭제
const toggleLikeDB = (prd_id) => {
  return function (dispatch, getState, { history }) {
    console.log("토글연결");
    // 로그인한 유저인지 확인
    if (!getState().user.user) {
      return;
    }
    let userCollects = getState().user.user.collects;
    let postList = getState().post.post_list;
    let difference = postList.filter(post => !userCollects.includes(post));
    // const checkPrdId = (element) =>{
    //   if(element.productId === prd_id){
    //     return true;
    //   }
    // }
    // //찜 목록에 없으면 추가, 있으면 삭제
    // if (collection.some(checkPrdId)) {
    //   collection.filter((prd) => {
    //     return prd !== post;
    //   });
    //   dispatch(likeToggle(collection));
    // }
    //     let data={
    //       productId:prd_id,
    //     }
    //     if(해당 게시물의 좋아요 여부 체크){
    //       axios.post(`${config}/api/likes`, data)
    //       .then((res)=>{
    //         console.log(res.data);
    //         dispatch(likeToggle(prd_id));
    //     }).catch((e)=>{
    //         console.log(e);
    //     });
    //   }else{
    //     axios.delete(`${config}/api/likes/${prd_id}`)
    //     .then((res)=>{
    //       console.log(res.data);
    //       dispatch(likeToggle(prd_id));
    //   }).catch((e)=>{
    //       console.log(e);
    //   });
    // }
  };
};

//찜 목록 전체삭제
const deleteCollectionDB = () => {
  return function (dispatch, getState, { history }) {
    let collection = getState().preference.collection;
    console.log(collection);
    if (collection.length === 0) {
      Swal.fire({
        title: "삭제할 정보가 없습니다. 😌",
        confirmButtonColor: "#7F58EC",
        confirmButtonText: "확인",
      });
    } else {
      Swal.fire({
        title: "전부 삭제하시겠어요? 😲",
        showCancelButton: true,
        confirmButtonColor: "#7F58EC",
        confirmButtonText: "삭제",
        cancelButtonText: "취소",
      }).then((result) => {
        if (result.isConfirmed) {
          //   axios.delete(`${config}/api/likes`)
          //   .then((res)=>{
          //     console.log(res.data);
          // }).catch((e)=>{
          //     console.log(e);
          // });
          // }
          dispatch(deleteCollection());
        }
      });
    }
  };
};

//reducer
export default handleActions(
  {
    [UPDATE_USER_INFO]: (state, action) =>
      produce(state, (draft) => {
        draft.user_prefer = action.payload.user_prefer;
      }),
    [LIKE_TOGGLE]: (state, action) =>
      produce(state, (draft) => {
        draft.collection = action.payload.collection;
      }),
    [GET_COLLECTION]: (state, action) =>
      produce(state, (draft) => {
        draft.collection = action.payload.collection;
      }),
    [DELETE_COLLECTION]: (state, action) =>
      produce(state, (draft) => {
        draft.collection = action.payload.collection;
      }),
  },
  initialState
);

const actionCreators = {
  updateUserInfoDB,
  getCollectionDB,
  toggleLikeDB,
  deleteCollectionDB,
};

export { actionCreators };
