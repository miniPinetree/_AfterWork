import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configStore';
import { MyPage } from '../pages';
import Main from '../pages/Main';
import Category from '../pages/Category';

function App() {
  return (
    <>
      <ConnectedRouter history={history}>
        <Route path='/' exact component={Main} />
        <Route path='/category' exact component={Category} />
        <Route path='/mypage' component={MyPage} />
      </ConnectedRouter>
    </>
  );
}

export default App;
