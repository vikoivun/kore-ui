'use strict';

import React from 'react';

const defaultBuildingPictureUrl = require('../images/default-building.jpg');

class SchoolImageMap extends React.Component {

  getBuildingPictureUrl(){
    if (this.props.building.photo) {
      return this.props.building.photo;
    }
    return defaultBuildingPictureUrl;
  }

  render() {
    const schoolImageStyles = {
      backgroundImage: 'url(' + this.getBuildingPictureUrl() + ')'
    };
    return (
      <div className='container'>
        <div className='school-image-map'>
          <div className='school-image' style={schoolImageStyles}/>
          <div className='school-map'/>
        </div>
      </div>
    );
  }
}

SchoolImageMap.propTypes = {
  building: React.PropTypes.shape({
    photo: React.PropTypes.string
  }).isRequired
};

export default SchoolImageMap;
