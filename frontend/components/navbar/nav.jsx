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
  }

  handleClick() {
    this.props.logout();
  }

  navLinks() {
    return(
      <div className='navlinks'>
      <Link to='/'className="headword">Map My Dream</Link>
      <Link className='logintop' to="/dream/create" >CreateDream</Link>
      <Link className='logintop' to="/dream/views" >VeiwDreams</Link>
      </div>
    );
  }

  render() {
    if (!this.props.currentUser) {
      return (
        <div className="navbar">
          {this.navLinks()}
          <div className='navlink'>
          <NavLink to='/signup' className='logintop'
            activeClassName="active-nav-link">SignUp</NavLink>
          <NavLink to='/login'  className='logintop'
            activeClassName="active-nav-link">LogIn</NavLink>
        </div>
        </div>
      );
    } else {
      return(
        <div className="navbar">
          {this.navLinks()}
          <div className='navlink'>
            <span className="headword">WelCome,{this.props.currentUser.username}</span>
            <button className='logintop' onClick={this.handleClick}>LogOut</button>
        </div>
        </div>

      );
    }
  }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavList));
