'use strict';

import _ from 'lodash';
import AppDispatcher from '../core/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import BaseStore from './BaseStore';
import SchoolStore from './SchoolStore';
import {getItemByIdWrapper, sortByYears} from '../core/utils';
import {getAssociationData, parseAssociationData} from '../core/storeUtils';

let _fetchingData = false;
let _principals = {};

const PrincipalStore = Object.assign({}, BaseStore, {
  getFetchingData,
  getPrincipal: getItemByIdWrapper(getPrincipal, _principals),
  getPrincipalDetails: getItemByIdWrapper(getPrincipalDetails, _principals),
  getPrincipalSearchDetails,
  getSearchDetails: getItemByIdWrapper(getSearchDetails, _principals)
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
      _receivePrincipals(action.response.entities.principals);
      PrincipalStore.emitChange();
      break;

    case ActionTypes.REQUEST_SEARCH_SUCCESS:
      _receivePrincipals(action.response.entities);
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

function getPrincipalDetails(principal) {
  if (principal.employers) {
    return _.assign(
      {},
      principal,
      {schools: getAssociationData(
        principal.employers,
        SchoolStore.getSchoolDetails
      )}
    );
  }
  return principal;
}


function getSearchDetails(principal) {
  return _.map(principal.employers, function(employer) {
    const years = SchoolStore.getNameYearsInPeriod(
      employer.id,
      employer.beginYear,
      employer.endYear
    );
    return _.map(years, function(year) {
      return SchoolStore.getSchoolYearDetails(employer.id, year);
    });
  });
}

function getPrincipalSearchDetails(principalIds) {
  let searchDetails = [];
  _.each(principalIds, function(principalId) {
    const principal = _principals[principalId];
    if (_.isEmpty(principal)) {
      return;
    }

    _.each(principal.employers, function(employment) {
      const schoolPrincipal = {
        beginYear: employment.beginYear,
        endYear: employment.endYear,
        id: principalId,
        name: principal.name
      };
      const results = SchoolStore.getSearchResultsForPrincipal(employment.id, schoolPrincipal);
      searchDetails = searchDetails.concat(results);
    });
  });
  return _.uniq(_.sortBy(searchDetails, 'id'), true, 'id');
}

function _receivePrincipals(entities) {
  _.each(entities.principals, function(principal) {
    let _principal = _principals[principal.id];
    if (!_principal) {
      _principal = {
        employers: []
      };
    }
    let associatedData = {};
    if (principal.employers && principal.employers.length) {
      associatedData.employers = sortByYears(parseAssociationData(
          entities.employer,
          principal.employers,
          'school'
      ));
    }
    _.assign(
      _principal,
      {
        firstName: principal.firstName,
        id: principal.id,
        name: principal.firstName + ' ' + principal.surname,
        surname: principal.surname
      },
      associatedData
    );
    _principals[principal.id] = _principal;
  });
}

export default PrincipalStore;
