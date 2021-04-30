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
    user: {
        //테스트용 임시 데이터 삭제예정
        email: "email@email.com",
        name: "퇴그니",
        image:
            "https://www.1xbetkrs.com/wp-content/uploads/2020/02/%ED%8E%AD%EC%88%98%EC%A7%A46-e1582012424773.jpg",
        offTime: "18:30:00",
        interests: [
            {
                "interestId": 1,
                "categoryId": 4,
                "userId": 1 //불필요 하다 생각
            },
            {
                interestId: 2,
                categoryId: 2,
                userId: 1, //불필요 하다 생각
            },
        ],
        collects: [
            {
                collectId: 1,
                productId: 433,
                userId: 1, //불필요 하다 생각
            },
            {
                collectId: 2,
                productId: 5,
                userId: 1, //불필요 하다 생각
            },
        ],
        locations: [
            {
                locationId: 1,
                name: "강남",
                userId: 1, //불필요 하다 생각
            },
            {
                locationId: 2,
                name: "서울",
                userId: 1, //불필요 하다 생각
            },
        ],
    },
    is_login: false,
};

const getUserDB = () => {
    return function (dispatch) {
        const jwtToken = getCookie("accessToken");
        axios.defaults.headers.common["authorization"] = `Bearer ${jwtToken}`;
        axios({
            method: "get",
            url: `${config.api}/api/user/me`,
            // headers: {
            //     authorization: `Bearer ${jwtToken}`,
            //     "Content-type": "application/json",
            // },
            
        })
            .then((res) => {
                console.log(res.data);
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
                console.log(err, "에러에여");
            });
    };
};

const logOutDB = () => {
    return function (dispatch, getState, { history }) {
        dispatch(logOut());
        deleteCookie("accessToken");
        Swal.fire({
            text: "로그아웃 되었습니다.",
            confirmButtonColor: "#7F58EC",
            confirmButtonText: "확인",
          });
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
