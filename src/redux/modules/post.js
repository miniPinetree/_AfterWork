import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import axios from 'axios';
import { config } from '../../config';

const CATEGORY_LIST = 'CATEGORY_LIST';
const POST_LIST = 'POST_LIST';

const categoryList = createAction(CATEGORY_LIST, (list) => ({ list }));
const postList = createAction(POST_LIST, (post_list) => ({ post_list }));

const initialState = {
  category_list: [],
  post_list: [],
};

const getCategoryDB = () => {
  return function (dispatch, getState, { history }) {
    axios({
      method: 'get',
      url: `${config.api}/api/categorys`,
    })
      .then((res) => {
        dispatch(categoryList(res.data));
      })
      .catch((e) => {
        console.log('에러발생', e);
      });
  };
};

const getPostDB = (id) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: 'get',
      url: `${config.api}/api/categorys/${id}?page=0&size=10`,
    })
      .then((res) => {
        dispatch(postList(res.data.content));
      })
      .catch((e) => {
        console.log('에러발생', e);
      });
  };
};

export default handleActions(
  {
    [CATEGORY_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.category_list = action.payload.list;
      }),
    [POST_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.post_list = action.payload.post_list;
      }),
  },
  initialState,
);

const actionCreators = {
  getCategoryDB,
  getPostDB,
};

export { actionCreators };
