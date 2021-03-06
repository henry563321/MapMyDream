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
      waypoints: [],
      poly: "",
      start: "",
      end: "",
      start_time: new Date(),
      start_date: new Date(),
      end_time: new Date(),
      end_date: new Date(),
      distance: 0.0,
      directionsDisplay: new google.maps.DirectionsRenderer(),
    };
    this.addLatLng = this.addLatLng.bind(this);
    this.removeLine = this.removeLine.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.calculateAndDisplayRoute = this.calculateAndDisplayRoute.bind(this);
}

  componentDidMount() {
    const mapOptions = {
      center: { lat: 40.7128, lng: -74.0059 },
      zoom: 13
    };

    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

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
    if (this.state.start === "") {
      this.setState({start: event.latLng});
    } else if (this.state.end === ""){
      this.setState({end: event.latLng});
    }
    if (this.state.end !== "") {
      const point = {
        location: this.state.end,
        stopover: false
      };
      let waypoints = this.state.waypoints;
      waypoints.push(point);
      this.setState({waypoints: waypoints});
      this.setState({end: event.latLng});
      const directionsService = new google.maps.DirectionsService;
      this.calculateAndDisplayRoute(directionsService, this.directionsDisplay);
      this.state.directionsDisplay.setMap(this.map);
    }
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

  calculateAndDisplayRoute(directionsService) {
    const start = this.state.start;
    const end = this.state.end;
    directionsService.route({
      origin: start,
      destination: end,
      travelMode: 'WALKING',
      waypoints: this.state.waypoints
    }, function(response, status) {
      let poly = "";
      let distance = 0;
      if (status === 'OK') {
        poly = response.routes[0].overview_polyline;
        this.setState({poly: poly});
        distance = response.routes[0].legs[0].distance.value*0.000621;
        this.setState({ distance: distance});
        this.state.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }

    }.bind(this));
}


  removeLine() {
    this.state.directionsDisplay.setMap(null);
    this.setState({start: "", end : "", distance:0.0, waypoints:[],
      directionsDisplay: new google.maps.DirectionsRenderer()});
  }

  handleSubmit(e) {
    e.preventDefault();
    const startTime = new Date(
      this.state.start_date + " " + this.state.start_time);
    const endTime = new Date(
      this.state.end_date + " " + this.state.end_time);
    const dream = {
      start_time: startTime,
      end_time: endTime,
      route: this.state.poly
    };
    this.props.addRoute(dream).then(() => this.props.history.push('/home'));
  }


  render() {

    return (
      <div className='Map'>
        <div id='mapform'>
          <input id="pac-input"
          className="controls" type="text"
          placeholder="Dream Location"/>
          {this.renderErrors()}
          <button className="createbut deletedream"
            onClick={this.removeLine}>Remove Dream</button>
          <span className='titledistance'>Distance: {this.state.distance.toFixed(2)}Mile</span>
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
