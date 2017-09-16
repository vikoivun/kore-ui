import AppDispatcher from '../core/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

export default {

  updateYear(year) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.UPDATE_SCHOOL_TIMELINE_YEAR,
      year,
    });
  },

  resetYear() {
    AppDispatcher.handleViewAction({
      type: ActionTypes.RESET_SCHOOL_TIMELINE_YEAR,
    });
  },
};
