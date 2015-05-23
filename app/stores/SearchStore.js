'use strict';

import AppDispatcher from '../core/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import SchoolStore from './SchoolStore';
import {EventEmitter} from 'events';

const CHANGE_EVENT = 'change';
let _fetchingData = false;
let _searchQuery = '';
let _searchResults = [];
let _nextPageUrl;

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

  getFetchingData: function() {
    return _fetchingData;
  },

  getSearchQuery: function() {
    return _searchQuery;
  },

  getSearchResults: function() {
    return _searchResults;
  },

  getNextPageUrl: function() {
    return _nextPageUrl;
  }
});

SearchStore.dispatchToken = AppDispatcher.register(function(payload) {
  const action = payload.action;

  switch (action.type) {

    case ActionTypes.REQUEST_SEARCH:
      _fetchingData = true;
      _searchResults = [];
      _nextPageUrl = null;
      _searchQuery = action.query;
      SearchStore.emitChange();
      break;

    case ActionTypes.REQUEST_SEARCH_SUCCESS:
      AppDispatcher.waitFor([SchoolStore.dispatchToken]);
      _fetchingData = false;
      _receiveSearchResponse(action.response);
      SearchStore.emitChange();
      break;


    case ActionTypes.REQUEST_SEARCH_LOAD_MORE:
      AppDispatcher.waitFor([SchoolStore.dispatchToken]);
      _fetchingData = true;
      SchoolStore.emitChange();
      break;

    default:
      // noop
  }
});

function _receiveSearchResults(schools) {
  let incomingResults = schools.map(function(school) {
    return school.id;
  });
  _searchResults = _searchResults.concat(incomingResults);
}

function _receiveSearchResponse(response) {
  _nextPageUrl = response.next;
  _receiveSearchResults(response.results);
}

export default SearchStore;
