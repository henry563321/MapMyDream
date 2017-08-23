import React from 'react';
import NavContainer from './navbar/nav';
import SessionFormContainer from './session/session_form';
import {Route} from 'react-router-dom';
import {AuthRoute} from '../util/route_util';

const App = () => (
  <div>
    <header>
      <h2>Map My Dream</h2>
      <NavContainer />
    </header>
    <AuthRoute path='/login' component={SessionFormContainer}/>
    <AuthRoute path='/signup' component={SessionFormContainer}/>
  </div>
);

export default App;
