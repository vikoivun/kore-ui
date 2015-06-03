'use strict';

import React from 'react';
import DocumentTitle from 'react-document-title';

import SearchBox from '../components/SearchBox';
import SearchControls from '../components/SearchControls';
import SearchResults from '../components/SearchResults';
import SearchTimeline from '../components/SearchTimeline';
import SchoolStore from '../stores/SchoolStore';
import SearchStore from '../stores/SearchStore';

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
    somethingWasSearched: SearchStore.getSomethingWasSearched(),
    years: SearchStore.getYears()
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

  renderSearchTimeLine() {
    if (this.state.view === 'map') {
      return null;
    }
    return (
      <div className='container'>
        <SearchTimeline years={this.state.years} />
      </div>
    );
  }

  render() {
    return (
      <DocumentTitle title='Etsi koulua - Koulurekisteri'>
        <div className='search-page'>
          <header className='container'>
            <h1 className='search-title' >
              <img alt='Helsingin vaakuna' src={require('../images/Helsinki.vaakuna.svg')} />
              Haku
            </h1>
          </header>
          <SearchBox
            filters={this.state.filters}
            searchQuery={this.state.searchQuery}
            years={this.state.years}
          />
          <SearchControls
            filters={this.state.filters}
            filtersOptions={this.state.filtersOptions}
            view={this.state.view}
          />
          {this.renderSearchTimeLine()}
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
