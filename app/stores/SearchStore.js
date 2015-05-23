'use strict';

import AppDispatcher from '../core/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import BaseStore from './BaseStore';
import SchoolStore from './SchoolStore';

let _fetchingData = false;
let _searchQuery = '';
let _searchResults = [];
let _nextPageUrl;

const SearchStore = Object.assign({}, BaseStore, {
  getFetchingData,
  getNextPageUrl,
  getSearchQuery,
  getSearchResults
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

function getFetchingData() {
  return _fetchingData;
}

function getNextPageUrl() {
  return _nextPageUrl;
}

function getSearchQuery() {
  return _searchQuery;
}

function getSearchResults() {
  return _searchResults;
}

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
