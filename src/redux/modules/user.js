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
    user: null,
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
