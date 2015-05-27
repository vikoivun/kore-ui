'use strict';

import React from 'react';
import SearchMapList from './SearchMapList';
import SearchMap from './SearchMap';

class SearchMapView extends React.Component {
  render() {
    return (
      <div className='search-map-view'>
        <div className='search-map-container'>
          <SearchMap schoolList={this.props.schoolList} />
        </div>
        <div className='search-map-list-container'>
          <SearchMapList
            fetchingData={this.props.fetchingData}
            schoolList={this.props.schoolList}
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
