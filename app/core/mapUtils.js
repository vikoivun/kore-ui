'use strict';

import _ from 'lodash';

// Add proj4 extension to leaflet for historical maps.
// Don't change the import order!
import L from 'leaflet';
import 'proj4leaflet';
import 'proj4';
// import proj4 from 'proj4';

import {DEFAULT_LAYER, HISTORICAL_LAYERS} from '../constants/MapConstants';

const crs = _makeCRS();
const layers = _makeLayers();

function _getGeoerverUrl(layerName, layerFmt) {
  /*eslint-disable */
  return `http://geoserver.hel.fi/geoserver/gwc/service/tms/1.0.0/${layerName}@ETRS-GK25@${layerFmt}/{z}/{x}/{y}.${layerFmt}`;
  /*eslint-enable */
}

function _makeCRS() {
  const crsName = 'EPSG:3879';
  /*eslint-disable */
  const projDef = '+proj=tmerc +lat_0=0 +lon_0=25 +k=1 +x_0=25500000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs';
  /*eslint-enable */
  const bounds = [25440000, 6630000, 25571072, 6761072];
  const resolutions = [256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5, 0.25, 0.125, 0.0625];
  return new L.Proj.CRS.TMS(crsName, projDef, bounds, {resolutions: resolutions});
}

function _makeHistoricalMapLayer(layerName) {
  const geoserverUrl = _getGeoerverUrl(layerName, 'png');
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
  _layers[DEFAULT_LAYER.title] = L.tileLayer(
    DEFAULT_LAYER.url,
    {attribution: DEFAULT_LAYER.attribution}
  );
  _.each(HISTORICAL_LAYERS, function(layer) {
    _layers[layer.title] = _makeHistoricalMapLayer(`historical:${layer.name}`);
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

function getHistoricalLayers() {
  return layers;
}

function getMapOptions() {
  return {
    // crs: crs, // Remove comment if you want to use some historical layer as a default.
    continuusWorld: true,
    worldCopyJump: false,
    zoomControl: true,
    closePopupOnClick: true,
    layers: [layers[DEFAULT_LAYER.title]]
  };
}

function getPosition(location) {
  const coordinates = location.coordinates;
  if (_.isEmpty(coordinates)) {
    return null;
  }
  return [coordinates[1], coordinates[0]];
}

export default {
  getBounds,
  getCrs,
  getHistoricalLayers,
  getMapOptions,
  getPosition
};
