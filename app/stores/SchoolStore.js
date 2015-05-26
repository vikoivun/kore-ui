'use strict';

import _ from 'lodash';
import AppDispatcher from '../core/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import BaseStore from './BaseStore';
import BuildingStore from './BuildingStore';
import PrincipalStore from './PrincipalStore';
import {getAddressString, getItemByIdWrapper, getItemForYear, sortByYears} from '../core/utils';

let _schools = {};
let _fetchingData = false;

const SchoolStore = Object.assign({}, BaseStore, {
  getBeginAndEndYear: getItemByIdWrapper(getBeginAndEndYear, _schools),
  getBuildingForYear: getItemByIdWrapper(getBuildingForYear, _schools),
  getFetchingData,
  getLocationForYear: getItemByIdWrapper(getLocationForYear, _schools),
  getMainName: getItemByIdWrapper(getMainName, _schools),
  getSchoolDetails: getItemByIdWrapper(getSchoolDetails, _schools),
  getSchoolYearDetails: getItemByIdWrapper(getSchoolYearDetails, _schools),
  getSchoolsYearDetails,
  hasSchool
});

SchoolStore.dispatchToken = AppDispatcher.register(function(payload) {
  AppDispatcher.waitFor([
    BuildingStore.dispatchToken,
    PrincipalStore.dispatchToken
  ]);

  const action = payload.action;

  switch (action.type) {

    case ActionTypes.REQUEST_SCHOOL:
      _fetchingData = true;
      SchoolStore.emitChange();
      break;

    case ActionTypes.REQUEST_SCHOOL_SUCCESS:
      _fetchingData = false;
      _receiveSchools(action.response.entities);
      SchoolStore.emitChange();
      break;

    case ActionTypes.REQUEST_SEARCH_LOAD_MORE:
      SchoolStore.emitChange();
      break;

    case ActionTypes.REQUEST_SEARCH_SUCCESS:
      _receiveSchools(action.response.entities);
      SchoolStore.emitChange();
      break;

    default:
      // noop
  }
});

function getBeginAndEndYear(school) {
  const currentName = _.first(school.names);
  const oldestName = _.last(school.names);
  return {
    beginYear: oldestName ? oldestName.begin_year : null,
    endYear: currentName ? currentName.end_year : null
  };
}

function getBuildingForYear(school, year) {
  year = year || _getLatestYear(school);
  return getItemForYear(school.buildings, year) || {};
}

function getLocationForYear(school, year) {
  year = year || _getLatestYear(school);
  const building = getBuildingForYear(school, year);
  return BuildingStore.getLocationForYear(building.id, year);
}

function getFetchingData() {
  return _fetchingData;
}

function getMainName(school) {
  return _.first(school.names) || {};
}

function getSchoolDetails(school) {
  return {
    archives: school.archives,
    buildings: _getRelationalData(school.buildings, BuildingStore.getBuilding),
    fields: school.fields,
    genders: school.genders,
    languages: school.languages,
    names: school.names,
    principals: _getRelationalData(school.principals, PrincipalStore.getPrincipal),
    types: school.types
  };
}

function getSchoolYearDetails(school, year) {
  year = year || _getLatestYear(school);
  const schoolBuilding = getItemForYear(school.buildings, year);
  const building = (
    schoolBuilding ? _getRelationalObject(schoolBuilding, BuildingStore.getBuilding) : {}
  );
  const schoolPrincipal = getItemForYear(school.principals, year);
  const principal = (
    schoolPrincipal ? _getRelationalObject(schoolPrincipal, PrincipalStore.getPrincipal) : {}
  );
  return {
    address: _getMainAddress(building),
    id: school.id,
    archive: getItemForYear(school.archives, year) || {},
    building: building,
    principal: principal,
    name: getItemForYear(school.names, year) || {}
  };
}

function getSchoolsYearDetails(schoolIds, year) {
  return _.map(schoolIds, function(id) {
    return SchoolStore.getSchoolYearDetails(id, year);
  }, this);
}

function hasSchool(schoolId) {
  return typeof _schools[schoolId] !== 'undefined';
}

function _getLatestYear(school) {
  return getBeginAndEndYear(school).endYear || new Date().getFullYear();
}

function _getMainAddress(building) {
  if (building && building.addresses && building.addresses.length) {
    return getAddressString(building.addresses[0]);
  }
  return '';
}

function _getRelationalData(relationObjects, getter) {
  return _.map(relationObjects, function(relationObject) {
    return _getRelationalObject(relationObject, getter);
  });
}

function _getRelationalObject(relationObject, getter) {
  let object = getter(relationObject.id);
  return _.assign(object, relationObject);
}

function _parseRelationalData(relationObjects, relationIds, objectName) {
  let relationObject;
  return _.map(relationIds, function(id) {
    relationObject = relationObjects[id];
    relationObject.id = relationObject[objectName];
    delete relationObject[objectName];
    return relationObject;
  });
}

function _receiveSchools(entities) {
  _.each(entities.schools, function(school) {
    _schools[school.id] = {
      archives: sortByYears(school.archives),
      buildings: sortByYears(_parseRelationalData(
        entities.schoolBuildings,
        school.buildings,
        'building'
      )),
      fields: sortByYears(school.fields),
      genders: sortByYears(school.genders),
      id: school.id,
      languages: sortByYears(school.languages),
      names: sortByYears(school.names),
      principals: sortByYears(_parseRelationalData(
        entities.schoolPrincipals,
        school.principals,
        'principal'
      )),
      types: sortByYears(school.types)
    };
  });
}

export default SchoolStore;
