import _ from 'lodash';
import Fuse from 'fuse.js';

import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../core/AppDispatcher';
import {
  getAssociationData,
  getAssociationObject,
  parseAssociationData,
} from '../core/storeUtils';
import {
  getAddressString,
  getArchiveName,
  getBuildingAddressForYear,
  getImageUrl,
  getItemByIdWrapper,
  getItemForYear,
  getItemsForYear,
  inBetween,
  sortByYears,
} from '../core/utils';
import BaseStore from './BaseStore';
import BuildingStore from './BuildingStore';
import EmployershipStore from './EmployershipStore';
import PrincipalStore from './PrincipalStore';
import SchoolBuildingStore from './SchoolBuildingStore';
import SearchStore from './SearchStore';

const _schools = {};
let _fetchingData = false;

const SchoolStore = Object.assign({}, BaseStore, {
  getBeginAndEndYear: getItemByIdWrapper(getBeginAndEndYear, _schools),
  getBuildingForYear: getItemByIdWrapper(getBuildingForYear, _schools),
  getFetchingData,
  getLocationsForYear: getItemByIdWrapper(getLocationsForYear, _schools),
  getNameInSelectedYear: getItemByIdWrapper(getNameInSelectedYear, _schools),
  getSchool: getItemByIdWrapper(getSchool, _schools),
  getSchoolDetails: getItemByIdWrapper(getSchoolDetails, _schools),
  getSchoolYearDetails: getItemByIdWrapper(getSchoolYearDetails, _schools),
  getSearchDetails,
  getSearchDetailsForItem,
  hasSchool,
});

SchoolStore.dispatchToken = AppDispatcher.register((payload) => {
  AppDispatcher.waitFor([
    BuildingStore.dispatchToken,
    EmployershipStore.dispatchToken,
    PrincipalStore.dispatchToken,
    SchoolBuildingStore.dispatchToken,
  ]);

  const action = payload.action;

  switch (action.type) {
    case ActionTypes.REQUEST_SCHOOL:
      _fetchingData = true;
      SchoolStore.emitChange();
      break;

    case ActionTypes.REQUEST_SCHOOL_SUCCESS:
      _fetchingData = false;
      _receiveSchools(action.response.entities);
      SchoolStore.emitChange();
      break;

    case ActionTypes.REQUEST_SEARCH_LOAD_MORE:
      SchoolStore.emitChange();
      break;

    case ActionTypes.REQUEST_SEARCH_SUCCESS:
      _receiveSchools(action.response.entities);
      SchoolStore.emitChange();
      break;

    default:
      // noop
  }
});

function getBeginAndEndYear(school) {
  const currentName = _.first(school.names);
  const oldestName = _.last(school.names);
  return {
    beginYear: oldestName ? oldestName.beginYear : null,
    endYear: currentName ? currentName.endYear : null,
  };
}

function getBuildingForYear(school, year) {
  year = year || _getLatestYear(school);
  return getItemForYear(school.buildings, year) || {};
}

function getFetchingData() {
  return _fetchingData;
}

function getLocationsForYear(school, year) {
  year = year || _getLatestYear(school);
  const buildings = getItemsForYear(school.buildings, year);
  return BuildingStore.getLocationsForYear(_.pluck(buildings, 'id'), year);
}

function getNameInSelectedYear(school, year) {
  year = year || _getLatestYear(school);
  return getItemForYear(school.names, year) || {};
}

function getSchool(school) {
  return school;
}

function getSchoolDetails(school, selectedYear) {
  selectedYear = selectedYear || _getLatestYear(school);
  return {
    archives: school.archives,
    buildings: getAssociationData(school.buildings, BuildingStore.getBuilding),
    continuum: school.continuum,
    fields: school.fields,
    genders: school.genders,
    languages: school.languages,
    names: school.names,
    principals: getAssociationData(school.principals, PrincipalStore.getPrincipal),
    selectedYear,
    types: school.types,
  };
}

function getSchoolYearDetails(school, year) {
  year = year || _getLatestYear(school);

  const archives = getItemsForYear(school.archives, year);
  const archiveArray = [];
  _.each(archives.reverse(), (archive, index) => {
    if (index > 0) {
      archiveArray.push(', ');
    }
    archiveArray.push(getArchiveName(archive));
  });

  const buildingNames = [];
  const schoolBuildings = getItemsForYear(school.buildings, year);
  _.each(schoolBuildings, (schoolBuilding) => {
    const building = (
      schoolBuilding ? getAssociationObject(schoolBuilding, BuildingStore.getBuilding) : null
    );
    if (building) {
      const address = getBuildingAddressForYear(building.addresses, year);
      buildingNames.push(getAddressString(address));
    }
  });
  const buildingString = buildingNames.join(', ');

  const genders = getItemsForYear(school.genders, year);
  const genderString = _.pluck(genders, 'gender').join(', ');

  const languages = getItemsForYear(school.languages, year);
  const languageString = _.pluck(languages, 'language').join(', ');

  const name = getItemForYear(school.names, year) || {};

  const principalNames = [];
  const schoolPrincipals = getItemsForYear(school.principals, year);
  _.each(schoolPrincipals, (schoolPrincipal) => {
    const principal = (
      schoolPrincipal ? getAssociationObject(schoolPrincipal, PrincipalStore.getPrincipal) : null
    );
    if (principal) {
      principalNames.push(principal.name);
    }
  });
  const principalString = principalNames.reverse().join(', ');

  const types = getItemsForYear(school.types, year);
  const typeString = _.pluck(types, ['type', 'name']).join(', ');

  return {
    archiveArray,
    buildingString,
    genderString,
    languageString,
    name,
    principalString,
    typeString,
  };
}

