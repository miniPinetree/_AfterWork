import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as preferActions } from "../redux/modules/prefer";
import { getCookie } from "./Cookie";
import OAuth2RedirectHandler from "./OAuth2RedirectHandler";

import "./App.css";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configStore";
import {
    MyPage,
    Main,
    UserDetail,
    Category,
    Search,
    About,
    Login,
    MobileSearch,
    Privacy,
} from "../pages";
import { Header, Footer } from "../components";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        const cookie = getCookie("is_login");

        if (cookie) {
            dispatch(userActions.getUserDB());
            dispatch(preferActions.getCollectionDB());
        }
    }, [dispatch]);
    return (
        <>
            <ConnectedRouter history={history}>
                <Header />
                <Route path="/" exact component={Main} />
                <Route path="/login" exact component={Login} />
                <Route path="/about" exact component={About} />
                <Route path="/privacy" exact component={Privacy} />
                <Route path="/category/:id" exact component={Category} />
                <Route path="/mypage" exact component={MyPage} />
                <Route path="/userdetail" exact component={UserDetail} />
                <Route path="/find/:search" exact component={Search} />
                <Route path="/search" exact component={MobileSearch} />
                <Route path="/oauth2/redirect" component={OAuth2RedirectHandler} />
            </ConnectedRouter>
            <Footer />
        </>
    );
}
export default App;
