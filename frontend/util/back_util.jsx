import { withRouter, Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import React from 'react';

const Auth = ({component: Component, path, loggedIn}) => (
  <Route path={path} render={(props) => (
    !loggedIn ? (
      <Redirect to="/login" />
    ) : (
      <Component {...props} />
    )
  )}/>
);

const mapStateToProps = state => {
  return {loggedIn: Boolean(state.session.currentUser)};
};

export const BackRoute = withRouter(connect(mapStateToProps, null)(Auth));
