import _ from 'lodash';
import request from 'superagent';

import SearchServerActionCreators from '../actions/SearchServerActionCreators';
import { API_ROOT, API_ARGS } from '../constants/AppConstants';
import { decamelize, decamelizeKeys } from 'humps';
import { normalizeSearchResponse } from '../core/APIUtils';

function buildAPIURL(resource) {
  return encodeURI(API_ROOT + resource);
}

function searchRequest(endPoint, query, filters, resultContent) {
  request
    .get(buildAPIURL(endPoint))
    .query({ search: query })
    .query(decamelizeKeys(filters))
    .query(API_ARGS)
    .end((error, response) => {
      if (response.ok) {
        SearchServerActionCreators.handleSearchSuccess(
          normalizeSearchResponse(response.body, resultContent),
          resultContent
        );
      } else {
        SearchServerActionCreators.handleSearchError(response.text);
      }
    });
}

function searchLoadMore(url, resultContent) {
  request
    .get(url)
    .end((error, response) => {
      if (response.ok) {
        SearchServerActionCreators.handleSearchSuccess(
          normalizeSearchResponse(response.body, resultContent),
          resultContent
        );
      } else {
        SearchServerActionCreators.handleSearchError(response.text);
      }
    });
}

export default {
  requestFilter(resource) {
    request
      .get(buildAPIURL(decamelize(resource)))
      .query(API_ARGS)
      .end((error, response) => {
        if (response.ok) {
          SearchServerActionCreators.handleFilterSuccess(
            response.body,
            resource
          );
        } else {
          SearchServerActionCreators.handleFilterError(response.text);
        }
      });
  },

  searchLoadMore(urls) {
    _.each(urls, searchLoadMore);
  },

  searchBuilding(query, filters) {
    const schoolFilters = {};
    _.each(filters, (value, key) => {
      schoolFilters[`school_${key}`] = value;
    });
    searchRequest('school_building/', query, schoolFilters, 'buildings');
  },

  searchPrincipal(query, filters) {
    const schoolFilters = {};
    _.each(filters, (value, key) => {
      schoolFilters[`school_${key}`] = value;
    });
    searchRequest('employership/', query, schoolFilters, 'employerships');
  },

  searchSchool(query, filters) {
    searchRequest('school/', query, filters, 'schools');
  },
};
