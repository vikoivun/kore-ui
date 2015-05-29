'use strict';

import React from 'react';
import DocumentTitle from 'react-document-title';
import SearchBox from '../components/SearchBox';
import SearchControls from '../components/SearchControls';
import SearchStore from '../stores/SearchStore';
import SchoolStore from '../stores/SchoolStore';
import SearchResults from '../components/SearchResults';

function getStateFromStores() {
  const searchResults = SearchStore.getSearchResults();
  return {
    view: SearchStore.getView(),
    fetchingData: SearchStore.getFetchingData(),
    filters: SearchStore.getFilters(),
    filtersOptions: SearchStore.getFiltersOptions(),
    searchQuery: SearchStore.getSearchQuery(),
    nextPageUrl: SearchStore.getNextPageUrl(),
    selectedSchool: SearchStore.getSelectedSchool(),
    schoolList: SchoolStore.getSchoolsYearDetails(searchResults),
    somethingWasSearched: SearchStore.getSomethingWasSearched()
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
    return (
      <DocumentTitle title='Etsi koulua - Koulurekisteri'>
        <div className='search-page'>
          <header className='container'>
            <h1 className='search-title' >
              <img alt='Helsingin vaakuna' src={require('../images/Helsinki.vaakuna.svg')} />
              Kouluhaku
            </h1>
          </header>
          <SearchBox filters={this.state.filters} searchQuery={this.state.searchQuery} />
          <SearchControls
            filters={this.state.filters}
            filtersOptions={this.state.filtersOptions}
            view={this.state.view}
          />
          <div className='search-timeline'></div>
          <SearchResults
            fetchingData={this.state.fetchingData}
            nextPageUrl={this.state.nextPageUrl}
            schoolList={this.state.schoolList}
            selectedSchool={this.state.selectedSchool}
            somethingWasSearched={this.state.somethingWasSearched}
            view={this.state.view}
          />
        </div>
      </DocumentTitle>
    );
  }

  _onChange() {
    this.setState(getStateFromStores());
  }
}

export default SearchPage;
