import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {selectDreams, selectComments} from '../../reducers/selectors';
import {fetchAllDream} from '../../actions/route_actions';
import {postComment, fetchAllComments} from '../../actions/comment_actions';
import {fetchUser} from '../../actions/user_actions';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import {withRouter} from 'react-router-dom';

const mapStateToProps = (state) => {
  return ({
  dreams: selectDreams(state.dream.dream),
  loggedIn: Boolean(state.session.currentUser),
  currentId: state.session.currentUser.username,
  currentUserId: state.session.currentUser.id,
  comments: state.comment.comment,
});
};

const mapDispatchToProps = (dispatch) => ({
  receiveAllDream: (id) => dispatch(fetchAllDream(id)),
  postComment: (comment) => dispatch(postComment(comment)),
  receiveAllComments: () => dispatch(fetchAllComments())
});

class homePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ""
    };
  }

  componentDidMount() {
    this.props.receiveAllComments();
    if (this.props.match.params.id) {
      this.props.receiveAllDream(this.props.match.params.id);
    }
    else {
      this.props.receiveAllDream(this.props.currentId);
    }
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

  update(property) {
    return e => this.setState({
      [property]: e.currentTarget.value
    });
  }

  handleSubmit(dream) {
    const commenterId = this.props.currentUserId;
    const comment = {
      body: this.state.comment,
      commenter_id: commenterId,
      route_id: dream[4]
    };
    this.props.postComment(comment);
  }

  renderDreams() {
    return(
      <div>

      <ul className="dreams">
        {this.props.dreams.map((dream, idx) => (
          <li className='dreamItem' key={idx}>
            <a className='usericon'/>
            <div className = 'dreamdetail'>
              <h3 className="dreamtitle">{this.props.currentId} create the dream!</h3>
              <div className= 'dreamdeepdetail'>
              <img className='staticimg' src={`https://maps.googleapis.com/maps/api/staticmap?size=300x300&path=weight:3%7Cenc:${dream[3]}&key=AIzaSyCcRlcfpJoSPP31a-a5UfOgNGzyEtcT09M`}></img>
              <div className= 'distancedetail'>
                <a className='distanceIcon'/>
                <div className='displaydistance'>
                {this.calculateDistance(dream)}
                <span className='unit'>mi</span>
                </div>
              </div>
              </div>
                <ul>
                  {selectComments(this.props.comments, dream[4]).map((comment) => (
                    <div className='commentbox'>
                    <a className='usericon'/>
                    <Link to={`/users/${comment[3]}`}>{comment[3]}</Link>
                    <li>{comment[1]}</li>
                    </div>
                  ))}
                </ul>
                <form className='commentform' onSubmit={this.handleSubmit.bind(this, dream)}>
                  <a className='usericon'/>
                  <input type='text'
                    value={this.state.comment}
                    onChange={this.update('comment')}
                    placeholder='write a comment...'
                    />
                  <button>POST</button>
              </form>

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(homePage));
