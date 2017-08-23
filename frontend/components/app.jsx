import React from 'react';
import NavContainer from './navbar/nav';
import SessionFormContainer from './session/session_form';
import {Route} from 'react-router-dom';
import {AuthRoute} from '../util/route_util';
import FrontPageContainer from './frontpage/front_page';

const App = () => (
  <div className='body'>
    <header>
      <NavContainer />
    </header>
    <Route exact path='/' component={FrontPageContainer}/>
    <AuthRoute path='/login' component={SessionFormContainer}/>
    <AuthRoute path='/signup' component={SessionFormContainer}/>
    <footer></footer>
  </div>
);

export default App;
