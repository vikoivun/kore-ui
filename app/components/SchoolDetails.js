'use strict';

import _ from 'lodash';
import React from 'react';

import InfoTable from './InfoTable';
import {
  getAddressString,
  getAddressStringFromBuilding,
  getArchiveName,
  getBoxContent,
  inBetween
} from '../core/utils';

const itemGenerator = {
  archives: function(archives, selectedYear) {
    return _.map(archives, function(archive, index) {
      return {
        boxContent: getBoxContent(archive),
        className: 'details-archive',
        key: 'school-archive-' + index,
        name: getArchiveName(archive),
        highlight: inBetween(selectedYear, archive.beginYear, archive.endYear)
      };
    }).reverse();
  },
  buildings: function(buildings, selectedYear) {
    return _.map(buildings, function(building) {
      let items = [
        {
          key: 'architect-of-building-' + building.id,
          name: building.architect,
          boxContent: 'arkkitehti'
        },
        {
          key: 'neighborhood-of-building-' + building.id,
          name: building.neighborhood,
          boxContent: 'alue'
        }
      ];
      if (building.addresses && building.addresses.length > 1) {
        _.each(building.addresses.reverse(), function(address) {
          items.push({
            key: 'building-details-address-' + address.id,
            name: getAddressString(address),
            boxContent: getBoxContent(address)
          });
        });
      }
      return {
        boxContent: getBoxContent(building),
        className: 'details-building',
        items: items,
        key: 'building-' + building.id,
        name: getAddressStringFromBuilding(building),
        highlight: inBetween(selectedYear, building.beginYear, building.endYear)
      };
    }).reverse();
  },
  fields: function(fields, selectedYear) {
    return _.map(fields, function(field, index) {
      return {
        boxContent: getBoxContent(field),
        className: 'details-field',
        key: 'school-field-' + index,
        name: field.field.name,
        highlight: inBetween(selectedYear, field.beginYear, field.endYear)
      };
    }).reverse();
  },
  genders: function(genders, selectedYear) {
    return _.map(genders, function(gender, index) {
      return {
        boxContent: getBoxContent(gender),
        className: 'details-gender',
        key: 'school-gender-' + index,
        name: gender.gender,
        highlight: inBetween(selectedYear, gender.beginYear, gender.endYear)
      };
    }).reverse();
  },
  languages: function(languages, selectedYear) {
    return _.map(languages, function(language) {
      return {
        boxContent: getBoxContent(language),
        className: 'details-language',
        key: 'school-language-' + language.id,
        name: language.language,
        highlight: inBetween(selectedYear, language.beginYear, language.endYear)
      };
    }).reverse();
  },
  names: function(names, selectedYear) {
    return _.map(names, function(name) {
      return {
        boxContent: getBoxContent(name),
        className: 'details-school-name',
        key: 'school-name-' + name.id,
        name: name.officialName,
        highlight: inBetween(selectedYear, name.beginYear, name.endYear)
      };
    }).reverse();
  },
  principals: function(principals, selectedYear) {
    return _.map(principals, function(principal) {
      return {
        boxContent: getBoxContent(principal),
        className: 'details-principal',
        key: 'principal-' + principal.id,
        name: principal.name,
        highlight: inBetween(selectedYear, principal.beginYear, principal.endYear)
      };
    }).reverse();
  },
  types: function(types, selectedYear) {
    return _.map(types, function(type, index) {
      return {
        boxContent: getBoxContent(type),
        className: 'details-building',
        key: 'school-type-' + index,
        name: type.type.name,
        highlight: inBetween(selectedYear, type.beginYear, type.endYear)
      };
    }).reverse();
  }
};

class SchoolDetails extends React.Component {
  render() {
    const details = this.props.details;
    const selectedYear = details.selectedYear;
    const schoolTypeGroup = itemGenerator.types(details.types, selectedYear).concat(
      itemGenerator.fields(details.fields, selectedYear),
      itemGenerator.languages(details.languages, selectedYear),
      itemGenerator.genders(details.genders, selectedYear)
    );
    let buildingsLeadText = '';
    if (details.buildings) {
      buildingsLeadText = `Koulu on toiminut ${details.buildings.length} rakennuksessa.`;
    }
    return (
      <div className='container'>
        <section className='school-details'>
          <header>
            <h2>Koulun historia</h2>
            <p className='lead'>
              Historiatiedoista on korostettu aikajanalta valittuna vuotena voimassa olleet tiedot.
            </p>
          </header>
          <InfoTable
            expandable={false}
            items={itemGenerator.names(details.names, selectedYear)}
            title={'Koulun nimet'}
          />
          <InfoTable
            expandable={true}
            items={itemGenerator.buildings(details.buildings, selectedYear)}
            lead={buildingsLeadText}
            title={'Rakennukset ja sijainnit'}
          />
          <InfoTable
            expandable={true}
            items={schoolTypeGroup}
            title={'Koulutyyppi'}
          />
          <InfoTable
            expandable={true}
            items={itemGenerator.principals(details.principals, selectedYear)}
            title={'Rehtorit'}
          />
          <InfoTable
            expandable={true}
            items={itemGenerator.archives(details.archives, selectedYear)}
            title={'Arkistot'}
          />
        </section>
      </div>
    );
  }
}

SchoolDetails.propTypes = {
  details: React.PropTypes.shape({
    archives: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        beginYear: React.PropTypes.number,
        endYear: React.PropTypes.number,
        location: React.PropTypes.string
      })
    ),
    buildings: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        beginYear: React.PropTypes.number,
        building: React.PropTypes.shape({
          addresses: React.PropTypes.arrayOf(
            React.PropTypes.shape({
              municipalityFi: React.PropTypes.string,
              streetNameFi: React.PropTypes.string
            })
          ),
          architect: React.PropTypes.string,
          neighborhood: React.PropTypes.string
        }),
        endYear: React.PropTypes.number
      })
    ),
    fields: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        beginYear: React.PropTypes.number,
        endYear: React.PropTypes.number,
        field: React.PropTypes.shape({
          description: React.PropTypes.string
        })
      })
    ),
    genders: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        beginYear: React.PropTypes.number,
        endYear: React.PropTypes.number,
        gender: React.PropTypes.string
      })
    ),
    languages: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        beginYear: React.PropTypes.number,
        endYear: React.PropTypes.number,
        language: React.PropTypes.string
      })
    ),
    names: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        beginYear: React.PropTypes.number,
        endYear: React.PropTypes.number,
        officialName: React.PropTypes.string
      })
    ),
    principals: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        beginYear: React.PropTypes.number,
        endYear: React.PropTypes.number,
        name: React.PropTypes.string
      })
    ),
    types: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        beginYear: React.PropTypes.number,
        endYear: React.PropTypes.number,
        type: React.PropTypes.shape({
          name: React.PropTypes.string
        })
      })
    )
  })
};

export default SchoolDetails;
