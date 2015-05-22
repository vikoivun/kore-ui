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
  }
};
