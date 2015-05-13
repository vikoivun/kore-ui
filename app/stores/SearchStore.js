'use strict';

import AppDispatcher from '../core/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';
let _searchResults = [];


const SearchStore = Object.assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getSearchResults: function() {
    return _searchResults;
  }
});

SearchStore.dispatchToken = AppDispatcher.register(function(payload) {
  const action = payload.action;

  switch(action.type) {

    case ActionTypes.REQUEST_SEARCH_SUCCESS:
      _receiveSearchResults(action.response.results);
      SearchStore.emitChange();
      break;

    default:
      // noop
  }
});

function _receiveSearchResults(schools) {

  _searchResults = schools.map(function(school){
    return school.id;
  });
}

export default SearchStore;
