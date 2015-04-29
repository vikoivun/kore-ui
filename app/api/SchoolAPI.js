'use strict';

import SchoolServerActionCreators from '../actions/SchoolServerActionCreators';
import request from 'superagent';

const APIROOT = 'http://kore.hel.ninja/v1/';
const APIARGS = {'format': 'json'};

function buildAPIURL(resource) {
  return encodeURI(APIROOT + resource);
}

export default {
  requestSchool(schoolId) {
    request
    .get(buildAPIURL('school/' + schoolId))
    .query(APIARGS)
    .end(function(error, response) {
      if (response.ok) {
        SchoolServerActionCreators.handleSchoolSuccess({
          [schoolId]: response.body
        });
      }
      else {
        SchoolServerActionCreators.handleSchoolError(response.text);
      }
    });
  }
};
