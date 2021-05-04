import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as preferActions } from "../redux/modules/prefer";
import { getCookie } from "./Cookie";
import OAuth2RedirectHandler from "./OAuth2RedirectHandler";

import "./App.css";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configStore";
import { MyPage, Main, UserDetail, Category, Search, About, Login } from "../pages";
import { Header, Footer, FButton } from "../components";

function App() {
    const dispatch = useDispatch();
    const collection = useSelector((state) => state.prefer.collection);
    const user = useSelector((state) => state.user.user);
    useEffect(() => {
        const cookie = getCookie("is_login");

        if (cookie) {
            dispatch(userActions.getUserDB());
            dispatch(preferActions.getCollectionDB());
        }
        console.log(collection, user);
    }, [dispatch]);

    return (
        <>
            <Header />
            <ConnectedRouter history={history}>
                <Route path="/" exact component={Main} />
                <Route path="/login" exact component={Login} />
                <Route path="/about" exact component={About} />
                <Route path="/category/:id" exact component={Category} />
                <Route path="/mypage" exact component={MyPage} />
                <Route path="/userdetail" exact component={UserDetail} />
                <Route path="/find/:search" exact component={Search} />
                <Route path="/oauth2/redirect" component={OAuth2RedirectHandler} />
            </ConnectedRouter>
            <FButton />
            <Footer />
        </>
    );
}

export default App;
