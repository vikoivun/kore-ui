'use strict';

import React from 'react';
import SearchActionCreators from '../actions/SearchActionCreators';

function getInitialState() {
  return {
    query: undefined
  };
}


class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = getInitialState();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);

  }
  handleSubmit() {
    SearchActionCreators.requestSearch(this.state.query);
  }

  handleKeyUp(e) {
    this.setState({query: e.target.value});
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
            <i className="fa fa-lg fa-search"></i>
          </a>
          <input
            className='search-bar'
            onKeyUp={this.handleKeyUp}
            placeholder='Syötä koulun nimi'
          />
        </div>
      </div>
    );
  }
}

SearchBox.propTypes = {

};

export default SearchBox;
