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

  calculateDistance(dream) {
    const poly = google.maps.geometry.encoding.decodePath(dream[3]);
    const length = google.maps.geometry.spherical.computeLength(poly);
    return (
      <div>
        {length}
      </div>
    );
  }

  renderDreams() {
    return(
      <div>

      <ul className="dreams">
        {this.props.dreams.map((dream, idx) => (
          <li key={idx}>
            <img src={`https://maps.googleapis.com/maps/api/staticmap?size=100x100&path=weight:3%7Cenc:${dream[3]}&key=AIzaSyCcRlcfpJoSPP31a-a5UfOgNGzyEtcT09M`}></img>
            {this.calculateDistance(dream)}
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
