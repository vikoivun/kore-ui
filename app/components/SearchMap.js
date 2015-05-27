'use strict';

import React from 'react';
import _ from 'lodash';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import {Link} from 'react-router';
import {HELSINKI_COORDINATES} from '../constants/AppConstants';
import {getBounds, getPosition} from '../core/mapUtils';

function getMarker(school) {
  const position = getPosition(school.location);
  return (
    <Marker key={school.id} position={position}>
      <Popup>
        <span>
          <Link params={{schoolId: school.id}} to='school'>{school.name.officialName}</Link>
        </span>
      </Popup>
    </Marker>
  );
}

class SearchMap extends React.Component {
  componentDidMount() {
    this.map = this.refs.map.getLeafletElement();
    const coordinates = _.pluck(this.props.schoolList, ['location', 'coordinates']);
    this.centerMap(coordinates);
  }

  componentWillUpdate(nextProps) {
    const coordinates = _.pluck(nextProps.schoolList, ['location', 'coordinates']);
    this.centerMap(coordinates);
  }

  centerMap(coordinates) {
    if (coordinates.length) {
      const bounds = getBounds(coordinates);
      this.map.fitBounds(bounds, {padding: [50, 50]});
    }
  }

  render() {
    const showDefaultLocation = !this.props.schoolList.length && !this.props.fetchingData;
    const position = showDefaultLocation ? HELSINKI_COORDINATES : null;
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
  fetchingData: React.PropTypes.bool,
  schoolList: React.PropTypes.array.isRequired,
  zoom: React.PropTypes.number
};

export default SearchMap;
