'use strict';

import React from 'react';
import InfoRow from './InfoRow';

function getInfoRow(item) {
  return <InfoRow {...item}/>;
}

class InfoTable extends React.Component {
  render() {
    const items = this.props.items;
    let halfLength = Math.ceil(items.length / 2);
    let itemsColumnOne = items.slice(0, halfLength);
    let itemsColumnTwo = items.slice(halfLength);
    return (
      <section className='info-table'>
        <header>
          <h2>{this.props.title}</h2>
        </header>
        <div className="info-table-columns">
          <ol className='column column-one'>
            {itemsColumnOne.map(getInfoRow)}
          </ol>
          <ol className='column column-two'>
            {itemsColumnTwo.map(getInfoRow)}
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
