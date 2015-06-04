'use strict';

import React from 'react';
import DocumentTitle from 'react-document-title';
import Loader from 'react-loader';

import SchoolActionCreators from '../actions/SchoolActionCreators';
import UIActionCreators from '../actions/UIActionCreators';
import SchoolDetails from '../components/SchoolDetails';
import SchoolImage from '../components/SchoolImage';
import SchoolMap from '../components/SchoolMap';
import SchoolTimelineInfo from '../components/SchoolTimelineInfo';
import SchoolTitle from '../components/SchoolTitle';
import SchoolStore from '../stores/SchoolStore';
import UIStore from '../stores/UIStore';

function parseSchoolId(props) {
  return parseInt(props.params.schoolId);
}

function parseYear(props) {
  return parseInt(props.params.year);
}

function getStateFromStores(schoolId) {
  let selectedYear = UIStore.getSchoolTimelineYear();
  return {
    fetchingData: SchoolStore.getFetchingData(),
    nameInSelectedYear: SchoolStore.getNameInSelectedYear(schoolId, selectedYear),
    yearsActive: SchoolStore.getBeginAndEndYear(schoolId),
    buildingInSelectedYear: SchoolStore.getBuildingForYear(schoolId, selectedYear),
    schoolDetails: SchoolStore.getSchoolDetails(schoolId),
    schoolYearDetails: SchoolStore.getSchoolYearDetails(
      schoolId,
      selectedYear
    ),
    locationsForSelectedYear: SchoolStore.getLocationsForYear(schoolId, selectedYear),
    selectedYear: selectedYear
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
    UIStore.addChangeListener(this._onChange);
  }

  componentDidMount() {
    this.schoolDidChange(parseSchoolId(this.props), parseYear(this.props));
  }

  componentWillUnmount() {
    SchoolStore.removeChangeListener(this._onChange);
    UIStore.removeChangeListener(this._onChange);
  }

  componentWillReceiveProps(nextProps) {
    if (parseSchoolId(nextProps) !== parseSchoolId(this.props)) {
      this.schoolDidChange(parseSchoolId(nextProps), parseYear(nextProps));
    }
  }

  schoolDidChange(schoolId, year) {
    if (year) {
      UIActionCreators.updateYear(year);
    }
    SchoolActionCreators.requestSchool(schoolId);
  }

  _onChange() {
    this.setState(getStateFromStores(parseSchoolId(this.props)));
  }

  render() {
    return (
      <DocumentTitle title='Koulut - Koulurekisteri'>
        <div className='school-page'>
          <SchoolTitle name={this.state.nameInSelectedYear} />
          <div className='container'>
            <div className='school-image-map'>
              <SchoolImage
                building={this.state.buildingInSelectedYear}
                fetchingData={this.state.fetchingData}
              />
              <div className='school-map'>
                <Loader color='#FFF' loaded={!this.state.fetchingData}>
                  <SchoolMap
                    fetchingData={this.state.fetchingData}
                    locations={this.state.locationsForSelectedYear}
                    selectedYear={
                      this.state.selectedYear ||
                      this.state.yearsActive.endYear ||
                      new Date().getFullYear()
                    }
                  />
                </Loader>
              </div>
            </div>
          </div>
          <SchoolTimelineInfo
            schoolYearDetails={this.state.schoolYearDetails}
            selectedYear={this.state.selectedYear}
            yearsActive={this.state.yearsActive}
          />
          <SchoolDetails details={this.state.schoolDetails} />
        </div>
      </DocumentTitle>
    );
  }
}

SchoolPage.propTypes = {
  params: React.PropTypes.shape({
    schoolId: React.PropTypes.string.isRequired,
    year: React.PropTypes.string
  }).isRequired
};

export default SchoolPage;
