'use strict';

import React from 'react';
import Timeline from './Timeline';

class SchoolTimelineInfo extends React.Component {

  render() {
    return (
      <div className='school-timeline-info-wrapper'>
        <div className='container'>
          <div className='school-timeline-info'>
            <Timeline yearsActive={this.props.yearsActive} currentYear={this.props.currentYear}/>
            <div className='school-timeinfo'/>
          </div>
        </div>
      </div>
    );
  }
}

SchoolTimelineInfo.propTypes = {
  yearsActive: React.PropTypes.object,
  currentYear: React.PropTypes.number
};

export default SchoolTimelineInfo;
