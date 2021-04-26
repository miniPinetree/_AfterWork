import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configStore';

function App() {
  return (
    <>
      <ConnectedRouter history={history}></ConnectedRouter>
      good
    </>
  );
}

export default App;
