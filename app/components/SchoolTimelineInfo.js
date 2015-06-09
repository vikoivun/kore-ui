'use strict';

import _ from 'lodash';
import React from 'react';
import Loader from 'react-loader';

import InfoRow from './InfoRow';
import Timeline from './Timeline';
import {processBasicInfoRow} from '../core/utils';

function getInfoRow(row) {
  return <InfoRow {...row}/>;
}

class SchoolTimelineInfo extends React.Component {

  renderYearInfoHeader() {
    let headerText = '';
    if (this.props.schoolYearDetails && this.props.schoolYearDetails.name) {
      headerText = `
        ${this.props.schoolYearDetails.name.officialName} vuonna ${this.props.selectedYear}
      `;
    }
    return <h2>{headerText}</h2>;
  }

  render() {
    const loadingTimeline = _.isEmpty(this.props.yearsActive);
    return (
      <div className='school-timeline-info-wrapper'>
        <div className='container'>
          <div className='school-timeline-info'>
            <div className='school-timeline-container'>
              <Loader color='#FFF' loaded={!loadingTimeline}>
                <Timeline
                  selectedYear={this.props.selectedYear}
                  yearsActive={this.props.yearsActive}
                />
              </Loader>
            </div>
            <div className='school-year-info'>
              {this.renderYearInfoHeader()}
              <ol className='school-year-details-list'>
                {processBasicInfoRow(this.props.schoolYearDetails, true).map(getInfoRow)}
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SchoolTimelineInfo.propTypes = {
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
  selectedYear: React.PropTypes.number,
  yearsActive: React.PropTypes.shape({
    beginYear: React.PropTypes.number,
    endYear: React.PropTypes.number
  })
};

export default SchoolTimelineInfo;
