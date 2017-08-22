import React from 'react';
import NavContainer from './navbar/nav';
import SessionFormContainer from './session/session_form';
import {Route} from 'react-router-dom';

const App = () => (
  <div>
    <header>
      <h2>MapMyDream</h2>
      <NavContainer />
    </header>
    <Route path='/login' component={SessionFormContainer}/>
    <Route path='/signup' component={SessionFormContainer}/>
  </div>
);

export default App;
