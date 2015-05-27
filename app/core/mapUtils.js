'use strict';

import _ from 'lodash';

function getBounds(coordinates) {
  const [longitudes, latitudes] = _.zip(...coordinates);
  const bounds = [
    [_.min(latitudes), _.min(longitudes)],
    [_.max(latitudes), _.max(longitudes)]
  ];
  return bounds;
}

function getPosition(location) {
  const coordinates = location.coordinates;
  if (_.isEmpty(coordinates)) {
    return null;
  }
  return [coordinates[1], coordinates[0]];
}

export default {
  getBounds,
  getPosition
};
