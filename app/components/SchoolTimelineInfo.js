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
            <Timeline
              currentYear={this.props.currentYear}
              yearsActive={this.props.yearsActive}
            />
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
  currentYear: React.PropTypes.number,
  schoolYearDetails: React.PropTypes.shape({
    building: React.PropTypes.shape({
      addresses: React.PropTypes.arrayOf(
        React.PropTypes.shape({
          municipalityFi: React.PropTypes.string,
          streetNameFi: React.PropTypes.string
        })
      )
    }),
    name: React.PropTypes.shape({
      beginYear: React.PropTypes.number,
      endYear: React.PropTypes.number,
      officialName: React.PropTypes.string
    })
  }),
  yearsActive: React.PropTypes.shape({
    beginYear: React.PropTypes.number,
    endYear: React.PropTypes.number
  })
};

export default SchoolTimelineInfo;
