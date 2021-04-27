import { createAction, handleActions } from 'redux-actions';
import { config } from '../../shared/config';
import Swal from "sweetalert2";
import produce from 'immer';
import axios from 'axios';

//actions
const UPDATE_USER_INFO = 'UPDATE_USER_INFO';
const GET_COLLECTION = 'GET_COLLECTION';
const LIKE_TOGGLE = 'LIKE_TOGGLE';
const DELETE_COLLECTION = 'DELETE_COLLECTION';

//action Creators
const updateUserInfo = createAction(UPDATE_USER_INFO, (user_prefer) => ({ user_prefer }));
const getCollection = createAction(GET_COLLECTION, (collection)=>({collection}));
const likeToggle = createAction(LIKE_TOGGLE, (prd_id, is_like = false) => ({
    prd_id,
    is_like,
  }));
const deleteCollection = createAction(DELETE_COLLECTION,(collection=[])=>({collection}));

//initialState
const initialState = {
  user_prefer: {
     //크롤링 데이터 기준 확인 후 범위확정
        "location": ["서초구","송파구","성동구"
        ],
        "offTime": "18:30:00",
        "interests" : [
                 {"1": "아트"},
                 {"2": "교육"},
                 {"3": "공예"},
            ]
     },
     collection : [
     ]
  };
//회원 관심사 수정
const updateUserInfoDB=(location,offTime,interests)=>{
    return function(dispatch, getState, {history}){
        const id = getState().user.user.uid;
        let user_prefer = {
            location:location,
            offTime:offTime,
            interests:interests,
        }
        axios.post(`${config}/api/profile/${id}`, user_prefer)
        .then((res)=>{
            console.log(res.data);
        }).catch((e)=>{
            console.log(e);
        })
    }
};
//찜 목록 불러오기
const getCollectionDB=(id,location,offTime,interests)=>{
  return function(dispatch, getState, {history}){
    axios.get(`${config}/api/profile/${id}`)
    .then((res)=>{
      console.log(res.data);
  }).catch((e)=>{
      console.log(e);
  })
  }
};

//찜 등록 및 개별 삭제
const toggleLikeDB = (prd_id)=>{
    return function (dispatch, getState, { history }) {
      console.log('토글연결')
        //로그인한 유저인지 확인
    //   if (!getState().user.user) {
    //       return;
    //     }
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
const deleteCollectionDB=()=>{
  return function(dispatch, getState, {history}){
    Swal.fire({
      title: "전부 삭제하시겠어요?",
      showCancelButton: true,
      confirmButtonColor: "#E2344E",
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
    }});
  }
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
        // 배열에서 몇 번째에 있는 지 찾은 다음, is_like를 action에서 가져온 값으로 바꾸기!
        let idx = draft.list.findIndex((p) => p.id === action.payload.prd_id);
        draft.list[idx].is_like = action.payload.is_like;
      }),
      [GET_COLLECTION]:(state, action) =>
      produce(state, (draft) => {
        draft.collection = action.payload.collection;
      }),
      [DELETE_COLLECTION]:(state, action) =>
      produce(state, (draft) => {
        draft.collection = action.payload.collection;
      }),
    },
    initialState,
);

const actionCreators = {
    updateUserInfoDB,
    getCollectionDB,
    toggleLikeDB,
    deleteCollectionDB,
};

export {actionCreators};