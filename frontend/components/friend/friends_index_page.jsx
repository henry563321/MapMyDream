import React from 'react';
import {connect} from 'react-redux';
import {fetchAllFriends, deleteFriend, updateFriend, searchFriend, addFriend}
  from '../../actions/friend_actions';
import {selectFriends, selectUsers} from '../../reducers/selectors';
import {withRouter} from 'react-router-dom';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';

const mapStateToProps = (state) => {
  return ({
    friends : selectFriends(state.friend.friends),
    users : selectUsers(
      state.user.user, state.friend.friends, state.session.currentUser),
    currentUser: state.session.currentUser
});
};


const mapDispatchToProps = (dispatch) => ({
  updateFriend:(friend) => dispatch(updateFriend(friend)),
  unFriend:(id) => dispatch(deleteFriend(id)),
  receiveAllFriends: () => dispatch(fetchAllFriends()),
  searchFriend: (keyword) => dispatch(searchFriend(keyword)),
  addFriend: (friend) => dispatch(addFriend(friend))
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
    this.props.updateFriend(friend).then(() => this.props.receiveAllFriends());
  }

  handleDenied(friend) {
    friend[2] = 'DENIED';
    this.props.updateFriend(friend).then(() => this.props.receiveAllFriends());
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
        <span className='searchtitle'>Friends</span>
      <ul className="searchresultlist">

        {this.props.friends[0].friends.map((friend, idx) => (
          <li className='searchresultitem' key={idx}>
            <a className='usericon'/>
            {friend[1]}
            <button className='addfriendbut' onClick={this.handleUnfriend.bind(this, friend)}>unFriend</button>
          </li>
        ))}
      </ul>
      <span className='searchtitle'>Friends Request</span>
      <ul className="searchresultlist">

        {this.props.friends[1].applier.map((friend, idx) => (
          <li className='searchresultitem' key={idx}>
            <a className='usericon'/>
            {friend[1]}
            <button className='addfriendbut' onClick={this.handleDenied.bind(this, friend)}>Deny</button>
            <button className='addfriendbut accept' onClick={this.handleAccept.bind(this, friend)}>Accept</button>
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

  addFriend(user) {
    const request = {
      user_id: user[0],
      apply_user_id: this.props.currentUser.id,
      status: 'PENDING'
    };
    this.props.addFriend(request).then(() => this.props.receiveAllFriends());
  }

  rendersearch() {
    if (this.props.friends.length !== 0) {
    return (
      <div>
        <span className='searchtitle'>FIND FRIEND BY SEARCH WITH USERNAME</span>
        <form onSubmit={this.handleSearch}>
          <input type='text'
            value={this.state.username}
            onChange={this.update('username')}
            className='searchbox'
            />
          <button className='friendsearchbut'>Search</button>
        </form>
        <ul className="searchresultlist">
          {this.props.users.map((user, idx) => (
            <li className='searchresultitem'key={idx}>
              <a className='usericon'/>
              {user[1]}
              <button className='addfriendbut' onClick={this.addFriend.bind(this, user)}>ADD</button>
            </li>
          ))}
        </ul>
        <ul className="searchresultlist">
          {this.props.friends[2].pendingFreinds.map((friend, idx) => (
            <li className='searchresultitem'key={idx}>
              <a className='usericon'/>
              {friend[1]}
              <span>{friend[2]}</span>
              <button className='addfriendbut' onClick={this.handleUnfriend.bind(this, friend)}>CANCEL</button>
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
        <div className='friendsmain'>
          <h1>MY FRIENDS</h1>
          <Tabs >
            <TabList>
               <Tab tabFor="one"className='tabs'>MY FRIENDS</Tab>
               <Tab tabFor="two"className='tabs'>FIND FRIENDS</Tab>
               <Tab tabFor="three"className='tabs'>INVITE FRIENDS</Tab>
             </TabList>
             <TabPanel tabId="one" >
               {this.renderfriends()}
             </TabPanel>
             <TabPanel tabId="two" >
                 {this.rendersearch()}
             </TabPanel>
          </Tabs>


        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(friendIndexPage);
