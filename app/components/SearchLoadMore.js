'use strict';

import React from 'react';
import SearchActionCreators from '../actions/SearchActionCreators';
import Loader from 'react-loader';

class SearchLoadMore extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    SearchActionCreators.requestLoadMore(this.props.url);
  }

  render() {
    return (
      <div className='container'>
        <div className='search-load-more'>
          <button onClick={this.handleClick}>
            <Loader loaded={!this.props.fetchingData} color='#FFF'>
              Näytä lisää kouluja
            </Loader>
          </button>
        </div>
      </div>
    );
  }
}

SearchLoadMore.propTypes = {
  fetchingData: React.PropTypes.bool,
  url: React.PropTypes.string.isRequired
};

export default SearchLoadMore;
