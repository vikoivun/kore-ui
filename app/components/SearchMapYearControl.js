'use strict';

import _ from 'lodash';
import React from 'react';
import ReactSelect from 'react-select';

import SearchActionCreators from '../actions/SearchActionCreators';
import {TILE_LAYERS} from '../constants/MapConstants';

class SearchMapYearControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(newValue) {
    SearchActionCreators.selectMapYear(newValue);
  }

  getOptions() {
    let options = [];
    const sortedLayers = _.sortByOrder(TILE_LAYERS, ['beginYear'], [false]);
    _.each(sortedLayers, function(layer) {
      const endYear = layer.endYear ? layer.endYear : new Date().getFullYear();
      const mapName = layer.title.split(',')[0];
      const label = `${layer.beginYear} - ${endYear}: ${mapName}`;
      options.push({
        label: label,
        value: String(layer.beginYear)
      });
    });
    return options;
  }

  render() {
    const options = this.getOptions();
    return (
      <div className='search-map-year-controls'>
        <ReactSelect
          clearable={false}
          name='search-map-year-select'
          onChange={this.handleChange}
          options={options}
          searchable={false}
          value={this.props.selectedMapYear}
        />
      </div>
    );
  }
}

SearchMapYearControl.propTypes = {
  selectedMapYear: React.PropTypes.string
};

export default SearchMapYearControl;
