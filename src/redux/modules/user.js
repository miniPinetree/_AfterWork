import { createAction, handleActions } from "redux-actions";
import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";
import { produce } from "immer";
import axios from "axios";
import { config } from "../../config";

const GET_USER = "GET_USER";
const LOG_OUT = "LOG_OUT";

const getUser = createAction(GET_USER, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));

const initialState = {
  user: {
    email: "email@email.com",
    uid: "1234",
    nickname: "퇴그니",
    snsId: "snsId",
    address:"서울 강남구"
  },
  is_login: false,
};

const socialLoginDB = (id) => {
  return function (getState, dispatch, { history }) {
    axios({
      method: "post",
      url: `${config.api}/auth/me`,
      data: {
        id: id,
      },
    })
      .then((res) => {
        const jwtToken = res.data.token;
        setCookie("is_login", jwtToken);
        axios.defaults.headers.common["token"] = `${jwtToken}`;
        dispatch(
          getUser({
            email: res.data.user.email,
            uid: res.data.user.id,
            nickname: res.data.user.nickname,
            snsId: res.data.user.snsId,
            //와이어프레임에는 주소 명시되어 있는데 주소 정보도 오는 지 확인 부탁드려요
          })
        );
        history.replace("/");
      })
      .catch((err) => console.log(err, "에러에여"));
  };
};

export default handleActions(
  {
    [GET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie("is_login");
        draft.user = null;
        draft.is_login = false;
      }),
  },
  initialState
);

const actionCreators = {
  getUser,
  logOut,
  socialLoginDB,
};

export { actionCreators };
