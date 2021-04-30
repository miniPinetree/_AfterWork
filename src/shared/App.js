import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';
import { getCookie } from './Cookie';
import OAuth2RedirectHandler from './OAuth2RedirectHandler';
import './App.css';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configStore';
import { MyPage, Main, UserDetail, Category, Search } from '../pages';
import { Header, Footer } from '../components';

function App() {
  const dispatch = useDispatch();
  const cookie = getCookie('accessToken') ? true : false;
  useEffect(() => {
    if (cookie) {
      dispatch(userActions.getUserDB());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <ConnectedRouter history={history}>
        <Route path='/' exact component={Main} />
        <Route path='/category/:id' exact component={Category} />
        <Route path='/mypage' exact component={MyPage} />
        <Route path='/userdetail' exact component={UserDetail} />
        <Route path='/:search?' exact component={Search} />
        <Route
          path='/oauth2/redirect'
          component={OAuth2RedirectHandler}
        ></Route>
      </ConnectedRouter>
      <Footer />
    </>
  );
}

export default App;
