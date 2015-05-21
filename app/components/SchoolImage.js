'use strict';

import React from 'react';
import _ from 'lodash';
import Loader from 'react-loader';

const defaultImageUrl = require('../images/default-building.jpg');

class SchoolImage extends React.Component {

  getImageUrl() {
    const photos = this.props.building.photos;
    if (photos && photos.length) {
      const photo = _.find(photos, 'is_front');
      return photo ? photo.url : photos[0].url;
    }
    return defaultImageUrl;
  }

  render() {
    const schoolImageStyles = {
      backgroundImage: 'url(' + this.getImageUrl() + ')'
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
