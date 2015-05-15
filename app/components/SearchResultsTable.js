'use strict';

import React from 'react';
import { Link } from 'react-router';

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
    return <p>Yhtään hakutulosta ei löytynyt.</p>;
  }

  render() {
    return (
      <div className='container'>
        {this.renderSearchResults()}
      </div>
    );
  }
}

SearchResultsTable.propTypes = {
  schoolList: React.PropTypes.array.isRequired
};

export default SearchResultsTable;
