

import AppDispatcher from '../core/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import SchoolAPI from '../api/SchoolAPI';
import SchoolStore from '../stores/SchoolStore';

export default {

  requestSchool(schoolId) {
    if (SchoolStore.hasSchool()) {
      return;
    }

    AppDispatcher.handleViewAction({
      type: ActionTypes.REQUEST_SCHOOL,
    });

    SchoolAPI.requestSchool(schoolId);
  },
};
