import React from 'react';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configStore';
import Test from '../pages/Test';
import {MyPage} from "../pages";

function App() {
  return (
    <>
      <ConnectedRouter history={history}>
        <Route path='/test' component={Test} />
        <Route path='/mypage' component={MyPage}/>
      </ConnectedRouter>
      good
    </>
  );
}

export default App;
