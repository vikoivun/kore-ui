'use strict';

import _ from 'lodash';
import React from 'react';
import Loader from 'react-loader';
import {Link} from 'react-router';

import SearchLoadMore from './SearchLoadMore';

class SearchTableView extends React.Component {

  getSchoolLink(result) {
    let linkProps = {
      params: {schoolId: result.schoolId},
      to: 'school'
    };
    if (result.beginYear) {
      linkProps.params.year = result.beginYear;
      linkProps.to = 'school-with-year';
    }
    return (
      <Link {...linkProps}>{result.name}</Link>
    );
  }

  getTableRow(result) {
    return (
      <tr key={result.id}>
        <td>{this.getSchoolLink(result)}</td>
        <td>{result.type}-{result.id}</td>
        <td>{result.principalName}{result.extraInfo}</td>
        <td>
          {result.beginYear}
          <i className='fa fa-lg fa-long-arrow-right'/>
          {result.endYear}
        </td>
      </tr>
    );
  }

  getTableRows() {
    const buildingResults = _.map(
      this.props.buildingResults, (result) => this.getTableRow(result)
    );
    const nameResults = _.map(
      this.props.nameResults, (result) => this.getTableRow(result)
    );
    const principalResults = _.map(
      this.props.principalResults, (result) => this.getTableRow(result)
    );
    return nameResults.concat(principalResults, buildingResults);
  }

  renderSearchResults(resultsLength) {
    if (resultsLength) {
      return (
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>Koulu</th>
              <th>Id</th>
              <th>Lisätiedot</th>
              <th>Vuodet</th>
            </tr>
          </thead>
          <tbody>
            {this.getTableRows()}
          </tbody>
        </table>
      );
    } else {
      return <p>Yhtään hakutulosta ei löytynyt.</p>;
    }
  }

  render() {
    const resultsLength = (
      this.props.buildingResults.length +
      this.props.nameResults.length +
      this.props.principalResults
    );
    const loading = this.props.fetchingData && resultsLength;
    let loadMore;
    if (!_.isEmpty(this.props.nextPagesUrlDict)) {
      loadMore = (
        <SearchLoadMore
          fetchingData={this.props.fetchingData}
          urls={this.props.nextPagesUrlDict}
        />
      );
    }
    if (this.props.somethingWasSearched) {
      return (
        <Loader loaded={!loading}>
          {this.renderSearchResults(resultsLength)}
          {loadMore}
        </Loader>
      );
    }
    return <p>Etsi kouluja syöttämällä koulun nimi tai osoite yllä olevaan hakukenttään.</p>;
  }
}

SearchTableView.propTypes = {
  buildingResults: React.PropTypes.array.isRequired,
  fetchingData: React.PropTypes.bool,
  nameResults: React.PropTypes.array.isRequired,
  nextPagesUrlDict: React.PropTypes.objectOf(React.PropTypes.string),
  principalResults: React.PropTypes.array.isRequired,
  somethingWasSearched: React.PropTypes.bool.isRequired
};

export default SearchTableView;
