'use strict';

import React from 'react';
import DocumentTitle from 'react-document-title';

class SearchPage extends React.Component {

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
          <div className='search-box'></div>
          <div className='search-timeline'></div>
          <div className='search-results'></div>
        </div>
      </DocumentTitle>
    );
  }
}

export default SearchPage;
