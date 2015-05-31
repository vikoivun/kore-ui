'use strict';

import React from 'react';

class SchoolTitle extends React.Component {

  render() {
    return (
      <div className='container'>
        <header className='school-title'>
          <div className='school-title-box'>
            <h1>{this.props.name.officialName}</h1>
          </div>
        </header>
      </div>
    );
  }
}

SchoolTitle.propTypes = {
  name: React.PropTypes.shape({
    officialName: React.PropTypes.string
  })
};

export default SchoolTitle;
