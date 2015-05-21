'use strict';

import React from 'react';
import {Link} from 'react-router';
import Loader from 'react-loader';

class SearchResultsTable extends React.Component {

  getTableRows() {
    return this.props.schoolList.map(function(school) {
      return (
        <tr key={school.id}>
          <td>
            <Link to='school' params={{schoolId: school.id}}>{school.name}</Link>
          </td>
          <td>{school.address}</td>
        </tr>
      );
    });
  }

  renderSearchResults() {
    if (this.props.schoolList.length) {
      return (
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>Koulu</th>
              <th>Osoite</th>
            </tr>
          </thead>
          <tbody>
            {this.getTableRows()}
          </tbody>
        </table>
      );
    }

    if (this.props.somethingWasSearched) {
      return <p>Yhtään hakutulosta ei löytynyt.</p>;
    }

    return <p>Etsi kouluja syöttämällä koulun nimi tai osoite yllä olevaan hakukenttään.</p>;
  }

  render() {
    return (
      <div className='container'>
        <Loader loaded={!this.props.fetchingData}>
          {this.renderSearchResults()}
        </Loader>
      </div>
    );
  }
}

SearchResultsTable.propTypes = {
  fetchingData: React.PropTypes.bool,
  somethingWasSearched: React.PropTypes.bool.isRequired,
  schoolList: React.PropTypes.array.isRequired
};

export default SearchResultsTable;
