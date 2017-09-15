

import _ from 'lodash';
import L from 'leaflet';
import React from 'react';

import { DEFAULT_LAYER, HELSINKI_COORDINATES, MAP_ZOOM } from '../constants/MapConstants';
import {
  getLayerNameForYear,
  getMapOptions,
  getMarkerIcon,
  getPosition,
  getTileLayers,
} from '../core/mapUtils';

class BaseMap extends React.Component {
  constructor(props) {
    super(props);

    this.currentLayerName = DEFAULT_LAYER.title;
    this.layers = getTileLayers();
    this.mapOptions = getMapOptions();
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

    // There is a weird issue in leaflet that sometimes causes the zoom to freeze.
    // This line should fix that.
    // For more info see: https://github.com/Leaflet/Leaflet/issues/2693
    this.map.on('zoomanim', _.debounce(this.map._onZoomTransitionEnd, 250));

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
    this.markerGroup.clearLayers();
    this.map.removeLayer(this.markerGroup);
    this.map.removeLayer(this.layers[this.currentLayerName]);
    this.map.remove();
  }

  addMarkers(locations) {
    _.each(locations, function (location) {
      if (_.isEmpty(location.coordinates)) {
        return;
      }
      if (!_.has(this.markers, location.id)) {
        this.markers[location.id] = this.getMarker(location);
        this.markerGroup.addLayer(this.markers[location.id]);
      }
    }, this);
    if (!_.isEmpty(this.markers)) {
      const bounds = this.markerGroup.getBounds();
      this.map.fitBounds(bounds, { maxZoom: 7, padding: [50, 50] });
    }
  }

  getPopupContent(text) {
    return `<span>${text}</span>`;
  }

  getMarker(location) {
    const position = getPosition(location);
    return L
      .marker(position, { icon: getMarkerIcon() })
      .bindPopup(this.getPopupContent(location.address));
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
    return (
      <div ref="map" />
    );
  }
}

BaseMap.propTypes = {
  locations: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      address: React.PropTypes.string,
      coordinates: React.PropTypes.array,
      type: React.PropTypes.string,
    }),
  ).isRequired,
  selectedYear: React.PropTypes.number,
};

export default BaseMap;
