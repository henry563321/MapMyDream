import React from 'react';


class dreamMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      poly: new google.maps.Polyline({
            strokeColor: '#000000',
            strokeOpacity: 1.0,
            strokeWeight: 3
          })
    };
    this.addLatLng = this.addLatLng.bind(this);
  }

  componentDidMount() {
    const mapOptions = {
      center: { lat: 37.7758, lng: -122.435 },
      zoom: 13
    };
    this.map = new google.maps.Map(this.mapNode, mapOptions);
    this.state.poly.setMap(this.map);

        // Add a listener for the click event
    this.map.addListener('click', this.addLatLng);
  }

   addLatLng(event) {
        var path = this.state.poly.getPath();

        // Because path is an MVCArray, we can simply append a new coordinate
        // and it will automatically appear.
        path.push(event.latLng);

        // Add a new marker at the new plotted point on the polyline.
        var marker = new google.maps.Marker({
          position: event.latLng,
          title: '#' + path.getLength(),
          map: this.map
        });
      }

  render() {
    return (
        <div ref={map => this.mapNode = map}>
          
        </div>
    );
  }
}

export default dreamMap;
