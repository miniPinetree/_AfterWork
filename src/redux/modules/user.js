import { createAction, handleActions } from "redux-actions";
import { getCookie, deleteCookie } from "../../shared/Cookie";
import { produce } from "immer";
import Swal from "sweetalert2";
import axios from "axios";
import { config } from "../../config";

const GET_USER = "GET_USER";
const LOG_OUT = "LOG_OUT";

const getUser = createAction(GET_USER, (user) => ({ user }));
const logOut = createAction(LOG_OUT, () => ({}));

const initialState = {
    user: null,
    is_login: false,
};

const getUserDB = () => {
    return function (dispatch) {
        const jwtToken = getCookie("is_login");
        axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
        axios({
            method: "get",
            url: `${config.api}/api/user/me`,
        })
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
                    })
                );
            })
            .catch((err) => {
                console.log(err, "error");
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
                Swal.fire({
                    text: "로그아웃 되었습니다.",
                    confirmButtonColor: "#7F58EC",
                    confirmButtonText: "확인",
                });
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
