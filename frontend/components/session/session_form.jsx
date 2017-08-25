import React from 'react';
import {connect} from 'react-redux';
import {Link, Route} from 'react-router-dom';
import {login, signup, clearErrors} from '../../actions/session_actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state) => {
  return ({
  loggedIn: Boolean(state.session.currentUser),
  errors: state.session.errors
});
};

const mapDispatchToProps = (dispatch, { location }) => {
  const formType = location.pathname.slice(1);
  const processForm = (formType === 'login')? login : signup;
  return {
    formType,
    processForm: user => dispatch(processForm(user)),
    clearErrors: () => dispatch(clearErrors())
  };
};

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn) {
      this.props.history.push('/home');
    }

  }

  componentDidMount() {
    this.props.clearErrors();
  }


  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user);

  }

  update(property) {
    return e => this.setState({
      [property]: e.currentTarget.value
    });
  }

  renderErrors() {
  return(
    <ul className="errors">
      {this.props.errors.map((error, idx) => (
        <li key={idx}>
          {error}
        </li>
      ))}
    </ul>
  );
}


  renderNavLink() {
    if (this.props.formType === 'login') {
      return (<Link className="swichlog" to='/signup'>sign up</Link>);
    }
    else
      return (<Link className="swichlog" to='/login'>log in</Link>);
  }

  renderEmail() {
    if (this.props.formType === 'signup') {
      return(
          <input type='text' className='signinput'
            value={this.state.email}
            onChange={this.update('email')}
            placeholder='Email'
            />
      );} else
      return null;
  }

  render() {
    const button = (this.props.formType === 'signup') ? "Sign Up" : "Log In";
    return(
      <div className='signindiv'>

        <form className="signupform" onSubmit={this.handleSubmit}>
          {this.renderNavLink()}
          {this.renderErrors()}
            <input type='text' className='signinput'
              value={this.state.username}
              onChange={this.update('username')}
              placeholder='Username'
              size="20"
              />
            <input type='password' className='signinput'
              value={this.state.pasword}
              onChange={this.update('password')}
              placeholder='password'
              />
          {this.renderEmail()}
          <input type="submit" className="subbut" value={button} />
        </form>
      </div>
    );
  }
}

export default
  withRouter(connect(mapStateToProps, mapDispatchToProps)(SessionForm));
