'use strict';

import request from 'superagent';

import SearchServerActionCreators from '../actions/SearchServerActionCreators';
import {API_ROOT, API_ARGS} from '../constants/AppConstants';
import {decamelize} from 'humps';

function buildAPIURL(resource) {
  return encodeURI(API_ROOT + resource);
}

export default {
  requestFilter(resource) {
    request
      .get(buildAPIURL(decamelize(resource)))
      .query(API_ARGS)
      .end(function(error, response) {
        if (response.ok) {
          SearchServerActionCreators.handleFilterSuccess(
            response.body,
            resource
          );
        } else {
          SearchServerActionCreators.handleFilterError(response.text);
        }
      });
  }
};
