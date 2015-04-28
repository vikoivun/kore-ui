'use strict';

import SchoolServerActionCreators from '../actions/SchoolServerActionCreators';

function getSchoolMockData(shcoolId) {
  return {
    id: shcoolId,
    name: 'Massachusetts Institute of Technology'
  };
}

export default {
  requestSchool(schoolId) {
    // Do the actual api call here.
    const response = getSchoolMockData(schoolId);
    SchoolServerActionCreators.handleSchoolSuccess(response);
  }
};
