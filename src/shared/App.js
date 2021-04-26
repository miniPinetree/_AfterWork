import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configStore';
import {MyPage, Main, UserDetail} from "../pages";
import {Header, Footer} from "../components";

function App() {
  return (
    <>
    <Header/>
      <ConnectedRouter history={history}>
        <Route path='/' exact component={Main} />
        <Route path='/mypage' exact component={MyPage} />
        <Route path='/userdetail' exact component={UserDetail} />
      </ConnectedRouter>
      <Footer/>
    </>
  );
}

export default App;
