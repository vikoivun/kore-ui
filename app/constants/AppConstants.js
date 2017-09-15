

import React from 'react';

export default {
  API_ARGS: { format: 'json' },
  API_ROOT: 'https://api.hel.fi/kore/v1/',
  FILTER_PROPTYPE: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string,
  ]),
  SEARCH_TIMELINE_STARTING_YEAR: 1550,
};
