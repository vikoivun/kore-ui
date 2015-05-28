'use strict';

import React from 'react';

import SearchGridView from './SearchGridView';
import SearchMapView from './SearchMapView';
import SearchTableView from './SearchTableView';

const views = {
  map: SearchMapView,
  table: SearchTableView,
  grid: SearchGridView
};

class SearchResults extends React.Component {
  render() {
    const View = views[this.props.view];
    return (
      <div className='container'>
        <View
          fetchingData={this.props.fetchingData}
          schoolList={this.props.schoolList}
          selectedSchool={this.props.selectedSchool}
          somethingWasSearched={this.props.somethingWasSearched}
        />
      </div>
    );
  }
}

SearchResults.propTypes = {
  fetchingData: React.PropTypes.bool,
  schoolList: React.PropTypes.array.isRequired,
  selectedSchool: React.PropTypes.number,
  somethingWasSearched: React.PropTypes.bool.isRequired,
  view: React.PropTypes.string.isRequired
};

export default SearchResults;
