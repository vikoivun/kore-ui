'use strict';

import _ from 'lodash';
import React from 'react';
import InfoTable from './InfoTable';


const itemGenerator = {
  schoolNames: function(names) {
    return {
      key: 'school-names',
      title: 'Koulun nimet',
      expandable: false,
      items: names.map(function(name, index) {
        return {
          key: 'school-name-' + index,  // This could better be the ID if retreived from API.
          className: 'details-school-name',
          name: name.official_name,
          boxContent: [
            name.begin_year,
            <i className='fa fa-lg fa-long-arrow-right'/>,
            name.end_year
          ]
        };
      })
    };
  },
  buildings: function(buildings) {
    return {
      key: 'buildings',
      title: 'Rakennukset ja sijainnit',
      expandable: true,
      items: buildings.map(function(building, index) {
        return {
          key: 'building-' + index,  // This could be the ID if retreived from API.
          className: 'details-building',
          name: [
            building.building.addresses[0].street_name_fi,
            ', ',
            building.building.addresses[0].municipality_fi
          ],
          boxContent: [
            building.begin_year,
            <i className='fa fa-lg fa-long-arrow-right'/>,
            building.end_year
          ],
          items: [
            {
              key: 'neighborhood-' + index,
              name: building.building.neighborhood,
              boxContent: 'alue'
            },
            {
              key: 'architect-' + index,
              name: building.building.architect,
              boxContent: 'arkkitehti'
            }
          ]
        };
      })
    };
  }
};

function getInfoTable(table) {
  return <InfoTable {...table}/>;
}

class SchoolDetails extends React.Component {
  render() {
    const details = this.props.details;
    const infoTables = _.map(details, function(list, key) {
      return getInfoTable(itemGenerator[key](list));
    });
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
  details: React.PropTypes.shape({
    schoolNames: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        'official_name': React.PropTypes.string,
        'begin_year': React.PropTypes.number,
        'end_year': React.PropTypes.number
      })
    ),
    buildings: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        'begin_year': React.PropTypes.number,
        'end_year': React.PropTypes.number,
        building: React.PropTypes.shape({
          neighborhood: React.PropTypes.string,
          architect: React.PropTypes.string,
          addresses: React.PropTypes.arrayOf(
            React.PropTypes.shape({
              'street_name_fi': React.PropTypes.string,
              'municipality_fi': React.PropTypes.string
            })
          )
        })
      })
    )
  })
};

export default SchoolDetails;
