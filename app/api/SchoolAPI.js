'use strict';

import SchoolServerActionCreators from '../actions/SchoolServerActionCreators';
import SearchServerActionCreators from '../actions/SearchServerActionCreators';
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
          SchoolServerActionCreators.handleSchoolSuccess(response.body);
        } else {
          SchoolServerActionCreators.handleSchoolError(response.text);
        }
      });
  },

  searchSchool(query) {
    request
      .get(buildAPIURL('school/'))
      .query('search=' + query)
      .query(APIARGS)
      .end(function(error, response) {
        if (response.ok) {
          SearchServerActionCreators.handleSearchSuccess(response.body);
        } else {
          SearchServerActionCreators.handleSearchError(response.text);
        }
      });
  },

  searchLoadMore(url) {
    request
      .get(url)
      .end(function(error, response) {
        if (response.ok) {
          SearchServerActionCreators.handleSearchSuccess(response.body);
        } else {
          SearchServerActionCreators.handleSearchError(response.text);
        }
      });
  }
};
