import _ from 'lodash';
import React from 'react';
import ReactSelect from 'react-select';

import SearchActionCreators from '../actions/SearchActionCreators';
import { TILE_LAYERS } from '../constants/MapConstants';
import { getLayerLabel, getMapYears } from '../core/mapUtils';
import { getFilterPropType } from '../core/utils';

class SearchMapYearControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.requestSearch = this.requestSearch.bind(this);
  }

  componentDidMount() {
    SearchActionCreators.selectMapYear(this.props.selectedMapYear);
    if (!_.isEqual(getMapYears(this.props.selectedMapYear), this.props.years)) {
      this.requestSearch(this.props.selectedMapYear);
    }
  }

  handleChange(year) {
    SearchActionCreators.selectMapYear(year);
    this.requestSearch(year);
  }

  getOptions() {
    const options = [];
    const sortedLayers = _.sortByOrder(TILE_LAYERS, ['beginYear'], [false]);
    _.each(sortedLayers, (layer) => {
      const label = getLayerLabel(layer);
      options.push({
        label,
        value: String(layer.beginYear),
      });
    });
    return options;
  }

  requestSearch(year) {
    if (this.props.searchQuery) {
      const filters = _.clone(this.props.filters);
      const years = getMapYears(year);
      filters.fromYear = years[0];
      filters.untilYear = years[1];
      SearchActionCreators.requestSearch(this.props.searchQuery, filters);
    }
  }

  render() {
    const options = this.getOptions();
    return (
      <div className="search-map-year-controls">
        <ReactSelect
          clearable={false}
          name="search-map-year-select"
          onChange={this.handleChange}
          options={options}
          searchable={false}
          value={this.props.selectedMapYear}
        />
      </div>
    );
  }
}

const filterPropType = getFilterPropType();

SearchMapYearControl.propTypes = {
  filters: React.PropTypes.shape({
    type: filterPropType,
    field: filterPropType,
    language: filterPropType,
    gender: filterPropType,
  }),
  searchQuery: React.PropTypes.string.isRequired,
  selectedMapYear: React.PropTypes.string,
  years: React.PropTypes.arrayOf(React.PropTypes.number),
};

export default SearchMapYearControl;
