'use strict';

import _ from 'lodash';
import React from 'react';
import DocumentTitle from 'react-document-title';

import SearchBox from '../components/SearchBox';
import SearchControls from '../components/SearchControls';
import SearchGridView from '../components/SearchGridView';
import SearchMapView from '../components/SearchMapView';
import SearchTableView from '../components/SearchTableView';
import SearchTimeline from '../components/SearchTimeline';
import PrincipalStore from '../stores/PrincipalStore';
import SchoolBuildingStore from '../stores/SchoolBuildingStore';
import SchoolStore from '../stores/SchoolStore';
import SearchStore from '../stores/SearchStore';

function getStateFromStores() {
  const searchResults = SearchStore.getSearchResults();
  const searchQuery = SearchStore.getSearchQuery();

  return {
    buildingResults: SchoolBuildingStore.getSearchDetails(searchResults.buildings),
    fetchingData: SearchStore.getFetchingData(),
    filters: SearchStore.getFilters(),
    filtersOptions: SearchStore.getFiltersOptions(),
    nameResults: SchoolStore.getSearchDetails(searchResults.schools, searchQuery),
    nextPagesUrlDict: SearchStore.getNextPagesUrlDict(),
    principalResults: PrincipalStore.getSearchDetails(searchResults.principals),
    searchQuery: SearchStore.getSearchQuery(),
    selectedMapYear: SearchStore.getSelectedMapYear(),
    selectedSchoolId: SearchStore.getSelectedSchoolId(),
    somethingWasSearched: SearchStore.getSomethingWasSearched(),
    view: SearchStore.getView(),
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

  renderSearchResultsView() {
    const schoolList = this.state.nameResults.concat(
      this.state.buildingResults, this.state.principalResults
    );

    const commonViewProps = {
      fetchingData: this.state.fetchingData,
      nextPagesUrlDict: this.state.nextPagesUrlDict,
      schoolList: schoolList,
      somethingWasSearched: this.state.somethingWasSearched
    };

    if (this.state.view === 'grid') {
      return <SearchGridView {...commonViewProps} />;
    }

    if (this.state.view === 'table') {
      return <SearchTableView {...commonViewProps} />;
    }

    const mapViewProps = _.assign(commonViewProps, {
      filters: this.state.filters,
      searchQuery: this.state.searchQuery,
      selectedMapYear: this.state.selectedMapYear,
      selectedSchoolId: this.state.selectedSchoolId,
      years: this.state.years
    });

    if (this.state.view === 'map') {
      return <SearchMapView {...mapViewProps} />;
    }

    return null;
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
          <div className='container'>
            <div className='search-results'>
              {this.renderSearchResultsView()}
            </div>
          </div>
        </div>
      </DocumentTitle>
    );
  }

  _onChange() {
    this.setState(getStateFromStores());
  }
}

export default SearchPage;
