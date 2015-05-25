'use strict';

import _ from 'lodash';
import React from 'react';


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

function getBoxContent(item) {
  return [
    item.begin_year,
    <i className='fa fa-lg fa-long-arrow-right'/>,
    item.end_year
  ];
}

function processBasicInfoRow(details) {
  if (_.isEmpty(details.name)) {
    return [];
  }
  return [
    {
      key: 'school-name' + details.name.id,
      className: 'details-school-name',
      name: details.name.official_name,
      boxContent: getBoxContent(details.name)
    },
    {
      key: 'principal' + details.principal.id,
      className: 'details-principal',
      name: details.principal.name,
      boxContent: getBoxContent(details.principal)
    },
    {
      key: 'school-building' + details.building.id,
      className: 'details-building',
      // The address should be sorted by time as well.
      name: getAddressArrayFromBuilding(details.building.building),
      boxContent: getBoxContent(details.building)
    },
    {
      key: 'school-archive' + details.archive.id,
      className: 'details-archive',
      name: details.archive.location,
      boxContent: getBoxContent(details.archive)
    }
  ];
}

export default {
  getAddressArrayFromBuilding,
  getBoxContent,
  processBasicInfoRow
};
