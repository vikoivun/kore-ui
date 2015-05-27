'use strict';

import _ from 'lodash';
import React from 'react';
import {Link} from 'react-router';
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

class SearchResultsGrid extends React.Component {
  render() {
    const chunkedSchools = _.chunk(this.props.schoolList, 3);
    return (
      <div className='search-grid'>
        {chunkedSchools.map(getSchoolRow)}
      </div>
    );
  }
}

SearchResultsGrid.propTypes = {
  schoolList: React.PropTypes.array.isRequired
};

export default SearchResultsGrid;
