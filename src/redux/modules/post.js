import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import axios from 'axios';
import { config } from '../../config';

const CATEGORY_LIST = 'CATEGORY_LIST';
const POST_LIST = 'POST_LIST';
const SCROLL_POST_LIST = 'SCROLL_POST_LIST';
const LOADING = 'LOADING';

const categoryList = createAction(CATEGORY_LIST, (list) => ({ list }));
const postList = createAction(POST_LIST, (post_list, paging) => ({
  post_list,
  paging,
}));
const scrollPostList = createAction(SCROLL_POST_LIST, (post_list, paging) => ({
  post_list,
  paging,
}));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

const initialState = {
  category_list: [],
  post_list: [],
  paging: { page: 1, size: 10 },
  is_loading: false,
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
        let paging = {
          page: 1,
          size: 10,
        };
        dispatch(postList(res.data.content, paging));
      })
      .catch((e) => {
        console.log('에러발생', e);
      });
  };
};
const scrollGetPostDB = (id, page = 1, size = 10) => {
  return function (dispatch, getState, { history }) {
    let _paging = getState().post.paging;
    if (!_paging.page) {
      return;
    }
    dispatch(loading(true));
    axios({
      method: 'get',
      url: `${config.api}/api/categorys/${id}?page=${page}&size=${size}`,
    })
      .then((res) => {
        console.log(res.data);
        let paging = {
          page: res.data.totalPages !== page ? page + 1 : null,
          size: size,
        };
        dispatch(scrollPostList(res.data.content, paging));
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
        draft.paging = action.payload.paging;
      }),
    [SCROLL_POST_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.post_list.push(...action.payload.post_list);
        if (action.payload.paging) {
          draft.paging = action.payload.paging;
        }
        draft.is_loading = false;
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
  },
  initialState,
);

const actionCreators = {
  getCategoryDB,
  getPostDB,
  scrollGetPostDB,
};

export { actionCreators };
