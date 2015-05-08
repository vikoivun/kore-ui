'use strict';

import React from 'react';

class SchoolTitle extends React.Component {

  render() {
    const beginYear = this.props.name.begin_year;
    const endYear = this.props.name.end_year;
    return (
      <div className='container'>
        <header className='school-title'>
          <div className='school-title-box'>
            <h1>{this.props.name.official_name}</h1>
            <span>{beginYear} - {endYear}</span>
          </div>
        </header>
      </div>
    );
  }
}

SchoolTitle.propTypes = {
  name: React.PropTypes.shape({
      'official_name': React.PropTypes.string.isRequired
    })
};

export default SchoolTitle;
