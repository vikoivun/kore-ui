'use strict';

import _ from 'lodash';
import React from 'react';

const defaultImageUrl = require('../images/default-building.jpg');

function getAddressArrayFromBuilding(building) {
  if (building && building.addresses && building.addresses.length) {
    return [
      building.addresses[0].street_name_fi,
      ', ',
      building.addresses[0].municipality_fi
    ];
  }
  return '';
}

function getAddressString(address) {
  const street = address.street_name_fi || '';
  const municipality = address.municipality_fi || '';
  return `${street}\, ${municipality}`;
}

function getBoxContent(item) {
  return [
    item.begin_year,
    <i className='fa fa-lg fa-long-arrow-right'/>,
    item.end_year
  ];
}

function getImageUrl(building) {
  if (!building || !building.photos || !building.photos.length) {
    return defaultImageUrl;
  }
  const photo = _.find(building.photos, 'is_front');
  return photo ? photo.url : building.photos[0].url;
}

function getItemByIdWrapper(func, items, defaultValue) {
  return function(itemId) {
    defaultValue = defaultValue ? defaultValue : {};
    const item = items[itemId];
    let newArgs = Array.prototype.slice.call(arguments, 1);
    newArgs.unshift(item);
    return _.isEmpty(item) ? defaultValue : func.apply(null, newArgs);
  };
}

function getItemForYear(itemList, year) {
  return _.find(itemList, function(item) {
    return inBetween(year, item.begin_year, item.end_year);
  });
}

function inBetween(year, beginYear, endYear) {
  beginYear = beginYear || 0;
  endYear = endYear || 10000;
  return _.inRange(year, beginYear, endYear + 1);
}

function processBasicInfoRow(details) {
  if (_.isEmpty(details.name)) {
    return [];
  }
  return [
    {
      key: 'school-name-' + details.name.id,
      className: 'details-school-name',
      name: details.name.official_name,
      boxContent: getBoxContent(details.name)
    },
    {
      key: 'principal-' + details.principal.id,
      className: 'details-principal',
      name: details.principal.name,
      boxContent: getBoxContent(details.principal)
    },
    {
      key: 'school-building-' + details.building.id,
      className: 'details-building',
      // The address should be sorted by time as well.
      name: getAddressArrayFromBuilding(details.building),
      boxContent: getBoxContent(details.building)
    },
    {
      key: 'school-archive-' + details.archive.id,
      className: 'details-archive',
      name: details.archive.location,
      boxContent: getBoxContent(details.archive)
    }
  ];
}

function sortByYears(list) {
  return _.sortByOrder(list, ['end_year', 'begin_year'], [false, false]);
}

export default {
  getAddressArrayFromBuilding,
  getAddressString,
  getBoxContent,
  getImageUrl,
  getItemByIdWrapper,
  getItemForYear,
  inBetween: inBetween,
  processBasicInfoRow,
  sortByYears
};
