'use strict';

import React from 'react';
import DocumentTitle from 'react-document-title';
import { Link } from 'react-router';

class NotFoundPage extends React.Component {

  render() {
    return (
      <DocumentTitle title='Sivua ei löydy - Koulurekisteri'>
        <div className='not-found-page'>
          <div className='container'>
            <h1>404 Sivua ei löydy</h1>
            <strong>Pahoittelut!</strong>
            <p>Näyttää siltä, että tätä sivua ei ole olemassa. Voit yrittää seuraavaa:</p>
            <ul>
              <li>
                Jos etsit jotain tiettyä koulua, voit etsiä sitä {' '}
                <Link to='search'>kouluhaku sivulta</Link>.
              </li>
              <li>Jos syötit sivun osoitteen käsin, tarkista että se on oikein.</li>
              <li>Jos tulit tälle sivulle jostain toisesta sivustomme osasta, ota
              meihin yhteyttä, jotta voimme korjata virheen.</li>
            </ul>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default NotFoundPage;
