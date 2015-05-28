'use strict';

import AppDispatcher from '../core/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import SchoolAPI from '../api/SchoolAPI';

export default {

  requestSearch(query) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.REQUEST_SEARCH,
      query
    });

    SchoolAPI.searchSchool(query);
  },

  requestLoadMore(url) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.REQUEST_SEARCH_LOAD_MORE
    });

    SchoolAPI.searchLoadMore(url);
  },

  selectSchool(school) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.SELECT_SEARCH_SCHOOL,
      school
    });
  },

  selectView(view) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.SELECT_SEARCH_VIEW,
      view
    });
  },

  selectFilter(filterKey, optionId) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.SELECT_SEARCH_FILTER,
      filterKey,
      optionId
    });
  }
};
