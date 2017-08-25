import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
  return ({
  loggedIn: Boolean(state.session.currentUser)
});
};

class homePage extends React.Component {
  render() {
    if (this.props.loggedIn) {
      return (
        <div>HOMEPAGE</div>
      );
  }
    else
      return null;
  }
}

export default connect(mapStateToProps,null)(homePage);
