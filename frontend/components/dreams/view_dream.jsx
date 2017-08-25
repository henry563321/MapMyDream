import React from 'react';
import {fetchAllDream} from '../../actions/route_actions';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {selectDreams} from '../../reducers/selectors';

const mapStateToProps = (state) => {
  return ({
  dreams: selectDreams(state.dream.dream),
});
};

const mapDispatchToProps = (dispatch) => ({
  receiveAllDream: () => dispatch(fetchAllDream())
});


class dreamIndex extends React.Component {
  componentDidMount() {
    this.props.receiveAllDream();
  }

  renderDreams() {
    return(
      <ul className="dreams">
        {this.props.dreams.map((dream, idx) => (
          <li key={idx}>
            {dream}
          </li>
        ))}
      </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(dreamIndex);
