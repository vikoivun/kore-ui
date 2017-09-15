

import AppDispatcher from '../core/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

export default {
  handleSchoolSuccess(response) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.REQUEST_SCHOOL_SUCCESS,
      response,
    });
  },

  handleSchoolError(error) {
    console.log(error);

    AppDispatcher.handleServerAction({
      type: ActionTypes.REQUEST_SCHOOL_ERROR,
    });
  },
};
