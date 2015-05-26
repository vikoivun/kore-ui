'use strict';

import React from 'react';
import DocumentTitle from 'react-document-title';
import SearchBox from '../components/SearchBox';
import SearchControls from '../components/SearchControls';
import SearchLoadMore from '../components/SearchLoadMore';
import SearchStore from '../stores/SearchStore';
import SchoolStore from '../stores/SchoolStore';
import SearchResults from '../components/SearchResults';

function getStateFromStores() {
  const searchResults = SearchStore.getSearchResults();
  return {
    view: SearchStore.getView(),
    fetchingData: SearchStore.getFetchingData(),
    searchQuery: SearchStore.getSearchQuery(),
    nextPageUrl: SearchStore.getNextPageUrl(),
    schoolList: SchoolStore.getSchoolsYearDetails(searchResults)
  };
}

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = getStateFromStores();
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    SearchStore.addChangeListener(this._onChange);
    SchoolStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    SearchStore.removeChangeListener(this._onChange);
    SchoolStore.removeChangeListener(this._onChange);
  }

  render() {
    let loadMore;
    if (this.state.nextPageUrl) {
      loadMore = (
        <SearchLoadMore
          url={this.state.nextPageUrl}
          fetchingData={this.state.fetchingData}
        />
      );
    }
    return (
      <DocumentTitle title='Etsi koulua - Koulurekisteri'>
        <div className='search-page'>
          <header className='container'>
            <h1 className='search-title' >
              <img src={require('../images/Helsinki.vaakuna.svg')} alt='Helsinki vaakuna' />
              Kouluhaku
            </h1>
          </header>
          <SearchBox searchQuery={this.state.searchQuery} />
          <SearchControls view={this.state.view} />
          <div className='search-timeline'></div>
          <SearchResults
            fetchingData={this.state.fetchingData}
            somethingWasSearched={Boolean(this.state.searchQuery)}
            schoolList={this.state.schoolList}
            view={this.state.view}
          />
          {loadMore}
        </div>
      </DocumentTitle>
    );
  }

  _onChange() {
    this.setState(getStateFromStores());
  }
}

export default SearchPage;
