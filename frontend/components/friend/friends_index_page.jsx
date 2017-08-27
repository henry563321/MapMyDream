import React from 'react';
import {connect} from 'react-redux';
import {fetchAllFriends} from '../../actions/friend_actions';


const mapDispatchToProps = (dispatch) => ({
  receiveAllFriends: () => dispatch(fetchAllFriends())
});

class friendIndexPage extends React.Component {
  componentDidMount() {
    this.props.receiveAllFriends();
  }


  render() {
    return (
      <ul>
      </ul>

    );
    }
  }

export default connect(null, mapDispatchToProps)(friendIndexPage);
