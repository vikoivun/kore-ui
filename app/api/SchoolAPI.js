'use strict';

import SchoolServerActionCreators from '../actions/SchoolServerActionCreators';
import SearchServerActionCreators from '../actions/SearchServerActionCreators';
import request from 'superagent';

const APIROOT = 'http://kore.hel.ninja/v1/';
const APIARGS = {'format': 'json'};

function buildAPIURL(resource) {
  return encodeURI(APIROOT + resource);
}

function getIdFromSchool(school) {
  let splitURL = school.url.split('/');
  return splitURL[splitURL.length - 2];
}

export default {
  requestSchool(schoolId) {
    request
    .get(buildAPIURL('school/' + schoolId))
    .query(APIARGS)
    .end(function(error, response) {
      if (response.ok) {
        response.body.id = getIdFromSchool(response.body);
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
        let results = response.body.results;
        results.map(function(school) {
          school.id = getIdFromSchool(school);
        });
        SearchServerActionCreators.handleSearchSuccess(response.body);
      } else {
        SearchServerActionCreators.handleSearchError(response.text);
      }
    });
  }
};
