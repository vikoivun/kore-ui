'use strict';

import React from 'react';
import InfoTable from './InfoTable';

function getInfoTable(table) {
  return <InfoTable {...table}/>;
}

class SchoolDetails extends React.Component {
  render() {
    const tables = this.props.tables;
    const infoTables = tables.map(getInfoTable);
    return (
      <div className='container'>
        <section className='school-details'>
          {infoTables}
        </section>
      </div>
    );
  }
}

SchoolDetails.propTypes = {
  tables: React.PropTypes.array.isRequired
};

export default SchoolDetails;
