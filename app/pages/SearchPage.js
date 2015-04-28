'use strict';

import React from 'react';
import DocumentTitle from 'react-document-title';

class SearchPage extends React.Component {

  render() {
    return (
      <DocumentTitle title='Etsi koulua - Koulurekisteri'>
        <div className='search-page'>
          <p>Hae etsimääsi koulua täältä.</p>
        </div>
      </DocumentTitle>
    );
  }
}

export default SearchPage;
