'use strict';

import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../core/AppDispatcher';
import BaseStore from './BaseStore';
import SchoolStore from './SchoolStore';

let _fetchingData = false;
let _filters = {
  type: null,
  field: null,
  language: null,
  gender: null
};
let _filtersOptions = {
  schoolType: [],
  schoolField: [],
  language: [],
  gender: [
    {
      id: 'tyttökoulu',
      name: 'tyttökoulu'
    },
    {
      id: 'poikakoulu',
      name: 'poikakoulu'
    },
    {
      id: 'tyttö- ja poikakoulu',
      name: 'tyttö- ja poikakoulu'
    }
  ]
};
let _nextPageUrl;
let _searchQuery = '';
let _searchResults = [];
let _selectedSchool;
let _view = 'grid';

const SearchStore = Object.assign({}, BaseStore, {
  getFetchingData,
  getFilters,
  getFiltersOptions,
  getNextPageUrl,
  getSearchQuery,
  getSearchResults,
  getSelectedSchool,
  getSomethingWasSearched,
  getView
});

SearchStore.dispatchToken = AppDispatcher.register(function(payload) {
  const action = payload.action;

  switch (action.type) {

    case ActionTypes.REQUEST_SEARCH:
      _fetchingData = true;
      _nextPageUrl = null;
      _searchResults = [];
      _searchQuery = action.query;
      _selectedSchool = null;
      SearchStore.emitChange();
      break;

    case ActionTypes.REQUEST_SEARCH_SUCCESS:
      AppDispatcher.waitFor([SchoolStore.dispatchToken]);
      _fetchingData = false;
      _receiveSearchResponse(action.response.entities.searchResponse);
      SearchStore.emitChange();
      break;

    case ActionTypes.REQUEST_SEARCH_LOAD_MORE:
      AppDispatcher.waitFor([SchoolStore.dispatchToken]);
      _fetchingData = true;
      SchoolStore.emitChange();
      break;

    case ActionTypes.SELECT_SEARCH_SCHOOL:
      _selectedSchool = action.school.id;
      SearchStore.emitChange();
      break;

    case ActionTypes.SELECT_SEARCH_VIEW:
      _selectedSchool = null;
      _view = action.view;
      SearchStore.emitChange();
      break;

    case ActionTypes.SELECT_SEARCH_FILTER:
      _applyFilter(action.filterKey, action.optionId);
      break;

    default:
      // noop
  }
});

function getFetchingData() {
  return _fetchingData;
}

function getFilters() {
  return _filters;
}

function getFiltersOptions() {
  return _filtersOptions;
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

function getSelectedSchool() {
  return _selectedSchool;
}

function getSomethingWasSearched() {
  return Boolean(_searchQuery || _searchResults.length || _fetchingData);
}

function getView() {
  return _view;
}
function _applyFilter(filterKey, optionId) {
  _filters[filterKey] = optionId;

}
function _receiveSearchResponse(searchResponse) {
  _nextPageUrl = searchResponse.next;
  _searchResults = _searchResults.concat(searchResponse.results);

}

export default SearchStore;
