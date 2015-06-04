'use strict';

import _ from 'lodash';
import L from 'leaflet';
import React from 'react';

import BaseMap from './BaseMap';
import {HELSINKI_COORDINATES, MAP_ZOOM} from '../constants/MapConstants';
import {getMarkerIcon, getPosition} from '../core/mapUtils';

class SearchMap extends BaseMap {
  componentDidMount() {
    this.map = L
      .map(React.findDOMNode(this.refs.map), this.mapOptions)
      .setView(HELSINKI_COORDINATES, MAP_ZOOM);
    this.updateTileLayer(this.props.selectedMapYear);
    this.markerGroup.addTo(this.map);

    if (this.props.schoolList.length) {
      this.addMarkers(this.props.schoolList);
    }
  }

  componentWillUpdate(nextProps) {
    const schools = nextProps.schoolList;
    const selectedMarker = this.markers[nextProps.selectedSchool];
    const isLoadingData = nextProps.fetchingData && !schools.length;
    const hasNewSchools = schools.length && schools.length !== _.keys(this.markers).length;

    if (nextProps.selectedMapYear) {
      this.updateTileLayer(nextProps.selectedMapYear);
    }

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

  addMarkers(schools) {
    _.each(schools, function(school) {
      if (!_.has(this.markers, school.id)) {
        this.markers[school.id] = this.getMarker(school);
        this.markerGroup.addLayer(this.markers[school.id]);
      }
    }, this);
    const bounds = this.markerGroup.getBounds();
    this.map.fitBounds(bounds, {maxZoom: 15, padding: [50, 50]});
  }

  getMarker(school) {
    const position = getPosition(school.location);
    const popupText = school.name.officialName;
    return L
      .marker(position, {icon: getMarkerIcon()})
      .bindPopup(this.getPopupContent(popupText));
  }
}

SearchMap.propTypes = {
  fetchingData: React.PropTypes.bool,
  schoolList: React.PropTypes.array.isRequired,
  selectedMapYear: React.PropTypes.number,
  selectedSchool: React.PropTypes.number
};

export default SearchMap;
