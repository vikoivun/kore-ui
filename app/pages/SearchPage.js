'use strict';

import React from 'react';
import DocumentTitle from 'react-document-title';
import SearchBox from '../components/SearchBox';
import SearchStore from '../stores/SearchStore';
import SchoolStore from '../stores/SchoolStore';
import SearchResultsTable from '../components/SearchResultsTable';

function getStateFromStores() {
  const searchResults = SearchStore.getSearchResults();
  return {
    schoolList: SchoolStore.getSchools(searchResults)
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
          <header className="container">
            <h1 className='search-title' >
              <img src={require('../images/Helsinki.vaakuna.svg')} alt='Helsinki vaakuna' />
              Kouluhaku
            </h1>
          </header>
          <SearchBox/>
          <div className='search-timeline'></div>
          <SearchResultsTable schoolList={this.state.schoolList}/>
        </div>
      </DocumentTitle>
    );
  }

  _onChange() {
    this.setState(getStateFromStores());
  }
}

export default SearchPage;
