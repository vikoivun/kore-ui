'use strict';

import AppDispatcher from '../core/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import {EventEmitter} from 'events';

const CHANGE_EVENT = 'change';
let _schoolTimelineYear = null;


const UIStore = Object.assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getSchoolTimelineYear: function() {
    return _schoolTimelineYear;
  }
});

UIStore.dispatchToken = AppDispatcher.register(function(payload) {
  const action = payload.action;

  switch (action.type) {

    case ActionTypes.UPDATE_SCHOOL_TIMELINE_YEAR:
      _updateYear(action.year);
      UIStore.emitChange();
      break;

    case ActionTypes.RESET_SCHOOL_TIMELINE_YEAR:
      _updateYear(null);
      UIStore.emitChange();
      break;

    default:
      // noop
  }
});

function _updateYear(year) {
  _schoolTimelineYear = year;
}

export default UIStore;
