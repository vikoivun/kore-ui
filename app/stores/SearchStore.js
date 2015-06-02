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
let _filtersOptionsRequested = {
  schoolType: false,
  schoolField: false,
  language: false
};
let _nextPageUrl;
let _searchQuery = '';
let _searchResults = [];
let _selectedSchool;
let _view = 'grid';
let _years = [null, null];

const SearchStore = Object.assign({}, BaseStore, {
  getFetchingData,
  getFilters,
  getFiltersOptions,
  getFilterOptionsRequested,
  getNextPageUrl,
  getSearchQuery,
  getSearchResults,
  getSelectedSchool,
  getSomethingWasSearched,
  getView,
  getYears
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

    case ActionTypes.REQUEST_FILTER_OPTIONS:
      _filtersOptionsRequested[action.resource] = true;
      break;

    case ActionTypes.REQUEST_SEARCH_FILTER_SUCCESS:
      _fetchingData = false;
      _receiveFilterResponse(action.response.results, action.resource);
      SearchStore.emitChange();
      break;

    case ActionTypes.SELECT_SEARCH_TIMELINE_YEAR:
      _selectYears(action.years);
      SearchStore.emitChange();
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

function getFilterOptionsRequested(filter) {
  return _filtersOptionsRequested[filter];
}

function _applyFilter(filterKey, optionId) {
  const optionsToFilter = {
    'schoolField': 'field',
    'schoolType': 'type',
    'language': 'language',
    'gender': 'gender'
  };
  _filters[optionsToFilter[filterKey]] = optionId;

}

function getYears() {
  return _years;
}

function _receiveSearchResponse(searchResponse) {
  _nextPageUrl = searchResponse.next;
  _searchResults = _searchResults.concat(searchResponse.results);
}

function _receiveFilterResponse(responseResults, resource) {
  _filtersOptions[resource] = responseResults;
}

function _selectYears(years) {
  _years = years;
}

export default SearchStore;
