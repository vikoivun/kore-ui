'use strict';

import _ from 'lodash';

import AppDispatcher from '../core/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import BaseStore from './BaseStore';
import BuildingStore from './BuildingStore';
import SchoolStore from './SchoolStore';
import {getAddressStringFromBuilding, getItemByIdWrapper} from '../core/utils';

let _schoolBuildings = {};

const SchoolBuildingStore = Object.assign({}, BaseStore, {
  getSchoolBuilding: getItemByIdWrapper(getSchoolBuilding, _schoolBuildings),
  getSearchDetails
});

SchoolBuildingStore.dispatchToken = AppDispatcher.register(function(payload) {
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
  _.each(schoolBuildingIds, function(schoolBuildingId) {
    const schoolBuilding = _schoolBuildings[schoolBuildingId];
    if (_.isEmpty(schoolBuilding)) {
      return;
    }
    const schoolId = schoolBuilding.school;
    const buildingId = schoolBuilding.id;
    const building = BuildingStore.getBuilding(buildingId);
    schoolBuilding.name = getAddressStringFromBuilding(building);
    schoolBuilding.type = 'school-building';

    const results = SchoolStore.getSearchResultsForBuilding(schoolId, schoolBuilding);
    searchDetails = searchDetails.concat(results);
  });
  return _.uniq(_.sortBy(searchDetails, 'id'), true, 'id');
}

function _receiveSchoolBuildings(schoolBuildings) {
  _.each(schoolBuildings, function(schoolBuilding) {
    _schoolBuildings[schoolBuilding.id] = schoolBuilding;
  });
}

export default SchoolBuildingStore;
