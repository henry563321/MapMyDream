import React from 'react';
import {connect} from 'react-redux';
import {NavLink, Route} from 'react-router-dom';
import {logout} from '../../actions/session_actions';

const mapStateToProps = ({session}) => ({
  currentUser: session.currentUser
});

const mapDispatchToProps = (dispatch) => ({
  logout: user => dispatch(logout(user))
});

class NavList extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.logout();
  }

  render() {
    if (!this.props.currentUser) {
      return (
        <div>
          <NavLink to='/signup'
            activeClassName="active-nav-link">SignUp</NavLink>
          <NavLink to='/login'
            activeClassName="active-nav-link">LogIn</NavLink>
        </div>
      );
    } else {
      return(
        <div>
          <span>WelCome,{this.props.currentUser.username}</span>
          <button onClick={this.handleClick}>LogOut</button>
        </div>
      );
    }
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(NavList);
