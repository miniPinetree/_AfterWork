import { createAction, handleActions } from "redux-actions";
import { actionCreators as userActions } from "./user";
import { getCookie } from "../../shared/Cookie";
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
  collection: [],
};
//회원 관심사 수정
const updateUserInfoDB = (locations, categories, time) => {
  return function (dispatch, getState, { history }) {
    let data = {
      offTime: time,
      locations: locations,
      categorys: categories,
    };
    axios
      .post(`${config.api}/api/user`, data)
      .then((res) => {
        //res.data 없음.
        Swal.fire({
          title: "저장이 완료되었습니다. 😌",
          confirmButtonColor: "#7F58EC",
          confirmButtonText: "확인",
        });
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
      .get(`${config.api}/api/collects`)
      .then((res) => {
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
    const user = getState().user.user
    //delete API 요청에 필요한 collectId가 담긴 배열
    const collects = user?.collects;
    let flag = false;
    // 유저 정보 로드 확인
    if (user && collects) {
      //찜 목록에 존재(true)하면 삭제, 그렇지 않으면 추가
    if(collects?.length !== 0){
      for (let i = 0; i < collects.length; i++) {
        if (collects[i].productId === prd_id) {
          flag = true;
          axios
            .delete(`${config.api}/api/collects/${collects[i].collectId}`)
            .then((res)=>{
              console.log('찜 삭제');
              dispatch(userActions.getUserDB());
              dispatch(getCollectionDB());
            })
            .catch((e) => {
              console.log(e);
            });
        }
      }
    }
    if (flag === false) {
      let data = {
        productId: prd_id,
      };
       axios
        .post(`${config.api}/api/collects`, data)
        .then((res)=>{
          console.log('찜 등록');
          dispatch(userActions.getUserDB());
          dispatch(getCollectionDB());
        })
        .catch((e) => {
          console.log(e);
        });
    }
    }
  };
};

//찜 목록 전체삭제
const deleteCollectionDB = () => {
  return function (dispatch, getState, { history }) {
    let collection = getState().user.user.collects;
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
          axios
            .delete(`${config.api}/api/collects`)
            .then((res) => {
              // 데이터없음
            })
            .catch((e) => {
              console.log(e);
            });
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
