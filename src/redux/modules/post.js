import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import axios from 'axios';
import { config } from '../../config';

// 액션
const CATEGORY_LIST = 'CATEGORY_LIST';
const POST_LIST = 'POST_LIST';
const SCROLL_POST_LIST = 'SCROLL_POST_LIST';
const SEARCH_LIST = 'SEARCH_LIST';
const SCROLL_SEARCH_LIST = 'SCROLL_SEARCH_LIST';
const POPULAR_LIST = 'POPULAR_LIST';
const ONLINE_LIST = 'ONLINE_LIST';
const OFFLINE_LIST = 'OFFLINE_LIST';
const NEAR_LIST = 'NEAR_LIST';
const CATEGORY_RECOMMEND_LIST = 'CATEGORY_RECOMMEND_LIST';
const PAGING = 'PAGING';
const LOADING = 'LOADING';
const VIEW_LOADING = 'VIEW_LOADING';

// 액션 생성 함수
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
const onlineList = createAction(ONLINE_LIST, (post_list) => ({ post_list }));
const offlineList = createAction(OFFLINE_LIST, (post_list) => ({ post_list }));
const nearList = createAction(NEAR_LIST, (post_list) => ({ post_list }));
const categoryRecommendList = createAction(
  CATEGORY_RECOMMEND_LIST,
  (post_list) => ({ post_list }),
);
const pagingInfo = createAction(PAGING, (paging) => ({ paging }));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));
const viewLoading = createAction(VIEW_LOADING, (view_loading) => ({
  view_loading,
}));

// initialState
const initialState = {
  // 카테고리 리스트
  category_list: [],
  // 게시물 리스트
  post_list: [],
  // 페이징 정보

  paging: {
    id: undefined,
    page: 1,
    size: 12,
    sort: 'popularity',
    direction: 'desc',
    keyword: '',
    total: undefined,
    filter: 'total',
    sitename:
      '탈잉,클래스101,하비인더박스,아이디어스,마이비스킷,모카클래스,하비풀',
  },
  // 인기 게시물
  popular_list: [],
  // 오늘의 온라인 게시물
  online_list: [],
  // 오늘의 오프라인 게시물
  offline_list: [],
  // 근처 게시물
  near_list: [],
  // 관심 카테고리 추천 게시물
  recommend_list: [],
  // 스크롤 시 로딩
  is_loading: false,
  // 랜더링 시 로딩
  view_loading: false,
};

// 카테고리 리스트 조회
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

// 인기 취미 리스트 조회
const getPopularListDB = () => {
  return function (dispatch) {
    axios({
      method: 'get',
      url: `${config.api}/api/search?page=0&size=20&sort=popularity&direction=desc`,
    })
      .then((res) => {
        dispatch(popularList(res.data.content));
      })
      .catch((e) => {
        console.log('에러 발생', e);
      });
  };
};
// 오늘의 온라인 취미 리스트 조회
const getOnlineListDB = () => {
  return function (dispatch) {
    axios({
      method: 'get',
      url: `${config.api}/api/recommend/online`,
    })
      .then((res) => {
        res.data === ''
          ? dispatch(onlineList([]))
          : dispatch(onlineList(res.data));
      })
      .catch((e) => {
        console.log('에러발생', e);
      });
  };
};
// 오늘의 오프라인 취미 리스트 조회
const getOfflineListDB = () => {
  return function (dispatch) {
    axios({
      method: 'get',
      url: `${config.api}/api/recommend/offline`,
    })
      .then((res) => {
        res.data === ''
          ? dispatch(offlineList([]))
          : dispatch(offlineList(res.data));
      })
      .catch((e) => {
        console.log('에러발생', e);
      });
  };
};
// 관심 지역 취미 항목 조회
const getNearListDB = () => {
  return function (dispatch) {
    axios({
      method: 'get',
      url: `${config.api}/api/recommend`,
    })
      .then((res) => {
        // 값이 없을때 ''으로 보내주기때문에 데이터는 배열이므로 []로 만들어줌
        res.data === '' ? dispatch(nearList([])) : dispatch(nearList(res.data));
      })
      .catch((e) => {
        console.log('에러 발생', e);
      });
  };
};

// 관심 카테고리 취미 추천 항목 조회
const getCategoryRecommendDB = () => {
  return function (dispatch) {
    axios({
      method: 'get',
      url: `${config.api}/api/recommend/category`,
    })
      .then((res) => {
        res.data === ''
          ? dispatch(nearList([]))
          : dispatch(categoryRecommendList(res.data));
      })
      .catch((e) => {
        console.log('에러 발생', e);
      });
  };
};

