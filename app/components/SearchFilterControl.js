'use strict';

import _ from 'lodash';
import React from 'react';
import ReactSelect from 'react-select';

import SearchActionCreators from '../actions/SearchActionCreators';

class SearchFilterControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  processOptions() {
    return _.map(
      _.filter(this.props.options, 'name'),
      function(option) {
        return {
          label: option.name,
          value: String(option.id)
        };
      }
    );
  }

  handleChange(newValue) {
    if (newValue === '') {
      newValue = null;
    }
    SearchActionCreators.selectFilter(this.props.resource, newValue);
  }

  render() {
    return (
      <div className='filter'>
        <ReactSelect
          name={this.props.name}
          noResultsText=''
          onChange={this.handleChange}
          options={this.processOptions()}
          placeholder={this.props.name}
          searchable={false}
          value={this.props.value}
        />
      </div>
    );
  }
}

SearchFilterControl.propTypes = {
  name: React.PropTypes.string,
  options: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      id: React.PropTypes.oneOfType(
        React.PropTypes.number,
        React.PropTypes.string
      ),
      description: React.PropTypes.string,
      name: React.PropTypes.string
    })
  ),
  resource: React.PropTypes.string.isRequired,
  value: React.PropTypes.string
};

export default SearchFilterControl;
