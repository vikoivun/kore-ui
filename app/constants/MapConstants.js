'use strict';

const DEFAULT_LAYER = {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  title: 'Nykykartta',
  url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
};

const HISTORICAL_LAYERS = [
  {year: 1999, name: '1999_opaskartta', title: 'Opaskartta, 1999'},
  {year: 1962, name: '1962_opaskartta', title: 'Opaskartta, 1962'},
  {year: 1952, name: '1952_opaskartta', title: 'Opaskartta, 1952'},
  {year: 1940, name: '1940_opaskartta', title: 'Opaskartta, 1940'},
  {year: 1937, name: '1937_opaskartta', title: 'Opaskartta, 1937'},
  {year: 1917, name: '1917-1918_opaskartta', title: 'Opaskartta, 1917-1918'},
  {year: 1909, name: '1909_opaskartta', title: 'Opaskartta, 1909'},
  {year: 1900, name: '1900_opaskartta', title: 'Opaskartta, 1900'},
  {year: 1878, name: '1878_asemakaavakartta', title: 'Asemakaavakartta, 1878'},
  {year: 1838, name: '1838_asemakaavakartta', title: 'Asemakaavakartta, 1838'},
  {year: 1820, name: '1820_asemakaavakartta', title: 'Asemakaavakartta, 1820'},
  {year: 1790, name: 'merikartta_1790', title: 'Merikartta, 1790'}
];

export default {
  DEFAULT_LAYER,
  HELSINKI_COORDINATES: [60.192059, 24.945831],
  HISTORICAL_LAYERS,
  MAP_ZOOM: {default: 12, historical: 5}
};
