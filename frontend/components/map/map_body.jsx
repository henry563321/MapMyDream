import React from 'react';


class dreamMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      poly: new google.maps.Polyline({
            strokeColor: '#000000',
            strokeOpacity: 1.0,
            strokeWeight: 3
          }),
      location: "",
      StartTime: ""
    };
    this.addLatLng = this.addLatLng.bind(this);
    this.removeLine = this.removeLine.bind(this);
}

  componentDidMount() {
    const mapOptions = {
      center: { lat: 37.7758, lng: -122.435 },
      zoom: 13
    };
    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    this.state.poly.setMap(this.map);

        // Add a listener for the click event
    this.map.addListener('click', this.addLatLng);
    google.maps.LatLng.prototype.kmTo = function(a){
    var e = Math, ra = e.PI/180;
    var b = this.lat() * ra, c = a.lat() * ra, d = b - c;
    var g = this.lng() * ra - a.lng() * ra;
    var f = 2 * e.asin(e.sqrt(e.pow(e.sin(d/2), 2) + e.cos(b) * e.cos(c) * e.pow(e.sin(g/2), 2)));
    return f * 6378.137;
}

    google.maps.Polyline.prototype.inKm = function(n){
    var a = this.getPath(n), len = a.getLength(), dist = 0;
    for (var i=0; i < len-1; i++) {
       dist += a.getAt(i).kmTo(a.getAt(i+1));
    }
    return dist;
  }
}

   addLatLng(event) {
        var path = this.state.poly.getPath();
        // Because path is an MVCArray, we can simply append a new coordinate
        // and it will automatically appear.
        path.push(event.latLng);
        // Add a new marker at the new plotted point on the polyline.
        var encodeString = google.maps.geometry.encoding.encodePath(path);
        var meters = google.maps.geometry.spherical.computeLength(this.state.poly.getPath());
        console.log(meters);
      }
    removeLine() {
      this.state.poly.setMap(null);
      this.setState({props :new google.maps.Polyline({
            strokeColor: '#000000',
            strokeOpacity: 1.0,
            strokeWeight: 3
          })});
      debugger;
      this.state.poly.setMap(this.map);
    }

  render() {
    return (
      <div className='Map'>
        <div id='map'></div>
        <div id='mapform'>
          <button onClick={this.removeLine}>Remove Dream</button>
        </div>
      </div>
    );
  }
}

export default dreamMap;
