import { createAction, handleActions } from "redux-actions";
import { getCookie, deleteCookie } from "../../shared/Cookie";
import { produce } from "immer";
import Swal from "sweetalert2";
import axios from "axios";
import { config } from "../../config";

const GET_USER = "GET_USER";
const LOG_OUT = "LOG_OUT";
const DELETE_USER = "DELETE_USER";

const getUser = createAction(GET_USER, (user) => ({ user }));
const logOut = createAction(LOG_OUT, () => ({}));
const deleteUser = createAction(DELETE_USER, (user) => ({ user }));

const initialState = {
    user: null,
    is_login: false,
};

const getUserDB = () => {
    return function (dispatch) {
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
                    })
                );
            })
            .catch((err) => {
                console.log(err, "error");
            });
    };
};

const deleteUserDB = () => {
    return function (dispatch) {
        axios
            .delete(`/api/user`)
            .then((res) => {
                dispatch(deleteUser());
            })
            .catch((error) => {
                console.log(error.response);
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
        [DELETE_USER]: (state, action) =>
            produce(state, (draft) => {
                deleteCookie("is_login");
                Swal.fire({
                    text: "탈퇴 되었습니다.",
                    confirmButtonColor: "#7F58EC",
                    confirmButtonText: "확인",
                });
                draft.user = null;
                draft.is_login = true;
            }),
    },
    initialState
);

const actionCreators = {
    getUser,
    getUserDB,
    logOut,
    deleteUser,
    deleteUserDB,
};

export { actionCreators };