function getSearchDetails(schoolIds, query) {
  const searchDetails = [];
  _.each(schoolIds, (schoolId) => {
    const school = _schools[schoolId];
    if (_.isEmpty(school)) {
      return;
    }
    let names;
    if (query) {
      const nameSearchIndex = new Fuse(
        school.names,
        { keys: ['officialName'] }
      );
      names = nameSearchIndex.search(query);
    } else {
      names = school.names;
    }
    names = _filterOutNamesOutsideTimelineRange(names);

    _.each(names, (name) => {
      const location = _.first(getLocationsForYear(school, name.beginYear)) || {};
      location.id = !_.isEmpty(location) ? `${name.id}-${location.id}` : null;
      searchDetails.push(
        {
          beginYear: name.beginYear,
          endYear: name.endYear,
          id: `${school.id}-${name.id}`,
          imageUrl: getImageUrl(getBuildingForYear(school, name.beginYear)),
          location,
          name: name.officialName,
          schoolId: school.id,
          type: 'school-name',
        }
      );
    });
  });
  return _.sortBy(searchDetails, 'name');
}

function getSearchDetailsForItem(schoolId, item) {
  const searchDetails = [];
  const school = _schools[schoolId];
  if (_.isEmpty(school)) {
    return [];
  }

  const names = _getNamesForTimeSpan(school, item.beginYear, item.endYear);
  _.each(_.sortBy(names, 'beginYear'), (name, index) => {
    const beginYear = index === 0 ? item.beginYear || name.beginYear : name.beginYear;
    const endYear = index === name.length - 1 ? item.endYear || name.endYear : name.endYear;
    const location = _.first(getLocationsForYear(school, beginYear)) || {};
    location.id = !_.isEmpty(location) ? `${name.id}-${location.id}` : null;
    searchDetails.push(
      {
        beginYear,
        endYear,
        id: `${school.id}-${name.id}-${item.id}`,
        imageUrl: getImageUrl(getBuildingForYear(school, beginYear)),
        location,
        name: name.officialName,
        extraInfo: item.extraInfo,
        schoolId: school.id,
        type: item.type,
      }
    );
  });
  return searchDetails;
}

function hasSchool(schoolId) {
  return typeof _schools[schoolId] !== 'undefined';
}

function _filterOutNamesOutsideTimelineRange(names) {
  const searchYears = SearchStore.getActualSearchYears();
  const start = searchYears[0] || 0;
  const end = searchYears[1] || new Date().getFullYear();

  return _.filter(names, (name) => {
    if (name.beginYear && name.endYear) {
      return inBetween(name.beginYear, start, end) || inBetween(name.endYear, start, end);
    } else if (name.beginYear) {
      return name.beginYear <= end;
    } else if (name.endYear) {
      return name.endYear >= start;
    }
    return true;
  });
}

function _getContinuumEventData(event, schoolToLinkTo) {
  const name = getItemForYear(schoolToLinkTo.names, event.year);
  return {
    description: event.description,
    schoolId: schoolToLinkTo.id,
    schoolName: name ? name.officialName : '',
    year: event.year,
  };
}

function _getLatestYear(school) {
  return getBeginAndEndYear(school).endYear || new Date().getFullYear();
}

function _getNamesForTimeSpan(school, beginYear, endYear) {
  return _.filter(school.names, name => (
    inBetween(name.beginYear, beginYear, endYear, true) ||
      inBetween(beginYear, name.beginYear, name.endYear, true)
  ));
}

function _parseContinuumEvents(school) {
  let continuumEvents = [];

  continuumEvents = continuumEvents.concat(
    _.map(school.continuumTarget, event => _getContinuumEventData(event, event.activeSchool)),
    _.map(school.continuumActive, event => _getContinuumEventData(event, event.targetSchool))
  );

  return continuumEvents;
}

function _receiveSchools(entities) {
  _.each(entities.schools, (school) => {
    let _school = _schools[school.id];
    if (!_school) {
      _school = {
        buildings: [],
        principals: [],
      };
    }
    const associatedData = {};
    if (school.buildings && school.buildings.length) {
      associatedData.buildings = sortByYears(parseAssociationData(
        entities.schoolBuildings,
        school.buildings,
        'building'
      ));
    }
    if (school.principals && school.principals.length) {
      associatedData.principals = sortByYears(parseAssociationData(
        entities.schoolPrincipals,
        school.principals,
        'principal'
      ));
    }
    _.assign(
      _school,
      {
        archives: sortByYears(school.archives),
        continuum: _.sortByOrder(_parseContinuumEvents(school), ['year'], [false]),
        fields: sortByYears(school.fields),
        genders: sortByYears(school.genders),
        id: school.id,
        languages: sortByYears(school.languages),
        names: sortByYears(school.names),
        types: sortByYears(school.types),
      },
      associatedData
    );
    _schools[school.id] = _school;
  });
}

export default SchoolStore;
