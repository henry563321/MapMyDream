import React from 'react';
import {connect} from 'react-redux';
import {fetchAllFriends} from '../../actions/friend_actions';
import {selectFriends} from '../../reducers/selectors';

const mapStateToProps = (state) => {
  return ({
    friends : selectFriends(state.friend.friends)
});
};


const mapDispatchToProps = (dispatch) => ({
  receiveAllFriends: () => dispatch(fetchAllFriends())
});

class friendIndexPage extends React.Component {
  componentDidMount() {
    this.props.receiveAllFriends();
  }


  render() {
    if (this.props.friends.length !== 0) {
      debugger;
      return (
        <ul className="friends">
          {this.props.friends[0].friends.map((friend, idx) => (
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
}

export default connect(mapStateToProps, mapDispatchToProps)(friendIndexPage);
