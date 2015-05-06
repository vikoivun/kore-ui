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
    let halfLength = Math.ceil(infoRows.length / 2);
    console.log(halfLength);
    let infoRowsColumnOne = infoRows.slice(0, halfLength);
    let infoRowsColumnTwo = infoRows.slice(halfLength);
    return (
      <section className='info-table'>
        <header>
          <h2>{this.props.title}</h2>
        </header>
        <div className="info-table-columns">
          <ol className='column column-one'>
            {infoRowsColumnOne}
          </ol>
          <ol className='column column-two'>
            {infoRowsColumnTwo}
          </ol>
        </div>
      </section>
    );
  }
}

InfoTable.propTypes = {
  title: React.PropTypes.string.isRequired,
  items: React.PropTypes.array.isRequired
};

export default InfoTable;
