'use strict';

import React from 'react';

import SearchActionCreators from '../actions/SearchActionCreators';

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searchQuery: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  handleSubmit() {
    SearchActionCreators.requestSearch(this.state.searchQuery, this.props.filters);
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
          <a
            className='search-button'
            onClick={this.handleSubmit}
          >
            <i className='fa fa-lg fa-search'></i>
          </a>
          <input
            className='search-bar'
            defaultValue={this.props.searchQuery}
            onKeyUp={this.handleKeyUp}
            placeholder='Syötä koulun nimi'
          />
        </div>
      </div>
    );
  }
}

const filterPropType = React.PropTypes.oneOfType([
  React.PropTypes.number,
  React.PropTypes.string
]);

SearchBox.propTypes = {
  filters: React.PropTypes.shape({
    type: filterPropType,
    field: filterPropType,
    language: filterPropType,
    gender: filterPropType
  }),
  searchQuery: React.PropTypes.string.isRequired
};

export default SearchBox;
