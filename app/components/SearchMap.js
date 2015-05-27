'use strict';

import React from 'react';
import {Map, TileLayer} from 'react-leaflet';
import {HELSINKI_COORDINATES} from '../constants/AppConstants';

class SearchMap extends React.Component {
  render() {
    const position = HELSINKI_COORDINATES;
    const zoom = this.props.zoom || 12;
    return (
      <Map center={position} zoom={zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
      </Map>
    );
  }
}

SearchMap.propTypes = {
  schoolList: React.PropTypes.array.isRequired,
  zoom: React.PropTypes.number
};

export default SearchMap;
