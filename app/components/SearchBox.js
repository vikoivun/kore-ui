'use strict';

import _ from 'lodash';
import React from 'react';

import SearchActionCreators from '../actions/SearchActionCreators';
import {getFilterPropType} from '../core/utils';

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searchQuery: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  handleSubmit() {
    let filters = _.clone(this.props.filters);
    filters.fromYear = this.props.years[0];
    filters.untilYear = this.props.years[1];
    SearchActionCreators.requestSearch(this.state.searchQuery, filters);
  }

  handleKeyUp(e) {
    this.setState({searchQuery: e.target.value});
    if (e.keyCode === 13) {
      this.handleSubmit(e);
    }
  }

  render() {
    return (
      <div className='container'>
        <div className='search-box'>
          <button
            className='search-button'
            onClick={this.handleSubmit}
          >
            <i className='fa fa-lg fa-search'></i>
          </button>
          <input
            className='search-bar'
            defaultValue={this.props.searchQuery}
            onKeyUp={this.handleKeyUp}
            placeholder='Etsi koulun nimellä, osoitteella tai rehtorin nimellä'
          />
        </div>
      </div>
    );
  }
}

const filterPropType = getFilterPropType();

SearchBox.propTypes = {
  filters: React.PropTypes.shape({
    type: filterPropType,
    field: filterPropType,
    language: filterPropType,
    gender: filterPropType
  }),
  searchQuery: React.PropTypes.string.isRequired,
  years: React.PropTypes.arrayOf(React.PropTypes.number)
};

export default SearchBox;
