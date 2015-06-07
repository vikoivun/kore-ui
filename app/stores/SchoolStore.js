'use strict';

import _ from 'lodash';
import Fuse from 'fuse.js';

import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../core/AppDispatcher';
import {
  getAssociationData,
  getAssociationObject,
  parseAssociationData
} from '../core/storeUtils';
import {
  getAddressString,
  getItemByIdWrapper,
  getItemForYear,
  getItemsForYear,
  inBetween,
  sortByYears
} from '../core/utils';
import BaseStore from './BaseStore';
import BuildingStore from './BuildingStore';
import PrincipalStore from './PrincipalStore';
import SchoolBuildingStore from './SchoolBuildingStore';

let _schools = {};
let _fetchingData = false;

const SchoolStore = Object.assign({}, BaseStore, {
  getBeginAndEndYear: getItemByIdWrapper(getBeginAndEndYear, _schools),
  getBuildingForYear: getItemByIdWrapper(getBuildingForYear, _schools),
  getFetchingData,
  getLocationsForYear: getItemByIdWrapper(getLocationsForYear, _schools),
  getNameInSelectedYear: getItemByIdWrapper(getNameInSelectedYear, _schools),
  getSchool: getItemByIdWrapper(getSchool, _schools),
  getSchoolDetails: getItemByIdWrapper(getSchoolDetails, _schools),
  getSchoolYearDetails: getItemByIdWrapper(getSchoolYearDetails, _schools),
  getSchoolsYearDetails,
  getSearchDetails,
  getSearchDetailsForItem,
  hasSchool
});

SchoolStore.dispatchToken = AppDispatcher.register(function(payload) {
  AppDispatcher.waitFor([
    BuildingStore.dispatchToken,
    PrincipalStore.dispatchToken,
    SchoolBuildingStore.dispatchToken
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

function getFetchingData() {
  return _fetchingData;
}

function getLocationsForYear(school, year) {
  year = year || _getLatestYear(school);
  const buildings = getItemsForYear(school.buildings, year);
  return BuildingStore.getLocationsForYear(_.pluck(buildings, 'id'), year);
}

function getNameInSelectedYear(school, year) {
  year = year || _getLatestYear(school);
  return getItemForYear(school.names, year) || {};
}

function getSchool(school) {
  return school;
}

function getSchoolDetails(school, selectedYear) {
  selectedYear = selectedYear || _getLatestYear(school);
  return {
    archives: school.archives,
    buildings: getAssociationData(school.buildings, BuildingStore.getBuilding),
    fields: school.fields,
    genders: school.genders,
    languages: school.languages,
    names: school.names,
    principals: getAssociationData(school.principals, PrincipalStore.getPrincipal),
    selectedYear: selectedYear,
    types: school.types
  };
}

function getSchoolsYearDetails(schoolIds, year) {
  return _.map(schoolIds, function(id) {
    return SchoolStore.getSchoolYearDetails(id, year);
  }, this);
}

function getSchoolYearDetails(school, year) {
  year = year || _getLatestYear(school);
  const schoolBuilding = getItemForYear(school.buildings, year);
  const building = (
    schoolBuilding ? getAssociationObject(schoolBuilding, BuildingStore.getBuilding) : {}
  );
  const schoolPrincipal = getItemForYear(school.principals, year);
  const principal = (
    schoolPrincipal ? getAssociationObject(schoolPrincipal, PrincipalStore.getPrincipal) : {}
  );
  const address = getItemForYear(building.addresses, year);
  return {
    address: getAddressString(address),
    archive: getItemForYear(school.archives, year) || {},
    building: building,
    gender: getItemForYear(school.genders, year) || {},
    id: school.id,
    language: getItemForYear(school.languages, year) || {},
    location: _.first(getLocationsForYear(school, year)) || {},
    name: getItemForYear(school.names, year) || {},
    principal: principal,
    type: getItemForYear(school.types, year) || {}
  };
}

function getSearchDetails(schoolIds, query) {
  let searchDetails = [];
  _.each(schoolIds, function(schoolId) {
    const school = _schools[schoolId];
    if (_.isEmpty(school)) {
      return;
    }

    let nameSearchIndex = new Fuse(
      school.names,
      {keys: ['officialName']}
    );
    const names = nameSearchIndex.search(query);

    _.each(names, function(name) {
      searchDetails.push(
        {
          beginYear: name.beginYear,
          endYear: name.endYear,
          id: school.id + '-' + name.id,
          name: name.officialName,
          schoolId: school.id,
          type: 'school-name'
        }
      );
    });
  });
  return _.sortBy(searchDetails, 'id');
}

function getSearchDetailsForItem(schoolId, item) {
  let searchDetails = [];
  const school = _schools[schoolId];
  if (_.isEmpty(school)) {
    return [];
  }

  const names = _getNamesForTimeSpan(school, item.beginYear, item.endYear);
  _.each(_.sortBy(names, 'beginYear'), function(name, index) {
    const beginYear = index === 0 ? item.beginYear || name.beginYear : name.beginYear;
    const endYear = index === name.length - 1 ? item.endYear || name.endYear : name.endYear;
    searchDetails.push(
      {
        beginYear: beginYear,
        endYear: endYear,
        id: school.id + '-' + name.id + '-' + item.id,
        name: name.officialName,
        extraInfo: item.extraInfo,
        schoolId: school.id,
        type: item.type
      }
    );
  });
  return searchDetails;
}

function hasSchool(schoolId) {
  return typeof _schools[schoolId] !== 'undefined';
}

function _getLatestYear(school) {
  return getBeginAndEndYear(school).endYear || new Date().getFullYear();
}

function _getNamesForTimeSpan(school, beginYear, endYear) {
  return _.filter(school.names, function(name) {
    return inBetween(name.beginYear, beginYear, endYear, true);
  });
}

function _receiveSchools(entities) {
  _.each(entities.schools, function(school) {
    let _school = _schools[school.id];
    if (!_school) {
      _school = {
        buildings: [],
        principals: []
      };
    }
    let associatedData = {};
    if (school.buildings && school.buildings.length) {
      associatedData.buildings = sortByYears(parseAssociationData(
        entities.schoolBuildings,
        school.buildings,
        'building'
      ));
    }
    if (school.principals && school.principals.length) {
      associatedData.principals = sortByYears(parseAssociationData(
        entities.schoolPrincipals,
        school.principals,
        'principal'
      ));
    }
    _.assign(
      _school,
      {
        archives: sortByYears(school.archives),
        fields: sortByYears(school.fields),
        genders: sortByYears(school.genders),
        id: school.id,
        languages: sortByYears(school.languages),
        names: sortByYears(school.names),
        types: sortByYears(school.types)
      },
      associatedData
    );
    _schools[school.id] = _school;
  });
}

export default SchoolStore;
