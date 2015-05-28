'use strict';

import React from 'react';

import SearchActionCreators from '../actions/SearchActionCreators';

class SearchMapListItem extends React.Component {
  constructor() {
    super();
    this.selectSchool = this.selectSchool.bind(this);
  }

  selectSchool() {
    SearchActionCreators.selectSchool(this.props.school);
  }

  render() {
    let className = 'info-row details-school-name';
    const selected = this.props.school.id === this.props.selectedSchool;
    className += selected ? ' selected' : '';
    return (
      <li
        className={className}
        onClick={this.selectSchool}
      >
        <div className='info-name'>{this.props.school.name.officialName}</div>
      </li>
    );
  }
}

SearchMapListItem.propTypes = {
  school: React.PropTypes.shape({
    id: React.PropTypes.number,
    name: React.PropTypes.shape({
      officialName: React.PropTypes.string
    })
  }),
  selectedSchool: React.PropTypes.number
};

export default SearchMapListItem;
