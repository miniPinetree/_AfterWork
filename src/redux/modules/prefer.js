import { createAction, handleActions } from "redux-actions";
import { actionCreators as userActions } from "./user";
import { config } from "../../config";
import Swal from "sweetalert2";
import produce from "immer";
import axios from "axios";
//actions
const GET_COLLECTION = "GET_COLLECTION";
const DELETE_COLLECTION = "DELETE_COLLECTION";
const GUIDE_GUESTS = "GUIDE_GUESTS";
//action Creators

const getCollection = createAction(GET_COLLECTION, (collection) => ({
    collection,
}));
const deleteCollection = createAction(DELETE_COLLECTION, (collection = []) => ({
    collection,
}));
const guideGuests = createAction(GUIDE_GUESTS, (is_opened) => ({ is_opened }));

//initialState
const initialState = {
    collection: [],
    is_opened: false,
};
//회원 관심사 수정
const updateUserPreferDB = (locations, categories, time) => {
    return function (dispatch, getState, { history }) {
        const user = getState().user.user;
        const data = {
            offTime: time,
            locations: locations,
            categorys: categories,
        };

        axios
            //test
            // .post(`${config.api}/api/user`, data, {headers})
            .post(`${config.api}/api/user`, data)
            .then((res) => {
                //res.data 없음.
                let _locations = locations.map((location) => {
                    return { name: location };
                });
                let _categories = categories.map((category) => {
                    return { categoryId: category };
                });
                let _data = {
                    offTime: time,
                    locations: _locations,
                    interests: _categories,
                };
                dispatch(userActions.getUser({ ...user, ..._data }));
                Swal.fire({
                    html: "저장이 완료되었습니다. <br/> <b>메인으로 이동하시겠습니까?<b/>",
                    confirmButtonColor: "#7F58EC",
                    confirmButtonText: "예",
                    showCancelButton: true,
                    cancelButtonText: "아니오",
                }).then((result) => {
                    if (result.isConfirmed) {
                        history.push("/");
                    }
                });
            })
            .catch((e) => {
                console.log("회원정보 저장 실패", e);
            });
    };
};
//찜 목록 불러오기
const getCollectionDB = () => {
    return function (dispatch, getState, { history }) {
        axios
            .get(`${config.api}/api/collects`)
            .then((res) => {
                dispatch(getCollection(res.data));
            })
            .catch((e) => {
                console.log("찜 목록 불러오기 실패", e);
            });
    };
};

//찜 등록 및 개별 삭제
const toggleLikeDB = (prd_id) => {
    return function (dispatch, getState, { history }) {
        const user = getState().user.user;
        if (!user) {
            if (window.innerWidth > 414) {
                dispatch(guideGuests(true));
            } else {
                history.push("/login");
            }
            return;
        }
        //delete API 요청에 필요한 collectId가 담긴 배열
        const collects = user?.collects;
        let flag = false;
        // 유저 정보 로드 확인
        if (user && collects) {
            //찜 목록에 존재(true)하면 삭제, 그렇지 않으면 추가
            if (collects?.length !== 0) {
                for (let i = 0; i < collects.length; i++) {
                    if (collects[i].productId === prd_id) {
                        // 찜 목록에 존재(true)
                        flag = true;
                        axios
                            .delete(`${config.api}/api/collects/${collects[i].collectId}`)
                            .then((res) => {
                                let _data = collects.filter((val) => {
                                    return val.productId !== prd_id;
                                });
                                let data = {
                                    collects: _data,
                                };
                                dispatch(userActions.getUser({ ...user, ...data }));
                                dispatch(getCollectionDB());
                            })
                            .catch((e) => {
                                console.log("찜 개별삭제 실패", e);
                            });
                    }
                }
            }
            // 찜 목록에 존재하지 않음.
            if (flag === false) {
                if (collects.length >= 50) {
                    Swal.fire({
                        html: "찜은 50개까지 등록 가능합니다. <br/> 기존 클래스 삭제 후 등록해주세요.",
                        confirmButtonColor: "#7F58EC",
                        confirmButtonText: "확인",
                    });
                } else {
                    let data = {
                        productId: prd_id,
                    };
                    axios
                        .post(`${config.api}/api/collects`, data)
                        .then((res) => {
                            let data = {
                                collects: [...collects, res.data],
                            };
                            dispatch(userActions.getUser({ ...user, ...data }));
                            dispatch(getCollectionDB());
                        })
                        .catch((e) => {
                            console.log("찜 등록 실패", e);
                        });
                }
            }
        }
    };
};

//찜 목록 전체삭제
const deleteCollectionDB = () => {
    return function (dispatch, getState, { history }) {
        let collection = getState().user.user.collects;
        if (collection.length === 0) {
            Swal.fire({
                text: "삭제할 정보가 없습니다.",
                confirmButtonColor: "#7F58EC",
                confirmButtonText: "확인",
            });
        } else {
            Swal.fire({
                text: "전부 삭제하시겠어요? 😲",
                showCancelButton: true,
                confirmButtonColor: "#7F58EC",
                confirmButtonText: "삭제",
                cancelButtonText: "취소",
            }).then((result) => {
                if (result.isConfirmed) {
                    axios
                        .delete(`${config.api}/api/collects`)
                        .then((res) => {
                            // 데이터없음
                        })
                        .catch((e) => {
                            console.log("찜 목록 전체삭제 실패", e);
                        });
                    dispatch(deleteCollection());
                }
            });
        }
    };
};

//reducer
export default handleActions(
    {
        [GET_COLLECTION]: (state, action) =>
            produce(state, (draft) => {
                draft.collection = action.payload.collection;
            }),
        [DELETE_COLLECTION]: (state, action) =>
            produce(state, (draft) => {
                draft.collection = action.payload.collection;
            }),
        [GUIDE_GUESTS]: (state, action) =>
            produce(state, (draft) => {
                draft.is_opened = action.payload.is_opened;
            }),
    },
    initialState
);

const actionCreators = {
    updateUserPreferDB,
    getCollectionDB,
    toggleLikeDB,
    deleteCollectionDB,
    guideGuests,
    deleteCollection,
};

export { actionCreators };
