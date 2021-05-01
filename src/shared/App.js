import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';
import { getCookie } from './Cookie';
import OAuth2RedirectHandler from './OAuth2RedirectHandler';

import './App.css';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configStore';
import { MyPage, Main, UserDetail, Category, Search, About } from '../pages';
import { Header, Footer, FButton } from '../components';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state)=>state.user.user);
  console.log('유저정보', user);
  
  useEffect(() => {
   
    console.log('getCookie');
    const cookie = getCookie('accessToken');

    if (cookie) {
      console.log('getUser');
      dispatch(userActions.getUserDB());
    }
  }, []);

  return (
    <>
      <Header />
      <ConnectedRouter history={history}>
        <Route path='/' exact component={Main} />
        <Route path='/about' exact component={About} />
        <Route path='/category/:id' exact component={Category} />
        <Route path='/mypage' exact component={MyPage} />
        <Route path='/userdetail' exact component={UserDetail} />
        <Route path='/find/:search' exact component={Search} />
        <Route
          path='/oauth2/redirect'
          component={OAuth2RedirectHandler}
        ></Route>
      </ConnectedRouter>
      <FButton />
      <Footer />
    </>
  );
}

export default App;
