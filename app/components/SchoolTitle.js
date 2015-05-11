'use strict';

import React from 'react';

class SchoolTitle extends React.Component {

  render() {
    return (
      <div className='container'>
        <header className='school-title'>
          <div className='school-title-box'>
            <h1>{this.props.name.official_name}</h1>
            <span>
              {this.props.yearsActive.beginYear}
              <i className="fa fa-lg fa-long-arrow-right"/>
              {this.props.yearsActive.endYear}
            </span>
          </div>
        </header>
      </div>
    );
  }
}

SchoolTitle.propTypes = {
  name: React.PropTypes.shape({
      'official_name': React.PropTypes.string
    }),
  yearsActive: React.PropTypes.shape({
      'beginYear': React.PropTypes.number,
      'endYear': React.PropTypes.number
    })
};

export default SchoolTitle;
