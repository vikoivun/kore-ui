'use strict';

import _ from 'lodash';
import AppDispatcher from '../core/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';
let _schools = {};


const getSchoolByIdWrapper = function(func, defaultValue) {
  return function(schoolId) {
    if (!defaultValue) {
      defaultValue = [];
    }
    const school = this.getSchool(schoolId);
    if (_.isEmpty(school)) {
      return defaultValue;
    }
    return func(school);
  };
};


const SchoolStore = Object.assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getSchool: function(schoolId) {
    return _schools[schoolId] || {};
  },

  hasSchool: function(schoolId) {
    return _schools[schoolId] !== undefined;
  },

  getMainName: function(schoolId){
      let sortedSchoolNames = this.getSchoolNames(schoolId);
      if (sortedSchoolNames.length) {
        return sortedSchoolNames[0];
      }
      return {};
  },

  getMainBuilding: function(schoolId){
      let sortedBuildings = this.getBuildings(schoolId);
      if (sortedBuildings.length) {
        return sortedBuildings[0];
      }
      return {};
  },

  getSchoolNames: getSchoolByIdWrapper(function(school){
      return _.sortBy(school.names, function(name){
        return -name.begin_year;
      });
  }),

  getBuildings: getSchoolByIdWrapper(function(school){
      return _.sortBy(school.buildings, function(building){
        return -building.begin_year;
      });
  }),

  getSchoolDetails: function(schoolId) {
    return {
      schoolNames: this.getSchoolNames(schoolId),
      buildings: this.getBuildings(schoolId)
    };
  },

  getSchoolYearDetails: function(schoolId, year) {
    const schoolNames = this.getSchoolNames(schoolId);
    const buildings = this.getBuildings(schoolId);
    if (!year) {
      year = new Date().getFullYear();
    }
    const schoolName = _.find(schoolNames, function(school){
      return school.begin_year <= year;
    });
    const building = _.find(buildings, function(build){
      return build.begin_year <= year;
    });
    return {
      schoolName: schoolName || {},
      building: building || {}
    };
  },

  calculateBeginAndEndYear: function(schoolId) {
    let sortedNames = this.getSchoolNames(schoolId);
    let beginYear, endYear;
    if (sortedNames.length) {
      beginYear = sortedNames[sortedNames.length - 1].begin_year;
      endYear = sortedNames[0].end_year;
    }
    return {
      beginYear: beginYear,
      endYear: endYear
    };
  }
});

SchoolStore.dispatchToken = AppDispatcher.register(function(payload) {
  const action = payload.action;

  switch(action.type) {

    case ActionTypes.REQUEST_SCHOOL_SUCCESS:
      _receiveSchool(action.response);
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

function _receiveSchool(school) {
    _schools[school.id] = school;
}

function _receiveSchools(schools) {
  _.each(schools, _receiveSchool);
}

export default SchoolStore;
