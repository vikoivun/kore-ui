'use strict';

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

export default {
  getAddressArrayFromBuilding: getAddressArrayFromBuilding
};
