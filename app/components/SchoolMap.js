'use strict';

import _ from 'lodash';
import L from 'leaflet';
import React from 'react';

import {DEFAULT_LAYER_NAME, HELSINKI_COORDINATES, MAP_ZOOM} from '../constants/MapConstants';
import {getLayerNameForYear, getMapOptions, getPosition, getTileLayers} from '../core/mapUtils';

class SchoolMap extends React.Component {
  constructor(props) {
    super(props);
    this.currentLayerName = DEFAULT_LAYER_NAME;
    this.mapOptions = getMapOptions();
    this.layers = getTileLayers();
    this.markerGroup = L.featureGroup();
    this.markers = {};
    this.addMarkers = this.addMarkers.bind(this);
    this.getMarker = this.getMarker.bind(this);
    this.updateTileLayer = this.updateTileLayer.bind(this);
  }

  componentDidMount() {
    this.map = L
      .map(React.findDOMNode(this.refs.map), this.mapOptions)
      .setView(HELSINKI_COORDINATES, MAP_ZOOM);
    this.updateTileLayer(this.props.selectedYear);
    this.markerGroup.addTo(this.map);

    if (!_.isEmpty(this.props.locations)) {
      this.addMarkers(this.props.locations);
    }
  }

  componentWillUpdate(nextProps) {
    this.updateTileLayer(nextProps.selectedYear);
    const oldLocations = this.props.locations;
    const newLocations = nextProps.locations;
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

  updateTileLayer(selectedYear) {
    const newLayerName = getLayerNameForYear(selectedYear);
    if (newLayerName !== this.currentLayerName) {
      this.map.removeLayer(this.layers[this.currentLayerName]);
      this.layers[newLayerName].addTo(this.map);
      this.currentLayerName = newLayerName;
    }
  }

  render() {
    const locationDefined = _.some(this.props.locations, 'coordinates');
    let overlayClassname = 'location-undefined-overlay';
    overlayClassname += locationDefined ? ' hidden' : '';

    return (
      <div>
        <div ref='map' />
        <div className={overlayClassname}>
          <div className='location-undefined-message'>
            <i className='fa fa-map-marker'></i>
            Sijaintia tälle vuodelle ei ole määritelty.
          </div>
        </div>
      </div>
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
  selectedYear: React.PropTypes.number,
  zoom: React.PropTypes.number
};

export default SchoolMap;
