import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configStore';
import {MyPage, Main} from "../pages";
import {Header, Footer} from "../components";

function App() {
  return (
    <>
    <Header/>
      <ConnectedRouter history={history}>
        <Route path='/' exact component={Main} />
        <Route path='/mypage' component={MyPage} />
      </ConnectedRouter>
      <Footer/>
    </>
  );
}

export default App;
