'use strict';

import React from 'react';
import Timeline from './Timeline';
import InfoRow from './InfoRow';
import {processBasicInfoRow} from '../core/utils';

function getInfoRow(row) {
  return <InfoRow {...row}/>;
}

class SchoolTimelineInfo extends React.Component {

  render() {
    return (
      <div className='school-timeline-info-wrapper'>
        <div className='container'>
          <div className='school-timeline-info'>
            <Timeline yearsActive={this.props.yearsActive} currentYear={this.props.currentYear}/>
            <div className='school-year-info'>
              <ol className='school-year-details-list'>
                {processBasicInfoRow(this.props.schoolYearDetails).map(getInfoRow)}
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SchoolTimelineInfo.propTypes = {
  yearsActive: React.PropTypes.shape({
    beginYear: React.PropTypes.number,
    endYear: React.PropTypes.number
  }),
  currentYear: React.PropTypes.number,
  schoolYearDetails: React.PropTypes.shape({
    'name': React.PropTypes.shape({
      officialName: React.PropTypes.string,
      beginYear: React.PropTypes.number,
      endYear: React.PropTypes.number
    }),
    'building': React.PropTypes.shape({
      addresses: React.PropTypes.arrayOf(
        React.PropTypes.shape({
          streetNameFi: React.PropTypes.string,
          municipalityFi: React.PropTypes.string
        })
      )
    })
  })
};

export default SchoolTimelineInfo;
