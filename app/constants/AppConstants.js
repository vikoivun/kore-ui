'use strict';

import React from 'react';

export default {
  API_ARGS: {'format': 'json'},
  API_ROOT: 'http://kore.hel.ninja/v1/',
  FILTER_PROPTYPE: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string
  ]),
  SEARCH_TIMELINE_STARTING_YEAR: 1550
};
