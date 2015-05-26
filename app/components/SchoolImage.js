'use strict';

import React from 'react';
import Loader from 'react-loader';
import {getImageUrl} from '../core/utils';

class SchoolImage extends React.Component {

  render() {
    const schoolImageStyles = {
      backgroundImage: 'url(' + getImageUrl(this.props.building) + ')'
    };
    return (
      <div className='school-image-container'>
        <Loader loaded={!this.props.fetchingData}>
          <div className='school-image' style={schoolImageStyles} />
        </Loader>
      </div>
    );
  }
}

SchoolImage.propTypes = {
  fetchingData: React.PropTypes.bool,
  building: React.PropTypes.shape({
    photos: React.PropTypes.array
  }).isRequired
};

export default SchoolImage;
