'use strict';

import _ from 'lodash';
import React from 'react';

import SearchMap from './SearchMap';
import SearchMapList from './SearchMapList';
import SearchMapYearControl from './SearchMapYearControl';
import {getFilterPropType} from '../core/utils';

function getSchoolsWithLocation(schools) {
  const schoolsWithLocation = _.filter(schools, function(school) {
    return !_.isEmpty(school.location.coordinates);
  });
  const sorted = _.sortBy(schoolsWithLocation, 'name');
  return _.uniq(sorted, (school) => school.location.id);
}

class SearchMapView extends React.Component {
  render() {
    const schoolsWithLocation = getSchoolsWithLocation(this.props.schoolList);

    return (
      <div className='search-map-view'>
        <SearchMapYearControl
          filters={this.props.filters}
          searchQuery={this.props.searchQuery}
          selectedMapYear={String(this.props.selectedMapYear)}
          years={this.props.years}
        />
        <div className='search-map-container' id='map-map'>
          <SearchMap
            fetchingData={this.props.fetchingData}
            schoolList={schoolsWithLocation}
            selectedMapYear={this.props.selectedMapYear}
            selectedSchoolId={this.props.selectedSchoolId}
          />
        </div>
        <div className='search-map-list-container'>
          <SearchMapList
            fetchingData={this.props.fetchingData}
            nextPagesUrlDict={this.props.nextPagesUrlDict}
            schoolList={schoolsWithLocation}
            selectedSchoolId={this.props.selectedSchoolId}
            somethingWasSearched={this.props.somethingWasSearched}
          />
        </div>
      </div>
    );
  }
}

const filterPropType = getFilterPropType();

SearchMapView.propTypes = {
  fetchingData: React.PropTypes.bool,
  filters: React.PropTypes.shape({
    type: filterPropType,
    field: filterPropType,
    language: filterPropType,
    gender: filterPropType
  }),
  nextPagesUrlDict: React.PropTypes.objectOf(React.PropTypes.string),
  schoolList: React.PropTypes.array.isRequired,
  searchQuery: React.PropTypes.string.isRequired,
  selectedMapYear: React.PropTypes.string,
  selectedSchoolId: React.PropTypes.string,
  somethingWasSearched: React.PropTypes.bool.isRequired,
  years: React.PropTypes.arrayOf(React.PropTypes.number)
};

export default SearchMapView;
