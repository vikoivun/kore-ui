'use strict';

import AppDispatcher from '../core/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

export default {
  handleSearchSuccess(response) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.REQUEST_SEARCH_SUCCESS,
      response
    });
  },

  handleSearchError(error) {
    console.log(error);

    AppDispatcher.handleServerAction({
      type: ActionTypes.REQUEST_SEARCH_ERROR
    });
  },

  handleFilterSuccess(response, resource) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.REQUEST_SEARCH_FILTER_SUCCESS,
      response,
      resource
    });
  },

  handleFilterError(error) {
    console.log(error);

    AppDispatcher.handleServerAction({
      type: ActionTypes.REQUEST_SEARCH_FILTER_ERROR
    });
  }
};
