'use strict';

import React from 'react';

import SearchActionCreators from '../actions/SearchActionCreators';

class SearchViewControl extends React.Component {
  handleClick(e) {
    SearchActionCreators.selectView(e.currentTarget.dataset.view);
  }

  render() {
    let className = 'view-selector';
    if (this.props.selected) {
      className += ' selected';
    }
    return (
      <button
        className={className}
        data-view={this.props.view}
        onClick={this.handleClick}
      >
        {this.props.children}
      </button>
    );
  }
}

SearchViewControl.propTypes = {
  children: React.PropTypes.element.isRequired,
  selected: React.PropTypes.bool,
  view: React.PropTypes.string.isRequired
};

export default SearchViewControl;
