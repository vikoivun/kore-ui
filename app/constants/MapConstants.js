'use strict';

const TILE_LAYERS = [
  {
    beginYear: 2010,
    endYear: new Date().getFullYear(),
    name: 'hel:Karttasarja',
    title: 'Opaskartta'
  },
  {
    beginYear: 1999,
    endYear: 2009,
    name: 'historical:1999_opaskartta',
    title: 'Opaskartta, 1999'
  },
  {
    beginYear: 1962,
    endYear: 1998,
    name: 'historical:1962_opaskartta',
    title: 'Opaskartta, 1962'
  },
  {
    beginYear: 1952,
    endYear: 1961,
    name: 'historical:1952_opaskartta',
    title: 'Opaskartta, 1952'
  },
  {
    beginYear: 1940,
    endYear: 1951,
    name: 'historical:1940_opaskartta',
    title: 'Opaskartta, 1940'
  },
  {
    beginYear: 1937,
    endYear: 1939,
    name: 'historical:1937_opaskartta',
    title: 'Opaskartta, 1937'
  },
  {
    beginYear: 1917,
    endYear: 1936,
    name: 'historical:1917-1918_opaskartta',
    title: 'Opaskartta, 1917-1918'
  },
  {
    beginYear: 1909,
    endYear: 1916,
    name: 'historical:1909_opaskartta',
    title: 'Opaskartta, 1909'
  },
  {
    beginYear: 1900,
    endYear: 1908,
    name: 'historical:1900_opaskartta',
    title: 'Opaskartta, 1900'
  },
  {
    beginYear: 1878,
    endYear: 1899,
    name: 'historical:1878_asemakaavakartta',
    title: 'Asemakaavakartta, 1878'
  },
  {
    beginYear: 1838,
    endYear: 1877,
    name: 'historical:1838_asemakaavakartta',
    title: 'Asemakaavakartta, 1838'
  },
  {
    beginYear: 1820,
    endYear: 1837,
    name: 'historical:1820_asemakaavakartta',
    title: 'Asemakaavakartta, 1820'
  },
  {
    beginYear: 1790,
    endYear: 1819,
    name: 'historical:merikartta_1790',
    title: 'Merikartta, 1790'
  }
];

/*eslint-disable */
const CRS_PROJ_DEF = '+proj=tmerc +lat_0=0 +lon_0=25 +k=1 +x_0=25500000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs';
/*eslint-enable */

export default {
  CRS_BOUNDS: [25440000, 6630000, 25571072, 6761072],
  CRS_NAME: 'EPSG:3879',
  CRS_PROJ_DEF,
  CRS_RESOLUTIONS: [256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5, 0.25, 0.125, 0.0625],
  DEFAULT_LAYER: TILE_LAYERS[0],
  HELSINKI_COORDINATES: [60.192059, 24.945831],
  TILE_LAYERS,
  MAP_MAX_ZOOM: 7,
  MAP_ZOOM: 5
};
