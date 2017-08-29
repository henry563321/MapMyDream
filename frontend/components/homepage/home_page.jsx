import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {selectDreams} from '../../reducers/selectors';
import {fetchAllDream} from '../../actions/route_actions';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';

const mapStateToProps = (state) => {
  return ({
  dreams: selectDreams(state.dream.dream),
  loggedIn: Boolean(state.session.currentUser),
  username: state.session.currentUser.username
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
    const length = (google.maps.geometry.spherical.computeLength(poly)*0.000621).toFixed(2);
    return (
      <h3>
        {length}
      </h3>
    );
  }

  renderDreams() {
    return(
      <div>

      <ul className="dreams">
        {this.props.dreams.map((dream, idx) => (
          <li className='dreamItem' key={idx}>
            <a className='usericon'/>
            <div className = 'dreamdetail'>
              <h3 className="dreamtitle">{this.props.username} create the dream!</h3>
              <div className= 'dreamdeepdetail'>
              <img className='staticimg' src={`https://maps.googleapis.com/maps/api/staticmap?size=200x200&path=weight:3%7Cenc:${dream[3]}&key=AIzaSyCcRlcfpJoSPP31a-a5UfOgNGzyEtcT09M`}></img>
              <div className= 'distancedetail'>
                <a className='distanceIcon'/>
                <div className='displaydistance'>
                {this.calculateDistance(dream)}
                <span className='unit'>mi</span>
                </div>
              </div>
              </div>
              <span>create the comment</span>
            </div>
          </li>
        ))}
      </ul>
      </div>
    );
  }

  render() {
    return (
      <div className='friendsmain'>
        <Tabs >
          <TabList>
            <Tab tabFor="one"className='tabs'>MY ACTICITIES</Tab>
            <Tab tabFor="two"className='tabs'>MY DASHBOARD</Tab>
            <Tab tabFor="two"className='tabs'>7/24</Tab>
           </TabList>
           <TabPanel tabId="one" >
             {this.renderDreams()}
           </TabPanel>
        </Tabs>
      </div>
    );
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(homePage);
