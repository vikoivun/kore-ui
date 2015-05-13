'use strict';

import AppDispatcher from '../core/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import SchoolAPI from '../api/SchoolAPI';
import SchoolStore from '../stores/SchoolStore';

export default {

  requestSearch(query) {
    if (SchoolStore.hasSchool()) {
      return;
    }

    AppDispatcher.handleViewAction({
      type: ActionTypes.REQUEST_SEARCH
    });

    SchoolAPI.searchSchool(query);
  }
};
