'use strict';

import _ from 'lodash';
import AppDispatcher from '../core/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import BaseStore from './BaseStore';

let _fetchingData = false;
let _principals = {};

const PrincipalStore = Object.assign({}, BaseStore, {
  getFetchingData,
  getPrincipal: _getPrincipalByIdWrapper(getPrincipal, {})
});

PrincipalStore.dispatchToken = AppDispatcher.register(function(payload) {
  const action = payload.action;

  switch (action.type) {

    case ActionTypes.REQUEST_SCHOOL:
      _fetchingData = true;
      PrincipalStore.emitChange();
      break;

    case ActionTypes.REQUEST_SCHOOL_SUCCESS:
    _fetchingData = false;
      _receivePrincipalsFromSchool(action.response);
      PrincipalStore.emitChange();
      break;

    case ActionTypes.REQUEST_SEARCH_SUCCESS:
      _receivePrincipalsFromSchools(action.response.results);
      PrincipalStore.emitChange();
      break;

    default:
      // noop
  }
});

function getFetchingData() {
  return _fetchingData;
}

function getPrincipal(principal) {
  return principal;
}

function _getPrincipalByIdWrapper(func, defaultValue) {
  return function(principalId) {
    defaultValue = defaultValue ? defaultValue : [];
    const principal = _principals[principalId];
    return _.isEmpty(principal) ? defaultValue : func(principal);
  };
}

function _receivePrincipalsFromSchool(school) {
  const principals = _.pluck(school.principals, 'principal');
  _.each(principals, function(principal) {
    _principals[principal.id] = {
      employers: principal.employers,
      firstName: principal.first_name,
      id: principal.id,
      name: principal.first_name + ' ' + principal.surname,
      surname: principal.surname
    };
  });
}

function _receivePrincipalsFromSchools(schools) {
  _.each(schools, _receivePrincipalsFromSchool);
}

export default PrincipalStore;
