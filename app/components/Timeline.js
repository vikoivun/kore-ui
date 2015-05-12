'use strict';

import React from 'react';
import ReactSlider from 'react-slider';
import UIActionCreators from '../actions/UIActionCreators';

class Timeline extends React.Component {
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

  componentWillUnmount() {
    UIActionCreators.resetYear();
  }

  handleChange(value) {
    UIActionCreators.updateYear(value);
  }

  render() {
    let endYear = this.props.yearsActive.endYear;
    if (!endYear){
      endYear = new Date().getFullYear();
    }
    let currentYear = this.props.currentYear;
    if (!currentYear) {
      currentYear = endYear;
    }
    return (
      <div className="timeline">
        <div className="anchor anchor-left">
          <span>{this.props.yearsActive.beginYear}</span>
          <div className='separator'>|</div>
        </div>
        <div className="anchor anchor-right">
          <span>{endYear}</span>
          <div className='separator'>|</div>
        </div>
        <ReactSlider
          defaultValue={currentYear}
          min={this.props.yearsActive.beginYear}
          max={endYear}
          className='horizontal-slider'
          onChange={this.handleChange}
          ref='reactSlider'
        >
          <div className='current-year'>
            {currentYear}
          </div>
        </ReactSlider>
      </div>
    );
  }
}

Timeline.propTypes = {
  yearsActive: React.PropTypes.shape({
    'beginYear': React.PropTypes.number,
    'endYear': React.PropTypes.number
  }),
  currentYear: React.PropTypes.number
};

export default Timeline;
