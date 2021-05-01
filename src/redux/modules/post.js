import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import axios from 'axios';
import { config } from '../../config';

const CATEGORY_LIST = 'CATEGORY_LIST';
const POST_LIST = 'POST_LIST';
const SCROLL_POST_LIST = 'SCROLL_POST_LIST';
const SEARCH_LIST = 'SEARCH_LIST';
const SCROLL_SEARCH_LIST = 'SCROLL_SEARCH_LIST';
const POPULAR_LIST = 'POPULAR_LIST';
const PAGING = 'PAGING';
const LOADING = 'LOADING';
const VIEW_LOADING = 'VIEW_LOADING';

const categoryList = createAction(CATEGORY_LIST, (list) => ({ list }));
const postList = createAction(POST_LIST, (post_list) => ({
  post_list,
}));
const scrollPostList = createAction(SCROLL_POST_LIST, (post_list) => ({
  post_list,
}));
const searchList = createAction(SEARCH_LIST, (post_list) => ({ post_list }));
const scrollSearchList = createAction(SCROLL_SEARCH_LIST, (post_list) => ({
  post_list,
}));
const popularList = createAction(POPULAR_LIST, (post_list) => ({ post_list }));
const pagingInfo = createAction(PAGING, (paging) => ({ paging }));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));
const viewLoading = createAction(VIEW_LOADING, (view_loading) => ({
  view_loading,
}));

const initialState = {
  category_list: [],
  post_list: [],
  paging: {
    id: undefined,
    page: 1,
    size: 12,
    sort: 'popularity',
    direction: 'desc',
    keyword: '',
  },
  popular_list: [],
  is_loading: false,
  view_loading: false,
};

const getCategoryDB = () => {
  return function (dispatch) {
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
const getPopularListDB = () => {
  return function (dispatch) {
    axios({
      method: 'get',
      url: `${config.api}/api/search?page=0&size=12&sort=popularity&direction=desc`,
    })
      .then((res) => {
        dispatch(popularList(res.data.content));
      })
      .catch((e) => {
        console.log('에러 발생', e);
      });
  };
};

const getPostDB = (id, sort = 'popularity', direction = 'desc') => {
  return function (dispatch) {
    dispatch(viewLoading(true));
    axios({
      method: 'get',
      url: `${config.api}/api/categorys/${id}?page=0&size=12&sort=${sort}&direction=${direction}`,
    })
      .then((res) => {
        let paging = {
          id: id,
          page: 1,
          size: 12,
          sort: sort,
          direction: direction,
        };
        dispatch(postList(res.data.content));
        dispatch(pagingInfo(paging));
      })
      .catch((e) => {
        console.log('에러발생', e);
      });
  };
};

const getSearchDB = (keyword, sort = 'popularity', direction = 'desc') => {
  return function (dispatch) {
    dispatch(viewLoading(true));
    axios({
      method: 'get',
      url: `${config.api}/api/search?keyword=${keyword}&page=0&size=12&sort=${sort}&direction=${direction}`,
    })
      .then((res) => {
        let paging = {
          keyword: keyword,
          page: 1,
          size: 12,
          sort: sort,
          direction: direction,
          total: res.data.totalElements,
        };
        dispatch(searchList(res.data.content));
        dispatch(pagingInfo(paging));
      })
      .catch((e) => {
        console.log('에러발생', e);
      });
  };
};

const scrollGetPostDB = () => {
  return function (dispatch, getState) {
    const _paging = getState().post.paging;
    const id = _paging.id;
    const page = _paging.page;
    const size = _paging.size;
    const sort = _paging.sort;
    const direction = _paging.direction;
    if (!page) {
      return;
    }
    dispatch(loading(true));
    axios({
      method: 'get',
      url: `${config.api}/api/categorys/${id}?page=${page}&size=${size}&sort=${sort}&direction=${direction}`,
    })
      .then((res) => {
        let paging = {
          id: id,
          page: res.data.totalPages !== page ? page + 1 : null,
          size: size,
          sort: sort,
          direction: direction,
        };
        dispatch(scrollPostList(res.data.content));
        dispatch(pagingInfo(paging));
      })
      .catch((e) => {
        console.log('에러발생', e);
      });
  };
};

const scrollSearchDB = () => {
  return function (dispatch, getState) {
    const _paging = getState().post.paging;
    const keyword = _paging.keyword;
    const page = _paging.page;
    const size = _paging.size;
    const sort = _paging.sort;
    const direction = _paging.direction;
    if (!page) {
      return;
    }
    dispatch(loading(true));
    axios({
      method: 'get',
      url: `${config.api}/api/search?keyword=${keyword}&page=${page}&size=${size}&sort=${sort}&direction=${direction}`,
    })
      .then((res) => {
        let paging = {
          keyword: keyword,
          page: res.data.totalPages !== page ? page + 1 : null,
          size: size,
          sort: sort,
          direction: direction,
          total: res.data.totalElements,
        };
        dispatch(scrollSearchList(res.data.content));
        dispatch(pagingInfo(paging));
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
        draft.view_loading = false;
      }),
    [SEARCH_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.post_list = action.payload.post_list;
        draft.view_loading = false;
      }),
    [SCROLL_POST_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.post_list.push(...action.payload.post_list);
        draft.is_loading = false;
      }),
    [SCROLL_SEARCH_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.post_list.push(...action.payload.post_list);
        draft.is_loading = false;
      }),
    [POPULAR_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.popular_list = action.payload.post_list;
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
    [VIEW_LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.view_loading = action.payload.view_loading;
      }),
    [PAGING]: (state, action) =>
      produce(state, (draft) => {
        draft.paging = action.payload.paging;
      }),
  },
  initialState,
);

const actionCreators = {
  getCategoryDB,
  getPostDB,
  getSearchDB,
  scrollGetPostDB,
  scrollSearchDB,
  getPopularListDB,
};

export { actionCreators };
