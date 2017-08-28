import React from 'react';
import {connect} from 'react-redux';
import {fetchAllFriends, deleteFriend} from '../../actions/friend_actions';
import {selectFriends} from '../../reducers/selectors';

const mapStateToProps = (state) => {
  return ({
    friends : selectFriends(state.friend.friends)
});
};


const mapDispatchToProps = (dispatch) => ({
  unFriend:(id) => dispatch(deleteFriend(id)),
  receiveAllFriends: () => dispatch(fetchAllFriends())
});

class friendIndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.renderfriends = this.renderfriends.bind(this);
    this.rendersearch = this.rendersearch.bind(this);
  }

  componentDidMount() {
    debugger;
    this.props.receiveAllFriends();
  }


  handleUnfriend(friend) {
    this.props.unFriend(friend[0]).then(() => this.props.receiveAllFriends());
  }

  renderfriends() {
    if (this.props.friends.length !== 0) {
    return (
      <div>
      <ul className="friends">
        {this.props.friends[0].friends.map((friend, idx) => (
          <li key={idx}>
            {friend}
            <button onClick={this.handleUnfriend.bind(this, friend)}>unFriend</button>
          </li>
        ))}
      </ul>
      <ul className="applier">
        {this.props.friends[1].applier.map((friend, idx) => (
          <li key={idx}>
            {friend}
            <button onClick={this.handleAccept.bind(this, friend)}>Accept</button>
            <button onClick={this.handleDenied.bind(this, friend)}>Deny</button>
          </li>
        ))}
      </ul>
    </div>
    );
  } else {
    return null;
  }

  }

  rendersearch() {
    if (this.props.friends.length !== 0) {
    return (
      <ul className="pendingFreinds">
        {this.props.friends[2].pendingFreinds.map((friend, idx) => (
          <li key={idx}>
            {friend}
          </li>
        ))}
      </ul>

    );
  } else {
    return null;
  }
  }


  render() {
    return (
        <div>
          {this.renderfriends()}
          {this.rendersearch()}
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(friendIndexPage);
