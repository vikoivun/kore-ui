'use strict';

const TILE_LAYERS = [
  {year: 2010, name: 'hel:Karttasarja', title: 'Nykyaika'},
  {year: 1999, name: 'historical:1999_opaskartta', title: 'Opaskartta, 1999'},
  {year: 1962, name: 'historical:1962_opaskartta', title: 'Opaskartta, 1962'},
  {year: 1952, name: 'historical:1952_opaskartta', title: 'Opaskartta, 1952'},
  {year: 1940, name: 'historical:1940_opaskartta', title: 'Opaskartta, 1940'},
  {year: 1937, name: 'historical:1937_opaskartta', title: 'Opaskartta, 1937'},
  {year: 1917, name: 'historical:1917-1918_opaskartta', title: 'Opaskartta, 1917-1918'},
  {year: 1909, name: 'historical:1909_opaskartta', title: 'Opaskartta, 1909'},
  {year: 1900, name: 'historical:1900_opaskartta', title: 'Opaskartta, 1900'},
  {year: 1878, name: 'historical:1878_asemakaavakartta', title: 'Asemakaavakartta, 1878'},
  {year: 1838, name: 'historical:1838_asemakaavakartta', title: 'Asemakaavakartta, 1838'},
  {year: 1820, name: 'historical:1820_asemakaavakartta', title: 'Asemakaavakartta, 1820'},
  {year: 1790, name: 'historical:merikartta_1790', title: 'Merikartta, 1790'}
];

/*eslint-disable */
const CRS_PROJ_DEF = '+proj=tmerc +lat_0=0 +lon_0=25 +k=1 +x_0=25500000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs';
/*eslint-enable */

export default {
  CRS_BOUNDS: [25440000, 6630000, 25571072, 6761072],
  CRS_NAME: 'EPSG:3879',
  CRS_PROJ_DEF,
  CRS_RESOLUTIONS: [256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5, 0.25, 0.125, 0.0625],
  DEFAULT_LAYER_NAME: 'Nykyaika',
  HELSINKI_COORDINATES: [60.192059, 24.945831],
  TILE_LAYERS,
  MAP_ZOOM: 5
};
