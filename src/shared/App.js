import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configStore';
<<<<<<< HEAD
import Test from '../pages/Test';
import {MyPage} from "../pages";
=======
>>>>>>> 43f2ff49d92b98bd03015ef0291f69388dd61b1a

function App() {
  return (
    <>
<<<<<<< HEAD
      <ConnectedRouter history={history}>
        <Route path='/test' component={Test} />
        <Route path='/mypage' component={MyPage}/>
      </ConnectedRouter>
=======
      <ConnectedRouter history={history}></ConnectedRouter>
>>>>>>> 43f2ff49d92b98bd03015ef0291f69388dd61b1a
      good
    </>
  );
}

export default App;
