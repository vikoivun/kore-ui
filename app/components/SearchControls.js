'use strict';

import _ from 'lodash';
import React from 'react';

import SearchViewControl from './SearchViewControl';
import SearchFilterControl from './SearchFilterControl';

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
          <div className='filters'>
            <div className='container-fluid'>
              <div className='filters-wrapper'>
                <SearchFilterControl
                  className='filter-type'
                  key='Type'
                  name='Tyyppi'
                  options={this.props.filtersOptions.schoolType}
                  resource='schoolType'
                  value={this.props.filters.type}
                />
                <SearchFilterControl
                  className='filter-type'
                  key='Field'
                  name='Ala'
                  options={this.props.filtersOptions.schoolField}
                  resource='schoolField'
                  value={this.props.filters.field}
                />
                <SearchFilterControl
                  className='filter-type'
                  key='Language'
                  name='Kieli'
                  options={this.props.filtersOptions.language}
                  resource='language'
                  value={this.props.filters.language}
                />
                <SearchFilterControl
                  className='filter-type'
                  key='Gender'
                  name='Sukupuoli'
                  options={this.props.filtersOptions.gender}
                  resource='gender'
                  value={this.props.filters.gender}
                />
              </div>
            </div>
          </div>
          <div className='views'>
            {_.map(buttons, this.getSearchViewControls)}
          </div>
        </div>
      </div>
    );
  }
}

const filterPropType = React.PropTypes.oneOfType([
  React.PropTypes.number,
  React.PropTypes.string
]);

SearchControls.propTypes = {
  filters: React.PropTypes.shape({
    type: filterPropType,
    field: filterPropType,
    language: filterPropType,
    gender: filterPropType
  }),
  filtersOptions: React.PropTypes.shape({
    schoolType: React.PropTypes.array.isRequired,
    schoolField: React.PropTypes.array.isRequired,
    language: React.PropTypes.array.isRequired,
    gender: React.PropTypes.array.isRequired
  }),
  view: React.PropTypes.string.isRequired
};

export default SearchControls;
