'use strict';

import _ from 'lodash';
import L from 'leaflet';
import React from 'react';
// import {Link} from 'react-router';

// import {HELSINKI_COORDINATES} from '../constants/MapConstants';
import {getCrs, getHistoricalLayers, getMapOptions, getPosition} from '../core/mapUtils';

L.Map.prototype.setCrs = function(newCrs) {
  this.options.crs = newCrs;
};

function getPopupContent(school) {
  return `<span>${school.name.officialName}</span>`;
}

function getMarker(school) {
  const position = getPosition(school.location);
  return L.marker(position).bindPopup(getPopupContent(school));
}

class LeafletMap extends React.Component {
  constructor() {
    super();
    console.log('------> initializing....');
    this.mapOptions = getMapOptions();
    this.layers = getHistoricalLayers();
    this.markerGroup = L.layerGroup();
    this.addedSchools = [];
    this.addMarkers = this.addMarkers.bind(this);
    // this.handleLayerChange = this.handleLayerChange.bind(this);
  }

  componentDidMount() {
    console.log('------------------>>> component did mount');
    this.map = L.map('plain-map', this.mapOptions).setView([60.171944, 24.941389], 5);
    L.control.layers(this.layers).addTo(this.map);
    this.markerGroup.addTo(this.map);
    const self = this;
    this.map.on('baselayerchange', function(layer) {
      const centerPoint = self.map.getCenter();
      if (layer.name === 'Nykykartta') {
        self.map.setCrs(L.CRS.EPSG3857);
      } else {
        self.map.setCrs(getCrs());
      }
      self.map.setView(centerPoint, self.map.getZoom());
    });

    // const coordinates = this.getCoordinates(this.props);
    // this.centerMap(coordinates);
  }

  // componentWillUpdate(nextProps) {
  //   const coordinates = this.getCoordinates(nextProps);
  //   this.marker = this.getMarker(nextProps.selectedSchool);
  //   this.centerMap(coordinates);
  // }

  addMarkers() {
    console.log('add markers');
    _.each(this.props.schoolList, function(school) {
      if (!_.includes(this.addedSchools, school.id)) {
        this.markerGroup.addLayer(getMarker(school));
        this.addedSchools.push(school.id);
      }
    }, this);
  }

  // centerMap(coordinates) {
  //   if (coordinates.length) {
  //     const bounds = getBounds(coordinates);
  //     this.map.fitBounds(bounds, {padding: [50, 50]});
  //   }
  //   if (this.marker) {
  //     this.marker.openPopup();
  //   }
  // }

  // getMarker(schoolId) {
  //   if (schoolId) {
  //     return this.refs['marker-' + schoolId].getLeafletElement();
  //   }
  //   return null;
  // }
  //
  // getCoordinates(props) {
  //   let coordinates = [];
  //   if (props.selectedSchool) {
  //     const school = _.find(
  //       props.schoolList, current => current.id === props.selectedSchool
  //     );
  //     if (school) {
  //       coordinates.push(school.location.coordinates);
  //     }
  //   } else {
  //     coordinates = _.pluck(props.schoolList, ['location', 'coordinates']);
  //   }
  //   return coordinates;
  // }
  //
  // handleLayerChange() {
  //   console.log('layer was changed', this.map);
  //   // this.map.invalidateSize();
  //   // L.Util.requestAnimFrame(this.map.invalidateSize, this.map, false, this.map._container);
  //   // this.map.remove();
  //   // L.control.layers(this.layers).addTo(this.map);
  //   console.log(this.map.ref);
  //   this.mapCounter += 1;
  //   this.forceUpdate();
  //   console.log(this.map);
  //   // L.map('map-map', this.mapOptions).setView([60.171944, 24.941389], 5);
  // }

  render() {
    console.log('------------------>>> render plain map');
    this.addMarkers();
    return (
      <div id='plain-map' />
    );
  }
}

LeafletMap.propTypes = {
  fetchingData: React.PropTypes.bool,
  schoolList: React.PropTypes.array.isRequired,
  selectedSchool: React.PropTypes.number,
  zoom: React.PropTypes.number
};

export default LeafletMap;
