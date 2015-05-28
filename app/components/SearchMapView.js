'use strict';

import _ from 'lodash';
import React from 'react';

import SearchMap from './LeafletMap';
import SearchMapList from './SearchMapList';

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
        <div className='search-map-container' id='map-map'>
          <SearchMap
            fetchingData={this.props.fetchingData}
            schoolList={schoolsWithLocation}
            selectedSchool={this.props.selectedSchool}
          />
        </div>
        <div className='search-map-list-container'>
          <SearchMapList
            fetchingData={this.props.fetchingData}
            nextPageUrl={this.props.nextPageUrl}
            schoolList={schoolsWithLocation}
            selectedSchool={this.props.selectedSchool}
            somethingWasSearched={this.props.somethingWasSearched}
          />
        </div>
      </div>
    );
  }
}

SearchMapView.propTypes = {
  fetchingData: React.PropTypes.bool,
  nextPageUrl: React.PropTypes.string,
  schoolList: React.PropTypes.array.isRequired,
  selectedSchool: React.PropTypes.number,
  somethingWasSearched: React.PropTypes.bool.isRequired
};

export default SearchMapView;
