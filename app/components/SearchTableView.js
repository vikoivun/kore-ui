'use strict';

import React from 'react';
import {Link} from 'react-router';
import Loader from 'react-loader';

class SearchTableView extends React.Component {

  getTableRows() {
    return this.props.schoolList.map(function(school) {
      return (
        <tr key={school.id}>
          <td>
            <Link params={{schoolId: school.id}} to='school'>{school.name.officialName}</Link>
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
    } else {
      return <p>Yhtään hakutulosta ei löytynyt.</p>;
    }
  }

  render() {
    const loading = this.props.fetchingData && (this.props.schoolList.length === 0);
    if (this.props.somethingWasSearched) {
      return (
        <Loader loaded={!loading}>
          {this.renderSearchResults()}
        </Loader>
      );
    }
    return <p>Etsi kouluja syöttämällä koulun nimi tai osoite yllä olevaan hakukenttään.</p>;
  }
}

SearchTableView.propTypes = {
  fetchingData: React.PropTypes.bool,
  schoolList: React.PropTypes.array.isRequired,
  somethingWasSearched: React.PropTypes.bool.isRequired
};

export default SearchTableView;
