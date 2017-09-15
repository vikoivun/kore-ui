

import React from 'react';

import SearchActionCreators from '../actions/SearchActionCreators';

class SearchMapListItem extends React.Component {
  constructor() {
    super();
    this.selectSchool = this.selectSchool.bind(this);
  }

  selectSchool() {
    SearchActionCreators.selectSchool(this.props.school.location.id);
  }

  render() {
    let className = 'info-row details-school-name';
    const selected = this.props.school.location.id === this.props.selectedSchoolId;
    className += selected ? ' selected' : '';
    return (
      <li
        className={className}
        onClick={this.selectSchool}
      >
        <div className="info-name">{this.props.school.name}</div>
      </li>
    );
  }
}

SearchMapListItem.propTypes = {
  school: React.PropTypes.shape({
    id: React.PropTypes.string,
    name: React.PropTypes.string,
  }),
  selectedSchoolId: React.PropTypes.string,
};

export default SearchMapListItem;
