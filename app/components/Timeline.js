

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
    if (!endYear) {
      endYear = new Date().getFullYear();
    }
    let selectedYear = this.props.selectedYear;
    if (!selectedYear) {
      selectedYear = endYear;
    }
    return (
      <div className="timeline inversed">
        <div className="anchor anchor-left">
          <span>{this.props.yearsActive.beginYear}</span>
          <div className="separator">|</div>
        </div>
        <div className="anchor anchor-right">
          <span>{endYear}</span>
          <div className="separator">|</div>
        </div>
        <ReactSlider
          className="horizontal-slider"
          defaultValue={selectedYear}
          max={endYear}
          min={this.props.yearsActive.beginYear}
          onChange={this.handleChange}
          ref="reactSlider"
        >
          <div className="selected-year">
            {selectedYear}
          </div>
        </ReactSlider>
        <div className="help-text">
          Tarkastele koulun vaiheita liikuttamalla aikajanan palloa.
        </div>
      </div>
    );
  }
}

Timeline.propTypes = {
  selectedYear: React.PropTypes.number,
  yearsActive: React.PropTypes.shape({
    beginYear: React.PropTypes.number,
    endYear: React.PropTypes.number,
  }),
};

export default Timeline;
