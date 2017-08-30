import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {selectDreams, selectComments} from '../../reducers/selectors';
import {fetchAllDream} from '../../actions/route_actions';
import {postComment, fetchAllComments, removeComment}
  from '../../actions/comment_actions';
import {fetchUser} from '../../actions/user_actions';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import {withRouter} from 'react-router-dom';
import DreamItem from '../dreams/dream_item';

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
  receiveAllComments: () => dispatch(fetchAllComments()),
  deleteComment: (id) => dispatch(removeComment(id))
});

class homePage extends React.Component {
  constructor(props) {
    super(props);
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

  renderDreams() {
    return(
      <div>

      <ul className="dreams">
        {this.props.dreams.map((dream, idx) => (
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
