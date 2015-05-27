'use strict';

import React from 'react';
import Loader from 'react-loader';

function getListRow(school) {
  return (
    <li key={school.id}>
      {school.name.officialName}
    </li>
  );
}

class SearchMapList extends React.Component {
  renderSearchResults() {
    if (this.props.schoolList.length) {
      return (
        <ul>
          {this.props.schoolList.map(getListRow)}
        </ul>
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

SearchMapList.propTypes = {
  fetchingData: React.PropTypes.bool,
  schoolList: React.PropTypes.array.isRequired,
  somethingWasSearched: React.PropTypes.bool.isRequired
};

export default SearchMapList;
