import React from 'react';
import {login} from '../../actions/session_actions';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

const mapStateToProps = (state) => {
  return ({
  loggedIn: Boolean(state.session.currentUser),
});
};

const mapDispatchToProps = (dispatch) => ({
  login: user => dispatch(login(user))
});


class frontPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.login({username: "guest", password: "123456"});
  }

  render() {
    if(this.props.loggedIn)
      return null;
    else {
      return(
        <section className="bodypart">
          <button className='guestlink'
            onClick={this.handleClick}>Log In As A Guest</button>
        </section>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(frontPage);
