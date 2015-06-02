'use strict';

import _ from 'lodash';
import React from 'react';
import InfoTable from './InfoTable';
import {getAddressArrayFromBuilding, getBoxContent} from '../core/utils';

const itemGenerator = {
  archives: function(archives) {
    return _.map(archives, function(archive, index) {
      return {
        key: 'school-archive-' + index,
        className: 'details-archive',
        name: archive.location,
        boxContent: getBoxContent(archive)
      };
    }).reverse();
  },
  buildings: function(buildings) {
    return _.map(buildings, function(building) {
      return {
        key: 'building-' + building.id,
        className: 'details-building',
        name: getAddressArrayFromBuilding(building),
        boxContent: getBoxContent(building),
        items: [
          {
            key: 'neighborhood-of-building-' + building.id,
            name: building.neighborhood,
            boxContent: 'alue'
          },
          {
            key: 'architect-of-building-' + building.id,
            name: building.architect,
            boxContent: 'arkkitehti'
          }
        ]
      };
    }).reverse();
  },
  fields: function(fields) {
    return _.map(fields, function(field, index) {
      return {
        key: 'school-field-' + index,
        className: 'details-field',
        name: field.field.description,
        boxContent: getBoxContent(field)
      };
    }).reverse();
  },
  genders: function(genders) {
    return _.map(genders, function(gender, index) {
      return {
        key: 'school-gender-' + index,
        className: 'details-gender',
        name: gender.gender,
        boxContent: getBoxContent(gender)
      };
    }).reverse();
  },
  languages: function(languages) {
    return _.map(languages, function(language) {
      return {
        key: 'school-language-' + language.id,
        className: 'details-language',
        name: language.language,
        boxContent: getBoxContent(language)
      };
    }).reverse();
  },
  names: function(names) {
    return _.map(names, function(name) {
      return {
        key: 'school-name-' + name.id,
        className: 'details-school-name',
        name: name.officialName,
        boxContent: getBoxContent(name)
      };
    }).reverse();
  },
  principals: function(principals) {
    return _.map(principals, function(principal) {
      return {
        key: 'principal-' + principal.id,
        className: 'details-principal',
        name: principal.name,
        boxContent: getBoxContent(principal)
      };
    }).reverse();
  },
  types: function(types) {
    return _.map(types, function(type, index) {
      return {
        key: 'school-type-' + index,
        className: 'details-building',
        name: type.type.name,
        boxContent: getBoxContent(type)
      };
    }).reverse();
  }
};

class SchoolDetails extends React.Component {
  render() {
    const details = this.props.details;
    const schoolTypeGroup = itemGenerator.fields(details.fields).concat(
      itemGenerator.languages(details.languages),
      itemGenerator.genders(details.genders)
    );
    return (
      <div className='container'>
        <section className='school-details'>
          <InfoTable
            expandable={false}
            items={itemGenerator.names(details.names)}
            title={'Koulun nimet'}
          />
          <InfoTable
            expandable={true}
            items={itemGenerator.buildings(details.buildings)}
            title={'Rakennukset ja sijainnit'}
          />
          <InfoTable
            expandable={true}
            items={itemGenerator.archives(details.archives)}
            title={'Arkistot'}
          />
          <InfoTable
            expandable={true}
            items={itemGenerator.principals(details.principals)}
            title={'Rehtorit'}
          />
          <InfoTable
            expandable={true}
            items={itemGenerator.types(details.types)}
            title={'Koulun tyypit'}
          />
          <InfoTable
            expandable={true}
            items={schoolTypeGroup}
            title={'Koulutyyppi'}
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
