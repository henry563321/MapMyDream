import React from 'react';
import {selectDreams, selectComments} from '../../reducers/selectors';
import {Link} from 'react-router-dom';

export default class DreamItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      hidden: true
    };
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

  handleClick(id) {
    this.props.deleteComment(id);
  }

  toggleShow() {
    this.setState({hidden: !this.state.hidden});
  }

  renderDelete(commenterId, id) {
    if (this.props.currentUserId === commenterId) {
      return (
        <button className='deletebut' onClick={this.handleClick.bind(this, id)}>Delete</button>
      );
    } else {
      return null;
    }
  }

  handleSubmit(dream) {
    const commenterId = this.props.currentUserId;
    const comment = {
      body: this.state.comment,
      commenter_id: commenterId,
      route_id: dream[4]
    };
    this.props.postComment(comment).then(() => this.setState({comment: ""}));
  }

  render() {
    return (
    <li className='dreamItem' >
      <a className='usericon'/>
      <div className = 'dreamdetail'>
        <h3 className="dreamtitle">{this.props.currentId} create the dream!</h3>
        <div className= 'dreamdeepdetail'>
        <img className='staticimg' src={`https://maps.googleapis.com/maps/api/staticmap?size=400x300&path=weight:3%7Cenc:${this.props.dream[3]}&key=AIzaSyCcRlcfpJoSPP31a-a5UfOgNGzyEtcT09M`}></img>
        <div className= 'distancedetail'>
          <a className='distanceIcon'/>
          <div className='displaydistance'>
          {this.calculateDistance(this.props.dream)}
          <span className='unit'>mi</span>
          </div>
        </div>
      </div>
      <div>
        <button className='iconcomment' onClick={this.toggleShow.bind(this)}></button>
      </div>
        <div className={this.state.hidden ? 'commenthide' : 'commentbody'}>
          <ul className='commentlist'>
            {selectComments(this.props.comments, this.props.dream[4]).map((comment) => (
              <div className='commentbox'>
                <a className='commenticon'/>
                <div className='commentitem'>
                <div id='topitem'>
                <Link className="commenter" to={`/users/${comment[4]}`}>{comment[4]}</Link>
                {this.renderDelete(comment[0], comment[3])}
                </div>
                <p>{comment[1]}</p>
                </div>
              </div>
            ))}
          </ul>
          <form className='commentform' onSubmit={this.handleSubmit.bind(this, this.props.dream)}>
            <a className='commenticon'/>
            <input type='text'
              className='commentinput'
              value={this.state.comment}
              onChange={this.update('comment')}
              placeholder='write a comment...'
              />
            <button className='postbut'>POST</button>
        </form>
        </div>
      </div>
    </li>
  );
  }
}
