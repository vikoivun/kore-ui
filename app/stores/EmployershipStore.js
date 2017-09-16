import _ from 'lodash';

import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../core/AppDispatcher';
import { getItemByIdWrapper } from '../core/utils';
import BaseStore from './BaseStore';
import PrincipalStore from './PrincipalStore';
import SchoolStore from './SchoolStore';

const _employerships = {};

const EmployershipStore = Object.assign({}, BaseStore, {
  getEmployership: getItemByIdWrapper(getEmployership, _employerships),
  getSearchDetails,
});

EmployershipStore.dispatchToken = AppDispatcher.register((payload) => {
  const action = payload.action;

  switch (action.type) {
    case ActionTypes.REQUEST_SEARCH_SUCCESS:
      _receiveEmployerships(action.response.entities.employerships);
      EmployershipStore.emitChange();
      break;

    default:
      // noop
  }
});

function getEmployership(employership) {
  return employership;
}

function getSearchDetails(employershipIds) {
  let searchDetails = [];
  _.each(employershipIds, (employershipId) => {
    const employership = EmployershipStore.getEmployership(employershipId);
    if (_.isEmpty(employership)) {
      return;
    }
    const schoolId = employership.school;
    const principalId = employership.principal;
    const principal = PrincipalStore.getPrincipal(principalId);
    if (_.isEmpty(principal)) {
      return;
    }
    const item = _.assign({}, employership, {
      extraInfo: principal.name,
      type: 'principal',
    });
    const results = SchoolStore.getSearchDetailsForItem(schoolId, item);
    searchDetails = searchDetails.concat(results);
  });
  return _.uniq(_.sortByAll(searchDetails, ['extraInfo', 'name']), 'id');
}

function _receiveEmployerships(employerships) {
  _.each(employerships, (employership) => {
    _employerships[employership.id] = employership;
  });
}

export default EmployershipStore;
