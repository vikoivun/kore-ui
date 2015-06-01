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
  getLocationsForYear: getItemByIdWrapper(getLocationsForYear, _schools),
  getNameInSelectedYear: getItemByIdWrapper(getNameInSelectedYear, _schools),
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
    beginYear: oldestName ? oldestName.beginYear : null,
    endYear: currentName ? currentName.endYear : null
  };
}

function getBuildingForYear(school, year) {
  year = year || _getLatestYear(school);
  return getItemForYear(school.buildings, year) || {};
}

function getLocationsForYear(school, year) {
  year = year || _getLatestYear(school);
  const building = getBuildingForYear(school, year);
  return [BuildingStore.getLocationForYear(building.id, year)];
}

function getFetchingData() {
  return _fetchingData;
}

function getNameInSelectedYear(school, year) {
  year = year || _getLatestYear(school);
  return getItemForYear(school.names, year) || {};
}

function getSchoolDetails(school) {
  return {
    archives: school.archives,
    buildings: _getAssociationData(school.buildings, BuildingStore.getBuilding),
    fields: school.fields,
    genders: school.genders,
    languages: school.languages,
    names: school.names,
    principals: _getAssociationData(school.principals, PrincipalStore.getPrincipal),
    types: school.types
  };
}

function getSchoolYearDetails(school, year) {
  year = year || _getLatestYear(school);
  const schoolBuilding = getItemForYear(school.buildings, year);
  const building = (
    schoolBuilding ? _getAssociationObject(schoolBuilding, BuildingStore.getBuilding) : {}
  );
  const schoolPrincipal = getItemForYear(school.principals, year);
  const principal = (
    schoolPrincipal ? _getAssociationObject(schoolPrincipal, PrincipalStore.getPrincipal) : {}
  );
  return {
    address: _getMainAddress(building),
    archive: getItemForYear(school.archives, year) || {},
    building: building,
    id: school.id,
    location: getLocationsForYear(school, year),
    name: getItemForYear(school.names, year) || {},
    principal: principal
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

function _getAssociationData(associationObjects, getter) {
  return _.map(associationObjects, function(associationObject) {
    return _getAssociationObject(associationObject, getter);
  });
}

function _getAssociationObject(associationObject, getter) {
  let object = getter(associationObject.id);
  return _.assign(object, associationObject);
}

function _parseAssociationData(associationObjects, associationIds, objectName) {
  let associationObject;
  return _.map(associationIds, function(id) {
    associationObject = associationObjects[id];
    associationObject.id = associationObject[objectName];
    delete associationObject[objectName];
    return associationObject;
  });
}

function _receiveSchools(entities) {
  _.each(entities.schools, function(school) {
    _schools[school.id] = {
      archives: sortByYears(school.archives),
      buildings: sortByYears(_parseAssociationData(
        entities.schoolBuildings,
        school.buildings,
        'building'
      )),
      fields: sortByYears(school.fields),
      genders: sortByYears(school.genders),
      id: school.id,
      languages: sortByYears(school.languages),
      names: sortByYears(school.names),
      principals: sortByYears(_parseAssociationData(
        entities.schoolPrincipals,
        school.principals,
        'principal'
      )),
      types: sortByYears(school.types)
    };
  });
}

export default SchoolStore;
