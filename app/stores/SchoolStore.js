'use strict';

import _ from 'lodash';
import AppDispatcher from '../core/AppDispatcher';
import { enumerate } from '../core/utils';
import ActionTypes from '../constants/ActionTypes';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';
let _schools = {};


const schoolCheckDecorator = function(func, defaultValue) {
  return function(schoolId) {
    if (!defaultValue) {
      defaultValue = {};
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
  }
});

SchoolStore.dispatchToken = AppDispatcher.register(function(payload) {
  const action = payload.action;

  switch(action.type) {

    case ActionTypes.REQUEST_SCHOOL_SUCCESS:
      _receiveSchools(action.response);
      SchoolStore.emitChange();
      break;

    default:
      // noop
  }
});

function _receiveSchools(schools) {
  for (let [schoolId, school] of enumerate(schools)){
    _schools[schoolId] = school;
  }
}

export default SchoolStore;
