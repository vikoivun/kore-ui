'use strict';

import React from 'react';
import InfoRow from './InfoRow';

function getInfoRow(item) {
  return <InfoRow {...item}/>;
}

class InfoTable extends React.Component {
  render() {
    const items = this.props.items;
    const infoRows = items.map(getInfoRow);

    return (
      <section className='info-table'>
        <header>
          <h2>{this.props.title}</h2>
        </header>
        <ul>
          {infoRows}
        </ul>
      </section>
    );
  }
}

InfoTable.propTypes = {
  title: React.PropTypes.string.isRequired,
  items: React.PropTypes.array.isRequired
};

export default InfoTable;
