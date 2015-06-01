'use strict';

import _ from 'lodash';
import L from 'leaflet';
import React from 'react';

import {HELSINKI_COORDINATES, MAP_ZOOM} from '../constants/MapConstants';
import {getTileLayers, getMapOptions, getPosition} from '../core/mapUtils';

class SchoolMap extends React.Component {
  constructor(props) {
    super(props);
    this.mapOptions = getMapOptions();
    this.layers = getTileLayers();
    this.markerGroup = L.featureGroup();
    this.markers = {};
    this.addMarkers = this.addMarkers.bind(this);
    this.getMarker = this.getMarker.bind(this);
  }

  componentDidMount() {
    this.map = L
      .map(React.findDOMNode(this.refs.map), this.mapOptions)
      .setView(HELSINKI_COORDINATES, MAP_ZOOM);
    L.control.layers(this.layers).addTo(this.map);
    this.markerGroup.addTo(this.map);

    const self = this;
    this.map.on('baselayerchange', function() {
      const centerPoint = self.map.getCenter();
      const zoom = MAP_ZOOM;
      self.map.setView(centerPoint, zoom);
    });
    if (!_.isEmpty(this.props.locations)) {
      this.addMarkers(this.props.locations);
    }
  }

  componentWillUpdate(nextProps) {
    const oldLocations = this.props.locations;
    const newLocations = nextProps.locations;
    // Handle year changing here as well.
    if (!_.isEqual(oldLocations, newLocations)) {
      this.markerGroup.clearLayers();
      this.markers = {};
      this.addMarkers(newLocations);
    }
  }

  componentWillUnmount() {
    this.map.remove();
  }

  getPopupContent(text) {
    return `<span>${text}</span>`;
  }

  getMarker(location) {
    const position = getPosition(location);
    return L.marker(position).bindPopup(this.getPopupContent(location.address));
  }

  addMarkers(locations) {
    _.each(locations, function(location) {
      if (_.isEmpty(location.coordinates)) {
        return;
      }
      if (!_.has(this.markers, location.id)) {
        this.markers[location.id] = this.getMarker(location);
        this.markerGroup.addLayer(this.markers[location.id]);
      }
      const bounds = this.markerGroup.getBounds();
      this.map.fitBounds(bounds, {maxZoom: 7, padding: [50, 50]});
    }, this);
  }

  render() {
    return (
      <div ref='map' />
    );
  }
}

SchoolMap.propTypes = {
  fetchingData: React.PropTypes.bool,
  locations: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      address: React.PropTypes.string,
      coordinates: React.PropTypes.array,
      type: React.PropTypes.string
    })
  ).isRequired,
  zoom: React.PropTypes.number
};

export default SchoolMap;
