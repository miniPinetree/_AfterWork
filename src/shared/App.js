import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configStore';
<<<<<<< HEAD
import {MyPage} from "../pages";
import {Header, Footer} from "../components";
=======
import { MyPage } from '../pages';
import Main from '../pages/Main';
>>>>>>> edcc10bbfbad27de33e71b4a081e95c65621c4c6

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
