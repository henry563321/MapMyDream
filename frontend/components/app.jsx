import React from 'react';
import NavContainer from './navbar/nav';
import SessionFormContainer from './session/session_form';
import {Route} from 'react-router-dom';
import {AuthRoute} from '../util/route_util';
import FrontPageContainer from './frontpage/front_page';
import MapContainer from './map/map_body';
import HomePageContainer from './homepage/home_page';
import {BackRoute} from '../util/back_util';
import FriendsContainer from './friend/friends_index_page';

const App = () => (
  <div className='body'>
    <header>
      <NavContainer />
    </header>
    <Route exact path='/' component={FrontPageContainer}/>
    <Route exact path='/home' component={HomePageContainer}/>
    <BackRoute path='/dream/create' component={MapContainer}/>
    <BackRoute path='/home/friends' component={FriendsContainer}/>
    <AuthRoute path='/login' component={SessionFormContainer}/>
    <AuthRoute path='/signup' component={SessionFormContainer}/>
    <footer></footer>
  </div>
);

export default App;
