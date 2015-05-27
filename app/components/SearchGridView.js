'use strict';

import _ from 'lodash';
import React from 'react';
import {Link} from 'react-router';
import Loader from 'react-loader';
import {processBasicInfoRow, getImageUrl} from '../core/utils';
import InfoRow from './InfoRow';


function getInfoRow(row) {
  delete row.boxContent;
  return <InfoRow {...row}/>;
}

function processSchool(school) {
  const schoolImageStyles = {
    backgroundImage: 'url(' + getImageUrl(school.building) + ')'
  };
  return (
    <div className='school-grid-wrapper'>
      <Link params={{schoolId: school.id}} to='school'>
        <div className='school-grid'>
          <div className='school-image' style={schoolImageStyles}></div>
          <ol className='school-grid-details-list'>
            {processBasicInfoRow(school).map(getInfoRow)}
          </ol>
        </div>
      </Link>
    </div>
  );
}

function getSchoolRow(schools) {
  return (
    <div className='school-grid-row'>
        {schools.map(processSchool)}
    </div>
  );
}

class SearchGridView extends React.Component {
  renderSearchResults() {
    if (this.props.schoolList.length) {
      const chunkedSchools = _.chunk(this.props.schoolList, 3);
      return (
        <div className='search-grid'>
          {chunkedSchools.map(getSchoolRow)}
        </div>
      );
    } else {
      return <p>Yhtään hakutulosta ei löytynyt.</p>;
    }
  }

  render() {
    const loading = this.props.fetchingData && (this.props.schoolList.length === 0);
    if (this.props.somethingWasSearched) {
      return (
        <Loader loaded={!loading}>
          {this.renderSearchResults()}
        </Loader>
      );
    }
    return <p>Etsi kouluja syöttämällä koulun nimi tai osoite yllä olevaan hakukenttään.</p>;
  }
}

SearchGridView.propTypes = {
  fetchingData: React.PropTypes.bool,
  schoolList: React.PropTypes.array.isRequired,
  somethingWasSearched: React.PropTypes.bool.isRequired
};

export default SearchGridView;
