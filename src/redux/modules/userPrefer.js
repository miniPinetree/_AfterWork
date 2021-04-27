import { createAction, handleActions } from 'redux-actions';
import { config } from '../../shared/config';
import produce from 'immer';
import axios from 'axios';

//actions
const UPDATE_USER_INFO = 'UPDATE_USER_INFO';
const LIKE_TOGGLE = 'LIKE_TOGGLE';

//action Creators
const updateUserInfo = createAction(UPDATE_USER_INFO, (user_info) => ({ user_info }));
const likeToggle = createAction(LIKE_TOGGLE, (prd_id, is_like = false) => ({
    prd_id,
    is_like,
  }));

//initialState
const initialState = {
    user_info: {
        "location": "서울",
        "offTime": "퇴근 시간",
        "interests" : [
                 {"id": 1},
                 {"id": 2},
                 {"id": 3}
            ]
     },
  };

const updateUserInfoDB=(id,location,offTime,interests)=>{
    return function(dispatch, getState, {history}){
        //로그인 기능 구현 후 id getState로 수정하기
        // let user_info = {
        //     location:location,
        //     offTime:offTime,
        //     interests:interests,
        // }
        // axios.post(`${config}/api/profile/${id}`, userInfo)
        // .then((res)=>{
        //     console.log(res.data);
        // }).catch((e)=>{
        //     console.log(e);
        // })
    }
};

const toggleLikeFB = (prd_id)=>{
    return function (dispatch, getState, { history }) {
        if (!getState().user.user) {
          return;
        }
      };
}

//reducer
export default handleActions(
    {
        [UPDATE_USER_INFO]: (state, action) =>
        produce(state, (draft) => {
          draft.user_info = action.payload.user_info;
        }),
        [LIKE_TOGGLE]: (state, action) =>
      produce(state, (draft) => {
        // 배열에서 몇 번째에 있는 지 찾은 다음, is_like를 action에서 가져온 값으로 바꾸기!
        let idx = draft.list.findIndex((p) => p.id === action.payload.prd_id);
        draft.list[idx].is_like = action.payload.is_like;
      }),
    },
    initialState,
);

const actionCreators = {
    updateUserInfo,
    updateUserInfoDB
};

export {actionCreators};