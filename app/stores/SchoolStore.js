'use strict';

import _ from 'lodash';
import AppDispatcher from '../core/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import BaseStore from './BaseStore';
import PrincipalStore from './PrincipalStore';

let _schools = {};
let _fetchingData = false;

const SchoolStore = Object.assign({}, BaseStore, {
  getBeginAndEndYear: _getSchoolByIdWrapper(getBeginAndEndYear, {}),
  getFetchingData,
  getMainBuilding: _getSchoolByIdWrapper(getMainBuilding, {}),
  getMainBuildingInYear: _getSchoolByIdWrapper(getMainBuildingInYear, {}),
  getMainName: _getSchoolByIdWrapper(getMainName, {}),
  getSchoolDetails: _getSchoolByIdWrapper(getSchoolDetails, {}),
  getSchoolYearDetails: _getSchoolByIdWrapper(getSchoolYearDetails, {}),
  getSchools,
  hasSchool
});

SchoolStore.dispatchToken = AppDispatcher.register(function(payload) {
  AppDispatcher.waitFor([
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
      _receiveSchool(action.response);
      SchoolStore.emitChange();
      break;

    case ActionTypes.REQUEST_SEARCH_LOAD_MORE:
      SchoolStore.emitChange();
      break;

    case ActionTypes.REQUEST_SEARCH_SUCCESS:
      _receiveSchools(action.response.results);
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

function getFetchingData() {
  return _fetchingData;
}

function getMainBuilding(school) {
  return _.first(school.buildings) || {};
}


function getMainBuildingInYear(school, year) {
  if (!year) {
    return getMainBuilding(school);
  }
  return _getItemForYear(school, 'buildings', year) || {};
}

function getMainName(school) {
  return _.first(school.names) || {};
}

function getSchoolDetails(school) {
  return {
    archives: school.archives,
    buildings: school.buildings,
    fields: school.fields,
    genders: school.genders,
    languages: school.languages,
    names: school.names,
    principals: _getPrincipals(school),
    types: school.types
  };
}

function getSchools(schoolIds) {
  return _.map(schoolIds, function(id) {
    const school = _schools[id];
    if (_.isEmpty(school)) {
      return {};
    }
    let addresses = [];
    const mainBuilding = getMainBuilding(school);
    if (mainBuilding.building && mainBuilding.building.addresses) {
      addresses = mainBuilding.building.addresses;
    }
    const address = (
      addresses.length ?
      `${addresses[0].street_name_fi}\, ${addresses[0].municipality_fi}` :
      ''
    );
    return {
      id: id,
      name: getMainName(school).official_name,
      address: address
    };
  }, this);
}

function getSchoolYearDetails(school, year) {
  year = year || new Date().getFullYear();

  return {
    schoolName: _getItemForYear(school, 'names', year) || {},
    building: _getItemForYear(school, 'buildings', year) || {},
    archive: _getItemForYear(school, 'archives', year) || {}
  };
}

function hasSchool(schoolId) {
  return typeof _schools[schoolId] !== 'undefined';
}

function _getItemForYear(school, itemListName, year) {
  return _.find(school[itemListName], function(item) {
    return item.begin_year <= year;
  });
}

function _getPrincipals(school) {
  return _.map(school.principals, function(principalRelation) {
    const principal = PrincipalStore.getPrincipal(principalRelation.id);
    return _.assign(principal, {
      'begin_year': principalRelation.begin_year,
      'end_year': principalRelation.end_year
    });
  });
}

function _getSchoolByIdWrapper(func, defaultValue) {
  return function(schoolId) {
    defaultValue = defaultValue ? defaultValue : [];
    const school = _schools[schoolId];
    let newArgs = Array.prototype.slice.call(arguments, 1);
    newArgs.unshift(school);
    return _.isEmpty(school) ? defaultValue : func.apply(this, newArgs);
  };
}

function _parsePrincipals(principals) {
  return _.map(principals, function(principal) {
    return {
      'begin_year': principal.begin_year,
      'end_year': principal.endYear,
      id: principal.principal.id
    };
  });
}

function _receiveSchool(school) {
  _schools[school.id] = {
    archives: _sortByYears(school.archives),
    buildings: _sortByYears(school.buildings),
    fields: _sortByYears(school.fields),
    genders: _sortByYears(school.genders),
    id: school.id,
    languages: _sortByYears(school.languages),
    names: _sortByYears(school.names),
    principals: _sortByYears(_parsePrincipals(school.principals)),
    types: _sortByYears(school.types)
  };
}

function _receiveSchools(schools) {
  _.each(schools, _receiveSchool);
}

function _sortByYears(list) {
  return _.sortByOrder(list, ['end_year', 'begin_year'], [false, false]);
}

export default SchoolStore;
