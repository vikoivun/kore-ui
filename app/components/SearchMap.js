'use strict';

import React from 'react';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import {HELSINKI_COORDINATES} from '../constants/AppConstants';
import {getPosition} from '../core/mapUtils';

function getMarker(school) {
  const position = getPosition(school.location);
  return (
    <Marker key={school.id} position={position}>
      <Popup>
        <span>{school.name.officialName}</span>
      </Popup>
    </Marker>
  );
}

class SearchMap extends React.Component {
  render() {
    const position = HELSINKI_COORDINATES;
    const zoom = this.props.zoom || 12;
    return (
      <Map
        center={position}
        ref='map'
        zoom={zoom}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        {this.props.schoolList.map(getMarker)}
      </Map>
    );
  }
}

SearchMap.propTypes = {
  schoolList: React.PropTypes.array.isRequired,
  zoom: React.PropTypes.number
};

export default SearchMap;
