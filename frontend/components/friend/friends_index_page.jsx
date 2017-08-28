import React from 'react';
import {connect} from 'react-redux';
import {fetchAllFriends, deleteFriend, updateFriend, searchFriend}
  from '../../actions/friend_actions';
import {selectFriends, selectUsers} from '../../reducers/selectors';

const mapStateToProps = (state) => {
  debugger;
  return ({
    friends : selectFriends(state.friend.friends),
    users : selectUsers(state.user.user)
});
};


const mapDispatchToProps = (dispatch) => ({
  updateFriend:(friend) => dispatch(updateFriend(friend)),
  unFriend:(id) => dispatch(deleteFriend(id)),
  receiveAllFriends: () => dispatch(fetchAllFriends()),
  searchFriend: (keyword) => dispatch(searchFriend(keyword))
});

class friendIndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    };
    this.renderfriends = this.renderfriends.bind(this);
    this.rendersearch = this.rendersearch.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.props.receiveAllFriends();
  }


  handleUnfriend(friend) {
    this.props.unFriend(friend[0]).then(() => this.props.receiveAllFriends());
  }

  handleAccept(friend) {
    friend[2] = 'APPROVED';
    this.props.updateFriend(friend);
  }

  handleDenied(friend) {
    friend[2] = 'DENIED';
    this.props.updateFriend(friend);
  }

  handleSearch(e) {
    e.preventDefault();
    const keyword = Object.assign({}, this.state);
    this.props.searchFriend(keyword);

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

  update(property) {
    return e => this.setState({
      [property]: e.currentTarget.value
    });
  }

  rendersearch() {
    if (this.props.friends.length !== 0) {
    return (
      <div>
        <form onSubmit={this.handleSearch}>
          <input type='text' placeholder='Input a Username and Press Search'
            value={this.state.username}
            onChange={this.update('username')}
            />
          <button >Search</button>
        </form>
        <ul className="searchresult">
          {this.props.users.map((user, idx) => (
            <li key={idx}>
              {user}
            </li>
          ))}
        </ul>
        <ul className="pendingFreinds">
          {this.props.friends[2].pendingFreinds.map((friend, idx) => (
            <li key={idx}>
              {friend}
            </li>
          ))}
        </ul>
      </div>
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
