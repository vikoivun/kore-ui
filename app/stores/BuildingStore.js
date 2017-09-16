import _ from 'lodash';

import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../core/AppDispatcher';
import {
  getAddressString,
  getBuildingAddressForYear,
  getItemByIdWrapper,
  sortByYears,
} from '../core/utils';
import BaseStore from './BaseStore';

let _fetchingData = false;
const _buildings = {};

const BuildingStore = Object.assign({}, BaseStore, {
  getBuilding: getItemByIdWrapper(getBuilding, _buildings),
  getFetchingData,
  getLocationsForYear,
});

BuildingStore.dispatchToken = AppDispatcher.register((payload) => {
  const action = payload.action;

  switch (action.type) {
    case ActionTypes.REQUEST_SCHOOL:
      _fetchingData = true;
      BuildingStore.emitChange();
      break;

    case ActionTypes.REQUEST_SCHOOL_SUCCESS:
      _fetchingData = false;
      _receiveBuildings(action.response.entities.buildings);
      BuildingStore.emitChange();
      break;

    case ActionTypes.REQUEST_SEARCH_SUCCESS:
      _receiveBuildings(action.response.entities.buildings);
      BuildingStore.emitChange();
      break;

    default:
      // noop
  }
});

function getBuilding(building) {
  return building;
}

function getFetchingData() {
  return _fetchingData;
}

function getLocationsForYear(buildingIds, year) {
  const locations = [];
  _.each(buildingIds, (buildingId) => {
    const building = _buildings[buildingId];
    if (_.isEmpty(building)) {
      return;
    }

    const address = getBuildingAddressForYear(building.addresses, year);
    if (address && !_.isEmpty(address.location)) {
      const locationId = `${buildingId}-${address.id}`;
      locations.push(
        _.assign({}, address.location, { address: getAddressString(address), id: locationId })
      );
    }
  });
  return locations;
}

function _receiveBuildings(buildings) {
  _.each(buildings, (building) => {
    _buildings[building.id] = {
      addresses: sortByYears(building.addresses),
      id: building.id,
      neighborhood: building.neighborhood,
    };
  });
}

export default BuildingStore;
