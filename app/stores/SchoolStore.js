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

  getMainName: schoolCheckDecorator(function(school){
      return school.names[0];
  }),

  getMainBuilding: schoolCheckDecorator(function(school){
      return school.buildings[0];
  }),

  getSchoolNames: schoolCheckDecorator(function(school){
      return school.names;
  }, []),

  getBuildings: schoolCheckDecorator(function(school){
    return school.buildings;
  }, []),

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
