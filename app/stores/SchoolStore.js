'use strict';

import AppDispatcher from '../core/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';
let _schools = {};

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
    return schoolId === 999;
  }
});

SchoolStore.dispatchToken = AppDispatcher.register(function(payload) {
  const action = payload.action;

  switch(action.type) {

    case ActionTypes.REQUEST_SCHOOL_SUCCESS:
      _receiveSchool(action.response);
      SchoolStore.emitChange();
      break;

    default:
      // noop
  }
});

function _receiveSchool(school) {
  _schools[school.id] = school;
}

export default SchoolStore;
