import { createAction, handleActions } from 'redux-actions';
import { actionCreators as preferActions } from './prefer';
import { deleteCookie } from '../../shared/Cookie';
import { produce } from 'immer';
import Swal from 'sweetalert2';
import axios from 'axios';

const GET_USER = 'GET_USER';
const LOG_OUT = 'LOG_OUT';
const DELETE_USER = 'DELETE_USER';
const USER_LOADING = 'USER_LOADING';
const TOGGLE = 'TOGGLE';

const getUser = createAction(GET_USER, (user) => ({ user }));
const logOut = createAction(LOG_OUT, () => ({}));
const deleteUser = createAction(DELETE_USER, (user) => ({ user }));
const userLoading = createAction(USER_LOADING, (user_loading) => ({
  user_loading,
}));
const toggle = createAction(TOGGLE, (toggle) => ({ toggle }));

const initialState = {
  user: null,
  is_login: false,
  user_loading: false,
  toggle: sessionStorage.getItem('toggle') ? true : false,
};

const getUserDB = () => {
  userLoading(true);
  return function (dispatch, { history }) {
    axios
      .get(`/api/user/me`)
      .then((res) => {
        dispatch(
          getUser({
            email: res.data.email,
            image: res.data.imageUrl,
            offTime: res.data.offTime,
            interests: res.data.interests,
            locations: res.data.locations,
            name: res.data.name,
            collects: res.data.collects,
          }),
        );
      })
      .catch((err) => {
        console.log(err, 'error');
        if (err.error) {
          Swal.fire({
            text: err.error,
            confirmButtonColor: '#7F58EC',
            confirmButtonText: '확인',
          });
        } else {
          Swal.fire({
            text: err,
            confirmButtonColor: '#7F58EC',
            confirmButtonText: '확인',
          });
        }

        return;
      });
  };
};

const logOutUserDB = () => {
  return function (dispatch, { history }) {
    dispatch(preferActions.deleteCollection());
    dispatch(logOut());
    deleteCookie('is_login');
    Swal.fire({
      text: '로그아웃 되었습니다.',
      confirmButtonColor: '#7F58EC',
      confirmButtonText: '확인',
    });
  };
};

const deleteUserDB = () => {
  return function (dispatch, { history }) {
    axios
      .delete(`/api/user`)
      .then((res) => {
        dispatch(deleteUser());
        dispatch(preferActions.deleteCollection());
      })
      .catch((error) => {
        console.log(error.response);
        dispatch.logOut();
        history.replace('/');
      });
  };
};

export default handleActions(
  {
    [GET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.is_login = true;
        draft.user_loading = false;
      }),
    [LOG_OUT]: (state) =>
      produce(state, (draft) => {
        draft.user = null;
        draft.is_login = false;
      }),
    [DELETE_USER]: (state) =>
      produce(state, (draft) => {
        deleteCookie('is_login');
        Swal.fire({
          text: '탈퇴 되었습니다.',
          confirmButtonColor: '#7F58EC',
          confirmButtonText: '확인',
        });
        draft.user = null;
        draft.is_login = false;
      }),
    [USER_LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.user_loading = action.payload.user_loading;
      }),
    [TOGGLE]: (state, action) =>
      produce(state, (draft) => {
        draft.toggle = action.payload.toggle;
      }),
  },
  initialState,
);

const actionCreators = {
  getUser,
  getUserDB,
  logOut,
  logOutUserDB,
  deleteUser,
  deleteUserDB,
  toggle,
};

export { actionCreators };
