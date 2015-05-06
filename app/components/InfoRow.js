'use strict';

import React from 'react';

class InfoRow extends React.Component {

  render() {
    let composedClass = 'info-row ' + this.props.className;
    return (
      <li className={composedClass}>
        <div className='info-box'>{this.props.boxContent}</div>
        <div className='info-name'>{this.props.name}</div>
      </li>
    );
  }
}

InfoRow.propTypes = {
  name: React.PropTypes.string.isRequired,
  boxContent: React.PropTypes.string.isRequired,
  className: React.PropTypes.string.isRequired
};

export default InfoRow;
