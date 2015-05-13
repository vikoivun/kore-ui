'use strict';

import React from 'react';
import DocumentTitle from 'react-document-title';
import SearchBox from '../components/SearchBox';
import SearchStore from '../stores/SearchStore';


function getStateFromStores() {
  return {
    searchResults: SearchStore.getSearchResults()
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
  }

  componentWillUnmount() {
    SearchStore.removeChangeListener(this._onChange);
  }

  render() {
    return (
      <DocumentTitle title='Etsi koulua - Koulurekisteri'>
        <div className='search-page'>
          <header className="container">
            <h1 className='search-title' >
              <img src={require('../images/Helsinki.vaakuna.svg')} alt='Helsinki vaakuna' />
              School Finder
            </h1>
          </header>
          <SearchBox/>
          <div className='search-timeline'></div>
          <div className='search-results'></div>
        </div>
      </DocumentTitle>
    );
  }

  _onChange() {
    this.setState(getStateFromStores());
  }
}

export default SearchPage;
