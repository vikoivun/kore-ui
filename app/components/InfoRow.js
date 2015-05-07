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
  name: React.PropTypes.oneOfType([
    React.PropTypes.string.isRequired,
    React.PropTypes.array.isRequired
  ]),
  boxContent: React.PropTypes.oneOfType([
    React.PropTypes.string.isRequired,
    React.PropTypes.array.isRequired
  ]),
  className: React.PropTypes.string.isRequired
};

export default InfoRow;
