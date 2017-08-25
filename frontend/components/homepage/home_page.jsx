import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {selectDreams} from '../../reducers/selectors';
import {fetchAllDream} from '../../actions/route_actions';

const mapStateToProps = (state) => {
  return ({
  dreams: selectDreams(state.dream.dream),
  loggedIn: Boolean(state.session.currentUser)
});
};

const mapDispatchToProps = (dispatch) => ({
  receiveAllDream: () => dispatch(fetchAllDream())
});

class homePage extends React.Component {
  componentDidMount() {
    this.props.receiveAllDream();
  }

  renderDreams() {
    return(
      <div>
      <ul className="dreams">
        {this.props.dreams.map((dream, idx) => (
          <li key={idx}>
            {dream}
          </li>
        ))}
      </ul>
      </div>
    );
  }

  render() {
    return (
      <ul>
        {this.renderDreams()}
      </ul>

    );
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(homePage);
