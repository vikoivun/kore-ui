'use strict';

const TILE_LAYERS = [
  {year: 2010, name: 'hel:Karttasarja', title: 'Helsinki'},
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

export default {
  HELSINKI_COORDINATES: [60.192059, 24.945831],
  TILE_LAYERS,
  MAP_ZOOM: 5
};
