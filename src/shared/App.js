import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configStore';
import Main from '../pages/Main';

function App() {
  return (
    <>
      <ConnectedRouter history={history}>
        <Route path='/' exact component={Main} />
      </ConnectedRouter>
    </>
  );
}

export default App;
