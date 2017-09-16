import _ from 'lodash';
import L from 'leaflet';
import React from 'react';

import router from '../router';
import BaseMap from './BaseMap';
import { HELSINKI_COORDINATES, MAP_MAX_ZOOM, MAP_ZOOM } from '../constants/MapConstants';
import { getMarkerIcon, getPosition } from '../core/mapUtils';

class SearchMap extends BaseMap {
  componentDidMount() {
    this.map = L
      .map(React.findDOMNode(this.refs.map), this.mapOptions)
      .setView(HELSINKI_COORDINATES, MAP_ZOOM);
    this.updateTileLayer(this.props.selectedMapYear);
    this.markerGroup.addTo(this.map);
    this.shouldAddMarkers = false;
    if (this.props.schoolList.length) {
      this.shouldAddMarkers = true;
    }
  }

  componentWillUpdate(nextProps) {
    const schools = nextProps.schoolList;
    const selectedMarker = this.markers[nextProps.selectedSchoolId];
    const isLoadingData = nextProps.fetchingData && !schools.length;
    const hasNewSchools = schools.length && schools.length !== _.keys(this.markers).length;

    if (hasNewSchools) {
      this.shouldAddMarkers = true;
    }

    if (nextProps.selectedMapYear) {
      this.updateTileLayer(nextProps.selectedMapYear);
    }

    if (isLoadingData) {
      this.markerGroup.clearLayers();
      this.markers = {};
    }

    if (this.shouldAddMarkers && !nextProps.fetchingData) {
      this.addMarkers(nextProps.schoolList);
    } else if (!nextProps.fetchingData && selectedMarker) {
      this.map.panTo(selectedMarker.getLatLng());
      selectedMarker.openPopup();
    }
  }

  addMarkers(schools) {
    _.each(schools, function (school) {
      if (!_.has(this.markers, school.location.id)) {
        this.markers[school.location.id] = this.getMarker(school);
        this.markerGroup.addLayer(this.markers[school.location.id]);
      }
    }, this);
    this.shouldAddMarkers = false;
    const bounds = this.markerGroup.getBounds();
    this.map.fitBounds(bounds, { maxZoom: MAP_MAX_ZOOM, padding: [50, 50] });
  }

  getMarker(school) {
    const position = getPosition(school.location);
    return L
      .marker(position, { icon: getMarkerIcon() })
      .bindPopup(this.getPopupContent(school));
  }

  getPopupContent(school) {
    const link = document.createElement('a');
    link.innerHTML = `${school.name}`;
    link.href = '#';
    link.className = 'school-popup-link';
    link.onclick = function (event) {
      event.preventDefault();
      if (school.beginYear) {
        router.transitionTo(
          'school-with-year', { schoolId: school.schoolId, year: school.beginYear }
        );
      } else {
        router.transitionTo('school', { schoolId: school.schoolId });
      }
    };
    return link;
  }
}

SearchMap.propTypes = {
  fetchingData: React.PropTypes.bool,
  schoolList: React.PropTypes.array.isRequired,
  selectedMapYear: React.PropTypes.string,
  selectedSchoolId: React.PropTypes.string,
};

export default SearchMap;
