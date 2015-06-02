'use strict';

import React from 'react';
import ReactSlider from 'react-slider';

import SearchActionCreators from '../actions/SearchActionCreators';
import {SEARCH_TIMELINE_STARTING_YEAR} from '../constants/AppConstants';

const years = [SEARCH_TIMELINE_STARTING_YEAR, new Date().getFullYear()];

class SearchTimeline extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.refs.reactSlider._handleResize();
  }

  componentDidUpdate() {
    this.refs.reactSlider._handleResize();
  }

  handleChange(value) {
    SearchActionCreators.selectYears(value);
  }

  render() {
    let filteredYears = [
      this.props.years[0] || years[0],
      this.props.years[1] || years[1]
    ];

    return (
      <div className='container'>
        <div className='search-timeline'>
          <div className='timeline'>
            <div className='anchor anchor-left'>
              <span>{years[0]}</span>
              <div className='separator'>|</div>
            </div>
            <div className='anchor anchor-right'>
              <span>{years[1]}</span>
              <div className='separator'>|</div>
            </div>
            <ReactSlider
              className='horizontal-slider'
              defaultValue={filteredYears}
              max={years[1]}
              min={years[0]}
              minDistance={0}
              onChange={this.handleChange}
              pearling={true}
              ref='reactSlider'
              withBars={true}
            >
              <div className='current-year begin-year'>
                {filteredYears[0]}
              </div>
              <div className='current-year end-year'>
                {filteredYears[1]}
              </div>
            </ReactSlider>
          </div>
        </div>
      </div>
    );
  }
}

SearchTimeline.propTypes = {
  years: React.PropTypes.arrayOf(React.PropTypes.number)
};

export default SearchTimeline;