// 게시물 조회(랜더링 시)
const getPostDB = (
  id,
  sort = 'popularity',
  direction = 'desc',
  filter = 'total',
  sitename = '탈잉,클래스101,하비인더박스,아이디어스,마이비스킷,모카클래스,하비풀',
) => {
  return function (dispatch) {
    dispatch(viewLoading(true));
    axios({
      method: 'get',
      url: `${config.api}/api/categorys/${id}?page=0&size=12&sort=${sort}&direction=${direction}&filter=${filter}&sitename=${sitename}`,
    })
      .then((res) => {
        let paging = {
          id: id,
          page: 1,
          size: 12,
          sort: sort,
          direction: direction,
          filter: filter,
          sitename: sitename,
        };
        dispatch(postList(res.data.content));
        dispatch(pagingInfo(paging));
      })
      .catch((e) => {
        console.log('에러발생', e);
      });
  };
};

// 검색한 게시물 조회(랜더링 시)
const getSearchDB = (
  keyword,
  sort = 'popularity',
  direction = 'desc',
  filter = 'total',
  sitename = '탈잉,클래스101,하비인더박스,아이디어스,마이비스킷,모카클래스,하비풀',
) => {
  return function (dispatch) {
    dispatch(viewLoading(true));
    axios({
      method: 'get',
      url: `${config.api}/api/search?keyword=${keyword}&page=0&size=12&sort=${sort}&direction=${direction}&filter=${filter}&sitename=${sitename}`,
    })
      .then((res) => {
        let paging = {
          keyword: keyword,
          page: 1,
          size: 12,
          sort: sort,
          direction: direction,
          total: res.data.totalElements,
          filter: filter,
          sitename: sitename,
        };
        dispatch(searchList(res.data.content));
        dispatch(pagingInfo(paging));
      })
      .catch((e) => {
        console.log('에러발생', e);
      });
  };
};

// 게시물 조회(스크롤 이벤트 발생 시, 무한스크롤)
const scrollGetPostDB = () => {
  return function (dispatch, getState) {
    const _paging = getState().post.paging;
    const id = _paging.id;
    const page = _paging.page;
    const size = _paging.size;
    const sort = _paging.sort;
    const direction = _paging.direction;
    const filter = _paging.filter;
    const sitename = _paging.sitename;
    if (!page) {
      return;
    }
    dispatch(loading(true));
    axios({
      method: 'get',
      url: `${config.api}/api/categorys/${id}?page=${page}&size=${size}&sort=${sort}&direction=${direction}&filter=${filter}&sitename=${sitename}`,
    })
      .then((res) => {
        let paging = {
          id: id,
          page: res.data.totalPages !== page ? page + 1 : null,
          size: size,
          sort: sort,
          direction: direction,
          filter: filter,
          sitename: sitename,
        };
        dispatch(scrollPostList(res.data.content));
        dispatch(pagingInfo(paging));
      })
      .catch((e) => {
        console.log('에러발생', e);
      });
  };
};

// 검색한 게시물 조회(스크롤 이벤트 발생 시, 무한스크롤)
const scrollSearchDB = () => {
  return function (dispatch, getState) {
    const _paging = getState().post.paging;
    const keyword = _paging.keyword;
    const page = _paging.page;
    const size = _paging.size;
    const sort = _paging.sort;
    const direction = _paging.direction;
    const filter = _paging.filter;
    const sitename = _paging.sitename;
    if (!page) {
      return;
    }
    dispatch(loading(true));
    axios({
      method: 'get',
      url: `${config.api}/api/search?keyword=${keyword}&page=${page}&size=${size}&sort=${sort}&direction=${direction}&filter=${filter}&sitename=${sitename}`,
    })
      .then((res) => {
        let paging = {
          keyword: keyword,
          page: res.data.totalPages !== page ? page + 1 : null,
          size: size,
          sort: sort,
          direction: direction,
          total: res.data.totalElements,
          filter: filter,
          sitename: sitename,
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
    [ONLINE_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.online_list = action.payload.post_list;
      }),
    [OFFLINE_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.offline_list = action.payload.post_list;
      }),
    [NEAR_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.near_list = action.payload.post_list;
      }),
    [CATEGORY_RECOMMEND_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.recommend_list = action.payload.post_list;
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
  getOnlineListDB,
  getOfflineListDB,
  getNearListDB,
  getCategoryRecommendDB,
};

export { actionCreators };
