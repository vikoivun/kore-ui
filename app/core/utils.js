import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router';

const defaultImageUrl = require('../images/default-school.jpg');

function getAddressStringFromBuilding(building) {
  if (building && building.addresses && building.addresses.length) {
    const streets = [];
    _.each(_.sortBy(building.addresses, 'beginYear'), (address) => {
      streets.push(getAddressString(address));
    });
    return streets.join(' = ');
  }
  return 'Osoite tuntematon';
}

function getAddressString(address) {
  if (!address || !address.streetNameFi) {
    return 'Osoite tuntematon';
  }
  if (address.municipalityFi && address.municipalityFi !== 'Helsinki') {
    return `${address.streetNameFi}, ${address.municipalityFi}`;
  }
  return address.streetNameFi;
}

function getArchiveName(archive) {
  if (archive.url) {
    return <a href={archive.url} target="_blank">{archive.location}</a>;
  }
  return archive.location;
}

function getBoxContent(item) {
  return [
    item.beginYear,
    <i className="fa fa-lg fa-long-arrow-right" />,
    item.endYear,
  ];
}

function getBuildingAddressForYear(itemList, year) {
  const addresses = getItemsForYear(itemList, year);
  if (addresses.length === 0) {
    return null;
  } else if (addresses.length === 1) {
    return addresses[0];
  }
  const sorted = _.sortBy(addresses, 'id');
  const withLocation = _.find(sorted, address => !_.isEmpty(address.location));
  return withLocation || addresses[0];
}

function getContinuumEventName(event) {
  const descriptionMapper = {
    joins: 'Yhdistyminen',
    'separates from': 'Eroaminen',
  };

  return [
    `${descriptionMapper[event.description]}: `,
    <Link
      params={{ schoolId: event.schoolId, year: event.year }}
      to="school-with-year"
    >
      {event.schoolName}
    </Link>,
  ];
}

function getFilterPropType() {
  return React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string,
  ]);
}

function getImageUrl(building) {
  if (!building || !building.photos || !building.photos.length) {
    return defaultImageUrl;
  }
  const photo = _.find(building.photos, 'is_front');
  return photo ? photo.url : building.photos[0].url;
}

function getItemByIdWrapper(func, items, defaultValue) {
  return function (itemId) {
    defaultValue = defaultValue || {};
    const item = items[itemId];
    const newArgs = Array.prototype.slice.call(arguments, 1);
    newArgs.unshift(item);
    return _.isEmpty(item) ? defaultValue : func(...newArgs);
  };
}

function getItemForYear(itemList, year) {
  return _.find(itemList, item => inBetween(year, item.beginYear, item.endYear));
}

function getItemsForYear(itemList, year) {
  return _.filter(itemList, item => inBetween(year, item.beginYear, item.endYear));
}

function inBetween(year, beginYear, endYear, closedEndYear) {
  beginYear = beginYear || 0;
  endYear = endYear || 10000;
  const delta = closedEndYear ? 0 : 1;
  return _.inRange(year, beginYear, endYear + delta);
}

function getLinkProps(searchResult) {
  const linkProps = {
    params: { schoolId: searchResult.schoolId },
    to: 'school',
  };
  if (searchResult.beginYear) {
    linkProps.params.year = searchResult.beginYear;
    linkProps.to = 'school-with-year';
  }
  return linkProps;
}

function sortByYears(list) {
  return _.sortByOrder(list, ['endYear', 'beginYear'], [false, false]);
}

export default {
  getAddressStringFromBuilding,
  getAddressString,
  getArchiveName,
  getBoxContent,
  getBuildingAddressForYear,
  getContinuumEventName,
  getFilterPropType,
  getImageUrl,
  getItemByIdWrapper,
  getItemForYear,
  getItemsForYear,
  inBetween,
  getLinkProps,
  sortByYears,
};
