'use strict';

import _ from 'lodash';
import path from 'path';

// Add proj4 extension to leaflet for historical maps.
// Don't change the import order!
import L from 'leaflet';
import 'proj4leaflet';

import {
  CRS_BOUNDS,
  CRS_NAME,
  CRS_PROJ_DEF,
  CRS_RESOLUTIONS,
  TILE_LAYERS
} from '../constants/MapConstants';

const markerIconUrl = require('../images/leaflet/marker-icon.svg');
const markerShadowUrl = require('../images/leaflet/marker-shadow.svg');

L.Map.prototype.setCrs = function(newCrs) {
  this.options.crs = newCrs;
};
const leafletImageFolder = path.resolve(__dirname, '../images/leaflet');
L.Icon.Default.imagePath = leafletImageFolder;

const MarkerIcon = L.Icon.Default.extend({
  options: {
    iconUrl: markerIconUrl,
    iconRetinaUrl: markerIconUrl,
    shadowAnchor: [28, 35],
    shadowSize: [58, 58],
    shadowUrl: markerShadowUrl
  }
});
const markerIcon = new MarkerIcon();

const crs = _makeCRS();
const layers = _makeLayers();

function _getGeoserverUrl(layerName, layerFmt) {
  /*eslint-disable */
  return `http://geoserver.hel.fi/geoserver/gwc/service/tms/1.0.0/${layerName}@ETRS-GK25@${layerFmt}/{z}/{x}/{y}.${layerFmt}`;
  /*eslint-enable */
}

function _makeCRS() {
  return new L.Proj.CRS.TMS(CRS_NAME, CRS_PROJ_DEF, CRS_BOUNDS, {resolutions: CRS_RESOLUTIONS});
}

function _makeTileLayer(layerName) {
  const geoserverUrl = _getGeoserverUrl(layerName, 'png');
  const options = {
    continuousWorld: true,
    maxZoom: 12,
    minZoom: 2,
    tms: false
  };
  return new L.Proj.TileLayer.TMS(geoserverUrl, crs, options);
}

function _makeLayers() {
  let _layers = {};
  _.each(TILE_LAYERS, function(layer) {
    _layers[layer.title] = _makeTileLayer(layer.name);
  });
  return _layers;
}

function getBounds(coordinates) {
  const [longitudes, latitudes] = _.zip(...coordinates);
  const bounds = [
    [_.min(latitudes), _.min(longitudes)],
    [_.max(latitudes), _.max(longitudes)]
  ];
  return bounds;
}

function getCrs() {
  return crs;
}

function getLayerNameForYear(year) {
  const sortedLayers = _.sortByOrder(TILE_LAYERS, ['beginYear'], [false]);
  return _.find(sortedLayers, (layer) => year >= layer.beginYear).title;
}

function getMapOptions() {
  return {
    crs: crs,
    continuusWorld: true,
    worldCopyJump: false,
    zoomControl: true,
    closePopupOnClick: true,
    layers: [layers[TILE_LAYERS[0].title]]
  };
}

function getMarkerIcon() {
  return markerIcon;
}

function getPosition(location) {
  const coordinates = location.coordinates;
  if (_.isEmpty(coordinates)) {
    return null;
  }
  return [coordinates[1], coordinates[0]];
}

function getTileLayers() {
  return layers;
}

export default {
  getBounds,
  getCrs,
  getLayerNameForYear,
  getMapOptions,
  getMarkerIcon,
  getPosition,
  getTileLayers
};
