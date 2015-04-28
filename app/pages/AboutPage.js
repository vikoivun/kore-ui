'use strict';

import React from 'react';
import DocumentTitle from 'react-document-title';

class AboutPage extends React.Component {

  render() {
    return (
      <DocumentTitle title='Tietoa palvelusta - Koulurekisteri'>
        <div className='about-page'>
          <h1>Tietoa palvelusta</h1>
          <p>
            Lorem ipsum...
          </p>
        </div>
      </DocumentTitle>
    );
  }
}

export default AboutPage;
