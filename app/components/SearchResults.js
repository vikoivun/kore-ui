'use strict';

import React from 'react';
import Loader from 'react-loader';
import SearchResultsGrid from './SearchResultsGrid';
import SearchResultsTable from './SearchResultsTable';
import SearchResultsMap from './SearchResultsTable';  // Change to Map when available

const views = {
  map: SearchResultsMap,
  table: SearchResultsTable,
  grid: SearchResultsGrid
};

class SearchResults extends React.Component {

  renderSearchView() {
    if (this.props.schoolList.length) {
      const View = views[this.props.view];
      return (
        <View schoolList={this.props.schoolList} />
      );
    }

    if (this.props.somethingWasSearched) {
      return <p>Yhtään hakutulosta ei löytynyt.</p>;
    }

    return <p>Etsi kouluja syöttämällä koulun nimi tai osoite yllä olevaan hakukenttään.</p>;
  }

  render() {
    const loading = this.props.fetchingData && (this.props.schoolList.length === 0);
    return (
      <div className='container'>
        <Loader loaded={!loading}>
          {this.renderSearchView()}
        </Loader>
      </div>
    );
  }
}

SearchResults.propTypes = {
  fetchingData: React.PropTypes.bool,
  schoolList: React.PropTypes.array.isRequired,
  somethingWasSearched: React.PropTypes.bool.isRequired,
  view: React.PropTypes.string.isRequired
};

export default SearchResults;
