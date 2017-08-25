import React from 'react';
import NavContainer from './navbar/nav';
import SessionFormContainer from './session/session_form';
import {Route} from 'react-router-dom';
import {AuthRoute} from '../util/route_util';
import FrontPageContainer from './frontpage/front_page';
import MapContainer from './map/map_body';
import HomePageContainer from './homepage/home_page';
import {BackRoute} from '../util/back_util';
import DreamViewContainer from './dreams/view_dream';

const App = () => (
  <div className='body'>
    <header>
      <NavContainer />
    </header>
    <Route exact path='/' component={FrontPageContainer}/>
    <Route exact path='/' component={HomePageContainer}/>
    <Route exact path='/dream/views' component={DreamViewContainer}/>
    <BackRoute path='/dream/create' component={MapContainer}/>
    <AuthRoute path='/login' component={SessionFormContainer}/>
    <AuthRoute path='/signup' component={SessionFormContainer}/>
    <footer></footer>
  </div>
);

export default App;
