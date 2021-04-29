import { createAction, handleActions } from "redux-actions";
import { getCookie, deleteCookie } from "../../shared/Cookie";
import { produce } from "immer";
import axios from "axios";
import { config } from "../../config";

const GET_USER = "GET_USER";
const LOG_OUT = "LOG_OUT";

const getUser = createAction(GET_USER, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));

const initialState = {
    user: {
        //테스트용 임시 데이터
        email: "email@email.com",
        uid: "1234",
        nickname: "퇴그니",
    },
    is_login: false,
};

const getUserDB = (id) => {
    return function (dispatch) {
        const jwtToken = getCookie("accessToken");
        axios({
            method: "get",
            url: `${config.api}/api/user/me`,
            headers: {
                authorization: `Bearer ${jwtToken}`,
                "Content-type": "application/json",
            },
            data: {
                id: id,
            },
        })
            .then((res) => {
                console.log(res);
                dispatch(
                    getUser({
                        email: res.data.email,
                        image: res.data.imageUrl,
                        interests: res.data.interests,
                        locations: res.data.locations,
                        name: res.data.name,
                        collects: res.data.collects,
                    })
                );
            })
            .catch((err) => {
                console.log(err, "에러에여");
            });
    };
};

const logOutDB = () => {
    return function (dispatch, getState, { history }) {
        deleteCookie("accessToken");
        dispatch(logOut());
        window.alert("로그아웃 되었습니다.");
        window.location.replace("/");
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
                draft.user = null;
                draft.is_login = false;
            }),
    },
    initialState
);

const actionCreators = {
    getUser,
    getUserDB,
    logOut,
    logOutDB,
};

export { actionCreators };
