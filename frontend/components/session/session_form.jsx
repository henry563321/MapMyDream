import React from 'react';
import {connect} from 'react-redux';
import {Link, Route} from 'react-router-dom';
import {login, signup} from '../../actions/session_actions';
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
    processForm: user => dispatch(processForm(user))
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
    this.renderErrors = this.renderErrors.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn) {
      this.props.history.push('/');
    }
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
    <ul>
      {this.props.errors.map((error, i) => (
        <li key={`error-${i}`}>
          {error}
        </li>
      ))}
    </ul>
  );
}


  renderNavLink() {
    if (this.props.formType === 'login') {
      return (<Link to='./signup'>sign up instead</Link>);
    }
    else
      return (<Link to='./login'>log in instead</Link>);
  }

  renderEmail() {
    if (this.props.formType === 'signup') {
      return(
        <label>Email:
          <input type='text'
            value={this.state.email}
            onChange={this.update('email')}
            />
        </label>
      );} else
      return null;
  }

  render() {
    return(
      <div>

        <form onSubmit={this.handleSubmit}>
          {this.renderNavLink()}
          {this.renderErrors()}
          <label>Username:
            <input type='text'
              value={this.state.username}
              onChange={this.update('username')}
              />
          </label>
          <br/>
          <label>Password:
            <input type='password'
              value={this.state.pasword}
              onChange={this.update('password')}
              />
          </label>
          <br/>
          {this.renderEmail()}
          <br/>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default
  withRouter(connect(mapStateToProps, mapDispatchToProps)(SessionForm));
