import React from 'react';
import {addNewDream} from '../../actions/route_actions';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
  return ({
  loggedIn: Boolean(state.session.currentUser),
  errors: state.dream.errors
});
};

const mapDispatchToProps = (dispatch) => {
  return {
    addRoute: dream => dispatch(addNewDream(dream))
  };
};

class dreamMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      poly: new google.maps.Polyline({
            strokeColor: '#000000',
            strokeOpacity: 1.0,
            strokeWeight: 3
          }),
      start_time: new Date(),
      start_date: new Date(),
      end_time: new Date(),
      end_date: new Date(),
      distance: 0.0,
    };
    this.addLatLng = this.addLatLng.bind(this);
    this.removeLine = this.removeLine.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

  componentDidMount() {
    const mapOptions = {
      center: { lat: 40.7128, lng: -74.0059 },
      zoom: 13
    };
    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    this.state.poly.setMap(this.map);
    this.map.addListener('click', this.addLatLng);
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    this.map.addListener('bounds_changed', () => {
        searchBox.setBounds(this.map.getBounds());
    });
    const map = this.map;
    searchBox.addListener('places_changed', () => {
         var places = searchBox.getPlaces();

         if (places.length === 0) {
           return;
         }
         var bounds = new google.maps.LatLngBounds();
               places.forEach(function(place) {
                 if (!place.geometry) {
                   console.log("Returned place contains no geometry");
                   return;
                 }
                 var icon = {
                   url: place.icon,
                   size: new google.maps.Size(71, 71),
                   origin: new google.maps.Point(0, 0),
                   anchor: new google.maps.Point(17, 34),
                   scaledSize: new google.maps.Size(25, 25)
                 };

             if (place.geometry.viewport) {
             // Only geocodes have viewport.
             bounds.union(place.geometry.viewport);
           } else {
             bounds.extend(place.geometry.location);
           }
         });
         map.fitBounds(bounds);
       });

     }

  update(property) {
    return e => this.setState({
      [property]: e.currentTarget.value
    });
  }

  addLatLng(event) {
    var path = this.state.poly.getPath();
    path.push(event.latLng);
    var dist = google
      .maps.geometry.spherical.computeLength(this.state.poly.getPath());
    this.setState({distance: (dist*0.000621).toFixed(2)});
  }

  renderErrors() {
    return(
      <ul className="dreamerrors">
        {this.props.errors.map((error, idx) => (
          <li key={idx}>
            {error}
          </li>
        ))}
      </ul>
    );
  }


  removeLine() {
    this.state.poly.setMap(null);
    this.state.poly = new google.maps.Polyline({
          strokeColor: '#000000',
          strokeOpacity: 1.0,
          strokeWeight: 3
        });
    this.state.poly.setMap(this.map);
    this.setState({distance: 0.0});
  }

  handleSubmit(e) {
    e.preventDefault();
    const startTime = new Date(
      this.state.start_date + " " + this.state.start_time);
    const endTime = new Date(
      this.state.end_date + " " + this.state.end_time);
    const encodeString =
      google.maps.geometry.encoding.encodePath(this.state.poly.getPath());
    const dream = {
      start_time: startTime,
      end_time: endTime,
      route: encodeString
    };
    this.props.addRoute(dream).then(() => this.props.history.push('/home'));
  }


  render() {

    return (
      <div className='Map'>
        <div id='mapform'>
          <input id="pac-input"
          class="controls" type="text"
          placeholder="Dream Location"/>
          {this.renderErrors()}
          <button className="createbut deletedream"
            onClick={this.removeLine}>Remove Dream</button>
          <span className='titledistance'>Distance: {this.state.distance}Mile</span>
          <form onSubmit={this.handleSubmit}>
            <h5>StartTime:</h5>
            <h5>Time:</h5>
            <input className='timeinput'type='time'
              onChange={this.update('start_time')}/>
            <h5>Date:</h5>
            <input className='timeinput'type='date'
              onChange={this.update('start_date')}/>
            <h5>EndTime:</h5>
            <h5>Time:</h5>
            <input className='timeinput'type='time'
              onChange={this.update('end_time')}/>
            <h5>Date:</h5>
            <input className='timeinput' type='date'
              onChange={this.update('end_date')}/>
            <input type="submit"
              className="createbut"value="Create New Dream" />
          </form>
        </div>
        <div id='map'></div>
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(dreamMap);
