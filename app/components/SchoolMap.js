'use strict';

import React from 'react';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import Loader from 'react-loader';
import _ from 'lodash';
import {getPosition} from '../core/mapUtils';

class SchoolMap extends React.Component {
  renderMap() {
    const position = getPosition(this.props.location);
    const zoom = this.props.zoom || 14;
    const address = this.props.location.address || '';
    if (!_.isEmpty(position)) {
      return (
        <Map center={position} zoom={zoom}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
          <Marker position={position}>
            <Popup>
              <span>{address}</span>
            </Popup>
          </Marker>
        </Map>
      );
    } else {
      return (
        <div className='location-undefined-message'>
          <i className='fa fa-map-marker'></i>
          Sijaintia tälle vuodelle ei ole määritelty.
        </div>
      );
    }
  }

  render() {
    return (
      <Loader color='#FFF' loaded={!this.props.fetchingData}>
        {this.renderMap()}
      </Loader>
    );
  }
}

SchoolMap.propTypes = {
  fetchingData: React.PropTypes.bool,
  location: React.PropTypes.shape({
    address: React.PropTypes.string,
    coordinates: React.PropTypes.array,
    type: React.PropTypes.string
  }).isRequired,
  zoom: React.PropTypes.number
};

export default SchoolMap;
