'use strict';

import React from 'react';
import DocumentTitle from 'react-document-title';
import SchoolActionCreators from '../actions/SchoolActionCreators';
import SchoolStore from '../stores/SchoolStore';

function parseSchoolId(props) {
  return parseInt(props.params.schoolId);
}

function getStateFromStores(schoolId) {
  return {
    school: SchoolStore.getSchool(schoolId)
  };
}

class SchoolPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = getStateFromStores(parseSchoolId(props));
    this.schoolDidChange = this.schoolDidChange.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    SchoolStore.addChangeListener(this._onChange);
  }

  componentDidMount() {
    this.schoolDidChange(this.props.params.schoolId);
  }

  componentWillUnmount() {
    SchoolStore.removeChangeListener(this._onChange);
  }

  componentWillReceiveProps(nextProps) {
    if (parseSchoolId(nextProps) !== parseSchoolId(this.props)) {
      this.schoolDidChange(parseSchoolId(nextProps));
    }
  }

  schoolDidChange(schoolId) {
    SchoolActionCreators.requestSchool(schoolId);
  }

  _onChange() {
    this.setState(getStateFromStores(parseSchoolId(this.props)));
  }

  render() {
    return (
      <DocumentTitle title='Koulut - Koulurekisteri'>
        <div className='school-page'>
          <div className='school-title'/>
          <div className='school-timeline'/>
          <div className='school-image-map'/>
          <div className='school-history-details'/>
        </div>
      </DocumentTitle>
    );
  }
}

SchoolPage.propTypes = {
  params: React.PropTypes.shape({
    schoolId: React.PropTypes.string.isRequired
  }).isRequired
};

export default SchoolPage;
