import React from 'react';
import {connect} from 'react-redux';
import {NavLink, Route, withRouter, Link } from 'react-router-dom';
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
    this.homelink = this.homelink.bind(this);
  }

  handleClick() {
    this.props.logout().then(() => this.props.history.push('/'));
  }

  homelink() {
    if (this.props.currentUser) {
      return(
        <Link to='/home'className="headword">MapMyDream</Link>
      );
    } else {
      return (
        <Link to='/'className="headword">MapMyDream</Link>
      );
    }
  }

  navLinks() {
    return(
      <div className='navlinks'>
        {this.homelink()}
        <Link className='createroutelink' to="/dream/create" >CreateDream</Link>
      </div>
    );
  }

  signlink() {
    if (this.props.location.pathname === "/") {
      return(
        <div className='navlink'>
          <NavLink to='/login'  className='logintop'
              >LOG IN</NavLink>
          <NavLink to='/signup' className='signuptop'
            >SIGN UP</NavLink>
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    if (!this.props.currentUser) {
      return (
        <div className="navbar">
          {this.navLinks()}
          {this.signlink()}
        </div>
      );
    } else {
      return(
        <div className="navbar">
          {this.navLinks()}
          <div className="dropdown">
            <div id="myDropdown" className="dropdown-content">
              <Link to='/home/friends'>Friends</Link>
              <a onClick={this.handleClick}>Logout</a>
            </div>
          </div>
        </div>

      );
    }
  }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavList));
