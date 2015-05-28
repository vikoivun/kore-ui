'use strict';

import _ from 'lodash';
import React from 'react';

import SearchViewControl from './SearchViewControl';

const buttons = {
  map: <i className='fa fa-lg fa-map-marker'></i>,
  table: <i className='fa fa-lg fa-th-list'></i>,
  grid: <i className='fa fa-lg fa-th-large'></i>
};

class SearchControls extends React.Component {
  constructor(props) {
    super(props);
    this.getSearchViewControls = this.getSearchViewControls.bind(this);
  }

  getSearchViewControls(element, name) {
    let selected = this.props.view === name;
    return (
      <SearchViewControl
        key={name}
        selected={selected}
        view={name}
      >
        {element}
      </SearchViewControl>
    );
  }

  render() {
    return (
      <div className='container'>
        <div className='controls'>
          <div className='filters'></div>
          <div className='views'>
            {_.map(buttons, this.getSearchViewControls)}
          </div>
        </div>
      </div>
    );
  }
}

SearchControls.propTypes = {
  view: React.PropTypes.string.isRequired
};

export default SearchControls;
