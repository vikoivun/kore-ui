'use strict';

import _ from 'lodash';
import React from 'react';

import BaseMap from './BaseMap';
import {getLayerForYear, getLayerLabel} from '../core/mapUtils';

class SchoolMap extends BaseMap {
  render() {
    const locationDefined = _.some(this.props.locations, 'coordinates');
    let overlayClassname = 'location-undefined-overlay';
    overlayClassname += locationDefined ? ' hidden' : '';
    const mapLabelClassName = locationDefined ? 'map-label' : 'hidden';
    const mapLabel = getLayerLabel(getLayerForYear(this.props.selectedYear));

    return (
      <div>
        <div ref='map' />
        <div className={overlayClassname}>
          <div className='location-undefined-message'>
            <i className='fa fa-map-marker'></i>
            Sijaintia tälle vuodelle ei ole määritelty.
          </div>
        </div>
        <div className={mapLabelClassName}>
          {mapLabel}
        </div>
      </div>
    );
  }
}

SchoolMap.propTypes = {
  locations: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      address: React.PropTypes.string,
      coordinates: React.PropTypes.array,
      type: React.PropTypes.string
    })
  ).isRequired,
  selectedYear: React.PropTypes.number
};

export default SchoolMap;
