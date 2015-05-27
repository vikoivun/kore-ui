'use strict';

import React from 'react';
import _ from 'lodash';
import SearchMapList from './SearchMapList';
import SearchMap from './SearchMap';

function getSchoolsWithLocation(schools) {
  return _.filter(schools, function(school) {
    return !_.isEmpty(school.location.coordinates);
  });
}

class SearchMapView extends React.Component {
  render() {
    const schoolsWithLocation = getSchoolsWithLocation(this.props.schoolList);
    return (
      <div className='search-map-view'>
        <div className='search-map-container'>
          <SearchMap
            fetchingData={this.props.fetchingData}
            schoolList={schoolsWithLocation}
          />
        </div>
        <div className='search-map-list-container'>
          <SearchMapList
            fetchingData={this.props.fetchingData}
            schoolList={schoolsWithLocation}
            somethingWasSearched={this.props.somethingWasSearched}
          />
        </div>
      </div>
    );
  }
}

SearchMapView.propTypes = {
  fetchingData: React.PropTypes.bool,
  schoolList: React.PropTypes.array.isRequired,
  somethingWasSearched: React.PropTypes.bool.isRequired
};

export default SearchMapView;
