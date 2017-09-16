import _ from 'lodash';

import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../core/AppDispatcher';
import { getAddressStringFromBuilding, getItemByIdWrapper } from '../core/utils';
import BaseStore from './BaseStore';
import BuildingStore from './BuildingStore';
import SchoolStore from './SchoolStore';

const _schoolBuildings = {};

const SchoolBuildingStore = Object.assign({}, BaseStore, {
  getSchoolBuilding: getItemByIdWrapper(getSchoolBuilding, _schoolBuildings),
  getSearchDetails,
});

SchoolBuildingStore.dispatchToken = AppDispatcher.register((payload) => {
  const action = payload.action;

  switch (action.type) {
    case ActionTypes.REQUEST_SCHOOL_SUCCESS:
      _receiveSchoolBuildings(action.response.entities.schoolBuildings);
      SchoolBuildingStore.emitChange();
      break;

    case ActionTypes.REQUEST_SEARCH_SUCCESS:
      _receiveSchoolBuildings(action.response.entities.schoolBuildings);
      SchoolBuildingStore.emitChange();
      break;

    default:
      // noop
  }
});

function getSchoolBuilding(schoolBuilding) {
  return schoolBuilding;
}

function getSearchDetails(schoolBuildingIds) {
  let searchDetails = [];
  _.each(schoolBuildingIds, (schoolBuildingId) => {
    const schoolBuilding = _schoolBuildings[schoolBuildingId];
    if (_.isEmpty(schoolBuilding)) {
      return;
    }
    const schoolId = schoolBuilding.school;
    const buildingId = schoolBuilding.id;
    const building = BuildingStore.getBuilding(buildingId);
    if (_.isEmpty(building)) {
      return;
    }
    const item = _.assign({}, schoolBuilding, {
      extraInfo: getAddressStringFromBuilding(building),
      type: 'building',
    });
    const results = SchoolStore.getSearchDetailsForItem(schoolId, item);
    searchDetails = searchDetails.concat(results);
  });
  return _.uniq(_.sortByAll(searchDetails, ['extraInfo', 'name']), 'id');
}

function _receiveSchoolBuildings(schoolBuildings) {
  _.each(schoolBuildings, (schoolBuilding) => {
    if (_schoolBuildings[schoolBuilding.id] && _schoolBuildings[schoolBuilding.id].school) {
      schoolBuilding.school = _schoolBuildings[schoolBuilding.id].school;
    }
    _schoolBuildings[schoolBuilding.id] = schoolBuilding;
  });
}

export default SchoolBuildingStore;
