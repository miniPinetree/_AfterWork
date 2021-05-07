import { createAction, handleActions } from "redux-actions";
import { actionCreators as userActions } from "./user";
import { config } from "../../config";
import Swal from "sweetalert2";
import produce from "immer";
import axios from "axios";

//actions
const GET_COLLECTION = "GET_COLLECTION";
const DELETE_COLLECTION = "DELETE_COLLECTION";

//action Creators

const getCollection = createAction(GET_COLLECTION, (collection) => ({
  collection,
}));
const deleteCollection = createAction(DELETE_COLLECTION, (collection = []) => ({
  collection,
}));

//initialState
const initialState = {
  collection: [],
};
//회원 관심사 수정
const updateUserPreferDB = (locations, categories, time) => {
  return function (dispatch, getState, { history }) {
    const user = getState().user.user;
    let data = {
      offTime: time,
      locations: locations,
      categorys: categories,
    };
    axios
      .post(`${config.api}/api/user`, data)
      .then((res) => {
        //res.data 없음.
        let _locations = locations.map((location) => {
          return { name: location };
        });
        let _data = {
          offTime: time,
          locations: _locations,
          categorys: categories,
        };
        dispatch(userActions.getUser({ ...user, ..._data }));
        Swal.fire({
          text: "저장이 완료되었습니다.",
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
    const user = getState().user.user;
    if(!user){
      Swal.fire({
        text: "로그인이 필요한 서비스입니다.",
        confirmButtonColor: "#7F58EC",
        confirmButtonText: "확인",
      });
      return;
    }
    //delete API 요청에 필요한 collectId가 담긴 배열
    const collects = user?.collects;
    console.log(user, collects);
    let flag = false;
    // 유저 정보 로드 확인
    if (user && collects) {
      //찜 목록에 존재(true)하면 삭제, 그렇지 않으면 추가
      if (collects?.length !== 0) {
        for (let i = 0; i < collects.length; i++) {
          if (collects[i].productId === prd_id) {
            flag = true;
            axios
              .delete(`${config.api}/api/collects/${collects[i].collectId}`)
              .then((res) => {
                let _data = collects.filter((val) => {
                  return val.productId !== prd_id;
                });
                let data = {
                  collects: _data,
                };
                console.log("삭제", prd_id, data);
                dispatch(userActions.getUser({ ...user, ...data }));
                dispatch(getCollectionDB());
              })
              .catch((e) => {
                console.log("삭제에러", e);
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
          .then((res) => {
            let data = {
              collects: [...collects, res.data],
            };
            console.log("등록", prd_id, data);
            dispatch(userActions.getUser({ ...user, ...data }));
            dispatch(getCollectionDB());
          })
          .catch((e) => {
            console.log("등록에러", e);
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
        text: "삭제할 정보가 없습니다.",
        confirmButtonColor: "#7F58EC",
        confirmButtonText: "확인",
      });
    } else {
      Swal.fire({
        text: "전부 삭제하시겠어요? 😲",
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
  updateUserPreferDB,
  getCollectionDB,
  toggleLikeDB,
  deleteCollectionDB,
};

export { actionCreators };
