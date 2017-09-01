import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {selectDreams, selectComments, selectFriends} from '../../reducers/selectors';
import {fetchAllDream, fetchDreams} from '../../actions/route_actions';
import {fetchAllFriends} from '../../actions/friend_actions';
import {postComment, fetchAllComments, removeComment}
  from '../../actions/comment_actions';
import {fetchUser} from '../../actions/user_actions';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import {withRouter} from 'react-router-dom';
import DreamItem from '../dreams/dream_item';

const mapStateToProps = (state) => {
  return ({
  friends: selectFriends(state.friend.friends),
  dreams: selectDreams(state.dream.dream),
  loggedIn: Boolean(state.session.currentUser),
  currentId: state.session.currentUser.username,
  currentUserId: state.session.currentUser.id,
  comments: state.comment.comment,
});
};

const mapDispatchToProps = (dispatch) => ({
  receiveAllFriends: () => dispatch(fetchAllFriends()),
  receiveAllDream: (id) => dispatch(fetchAllDream(id)),
  receiveDreams:(id) => dispatch(fetchDreams(id)),
  postComment: (comment) => dispatch(postComment(comment)),
  receiveAllComments: () => dispatch(fetchAllComments()),
  deleteComment: (id) => dispatch(removeComment(id))
});

class homePage extends React.Component {
  constructor(props) {
    super(props);
    this.renderDashboard = this.renderDashboard.bind(this);
  }

  componentDidMount() {
    this.props.receiveAllComments();
    if (this.props.match.params.id) {
      this.props.receiveAllDream(this.props.match.params.id);
    }
    else {
      this.props.receiveAllDream(this.props.currentId);
      const receiveDreamsCallback = this.props.receiveDreams;
      this.props.receiveAllFriends().then((friends) => {
        const result = selectFriends(friends.friends);
        result[0].friends.forEach((friend) => {
            receiveDreamsCallback(friend[1]);
          });
      });
      }
    }


  renderDreams() {
    const dreams = this.props.dreams.sort(function(a,b) { return (b[4] - a[4]);});
    return(
      <div>

      <ul className="dreams">
        {dreams.map((dream, idx) => (
          <DreamItem currentId={this.props.currentId}
            comments={this.props.comments}
            currentUserId={this.props.currentUserId}
            key={dream.id} dream={dream}
            postComment={this.props.postComment}
            deleteComment={this.props.deleteComment}
          />
        ))}
      </ul>
      </div>
    );
  }

  calculate(dreamdata) {
    let times = 0;
    let distance = 0;
    let durationTime = "";
    dreamdata.forEach((dream) => {
      const checkId = (this.props.match.params.id) ? this.props.match.params.id : this.props.currentId;
      if (dream[5] === checkId) {
        const now = new Date();
        const end = new Date(dream[2]);
        if ( (now - end)/1000/60/60/24 < 30 ) {
          const start = new Date(dream[1]);
          const poly = google.maps.geometry.encoding.decodePath(dream[3]);
          const length = google.maps.geometry.spherical.computeLength(poly);
          times += 1;
          distance += length;
          durationTime += ( end - start )/1000/60;
        }
      }
    });
    const data = {
      times: times,
      distance: (distance*0.000621).toFixed(2),
      durationTime: durationTime
    };
    return data;
    }

  renderDashboard() {
    const data = this.calculate(this.props.dreams);
    return (
      <div className='dashboard'>
        <span className='dashboardtitle'>Last Month</span>
        <div className='dashboardbody'>
          <div className='dashboarditem'>
            <h4>DISTANCE</h4>
            <p className='number'>{data.distance}</p>
            <p className='dis'>miles</p>
          </div>
          <div className='dashboarditem'>
            <h4>DURATION</h4>
            <p className='number'>{data.durationTime/60}</p>
            <p className='dis'>hours</p>
          </div>
          <div className='dashboarditem'>
            <h4>DREAM</h4>
            <p className='number'>{data.times}</p>
            <p className='dis'>completed</p>
          </div>
        </div>
      </div>
    );
  }



  render() {
    return (
      <div className='friendsmain'>
        <Tabs >
          <TabList>
            <Tab tabFor="one"className='tabs'>MY ACTIVITIES</Tab>
            <Tab tabFor="two"className='tabs'>MY DASHBOARD</Tab>
            <Tab tabFor="three"className='tabs'>7/24</Tab>
           </TabList>
           <TabPanel tabId="one" >
             {this.renderDreams()}
           </TabPanel>
           <TabPanel tabId="two" >
             {this.renderDashboard()}
           </TabPanel>

        </Tabs>
      </div>
    );
    }
  }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(homePage));
