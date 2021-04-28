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
        email: "email@email.com",
        uid: "1234",
        nickname: "퇴그니",
        snsId: "snsId",
        address: "서울 강남구",
    },
    is_login: false,
};

const getUserDB = (id) => {
    return function (dispatch) {
        const jwtToken = getCookie("accessToken");
        axios({
            method: "get",
            url: `${config.api}/user/me`,
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
                        location: res.data.location,
                        name: res.data.name,
                    })
                );
            })
            .catch((err) => {
                console.log(err, "에러에여");
            });
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
    getUserDB,
    logOut,
};

export { actionCreators };
