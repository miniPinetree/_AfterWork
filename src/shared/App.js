import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configStore';
import { MyPage, Main, UserDetail, Category, Search } from '../pages';
import { Header, Footer } from '../components';

function App() {
  return (
    <>
      <Header />
      <ConnectedRouter history={history}>
        <Route path='/' exact component={Main} />
        <Route path='/category' exact component={Category} />
        <Route path='/mypage' exact component={MyPage} />
        <Route path='/userdetail' exact component={UserDetail} />
        <Route path='/search/:keyword' exact component={Search} />
      </ConnectedRouter>
      <Footer />
    </>
  );
}

export default App;
