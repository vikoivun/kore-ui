'use strict';

import _ from 'lodash';
import L from 'leaflet';
import React from 'react';

import {HELSINKI_COORDINATES, MAP_ZOOM} from '../constants/MapConstants';
import {getTileLayers, getMapOptions, getPosition} from '../core/mapUtils';

function getPopupContent(school) {
  return `<span>${school.name.officialName}</span>`;
}

function getMarker(school) {
  const position = getPosition(school.location);
  return L.marker(position).bindPopup(getPopupContent(school));
}

class SearchMap extends React.Component {
  constructor() {
    super();
    this.mapOptions = getMapOptions();
    this.layers = getTileLayers();
    this.markerGroup = L.featureGroup();
    this.markers = {};
    this.addMarkers = this.addMarkers.bind(this);
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
    if (this.props.schoolList.length) {
      this.addMarkers(this.props.schoolList);
    }
  }

  componentWillUpdate(nextProps) {
    const schools = nextProps.schoolList;
    const selectedMarker = this.markers[nextProps.selectedSchool];
    const isLoadingData = nextProps.fetchingData && !schools.length;
    const hasNewSchools = schools.length && schools.length !== _.keys(this.markers).length;

    if (isLoadingData) {
      this.markerGroup.clearLayers();
      this.markers = {};
    } else if (hasNewSchools) {
      this.addMarkers(nextProps.schoolList);
    } else if (!nextProps.fetchingData && selectedMarker) {
      this.map.panTo(selectedMarker.getLatLng());
      selectedMarker.openPopup();
    }
  }

  componentWillUnmount() {
    this.markerGroup.clearLayers();
    this.map.removeLayer(this.markerGroup);
    _.each(this.layers, function(layer) {
      this.map.removeLayer(layer);
    }, this);
    this.map.remove();
  }

  addMarkers(schools) {
    _.each(schools, function(school) {
      if (!_.has(this.markers, school.id)) {
        this.markers[school.id] = getMarker(school);
        this.markerGroup.addLayer(this.markers[school.id]);
      }
    }, this);
    const bounds = this.markerGroup.getBounds();
    this.map.fitBounds(bounds, {maxZoom: 15, padding: [50, 50]});
  }

  render() {
    return (
      <div ref='map' />
    );
  }
}

SearchMap.propTypes = {
  fetchingData: React.PropTypes.bool,
  schoolList: React.PropTypes.array.isRequired,
  selectedSchool: React.PropTypes.number,
  zoom: React.PropTypes.number
};

export default SearchMap;
