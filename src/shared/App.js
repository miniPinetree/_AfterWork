import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configStore';
import {MyPage} from "../pages";

function App() {
  return (
    <>
      <ConnectedRouter history={history}>
        <Route path='/mypage' component={MyPage}/>
      </ConnectedRouter>
      good
    </>
  );
}

export default App;
