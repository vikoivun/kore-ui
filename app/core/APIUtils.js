'use strict';

import {Schema, arrayOf, normalize} from 'normalizr';
import {camelizeKeys} from 'humps';

const building = new Schema('buildings');
const principal = new Schema('principals');
const schoolBuilding = new Schema('schoolBuildings');
const schoolPrincipal = new Schema('schoolPrincipals');
const school = new Schema('schools');
// We need to define a searchRespone shema so normalizr finds all entities from
// the search results.
const searchResponse = new Schema('searchResponse');

schoolBuilding.define({
  building: building
});

schoolPrincipal.define({
  principal: principal
});

school.define({
  buildings: arrayOf(schoolBuilding),
  principals: arrayOf(schoolPrincipal)
});

searchResponse.define({
  results: arrayOf(school)
});

export function normalizeSchoolResponse(response) {
  const camelized = camelizeKeys(response);
  return normalize(camelized, school);
}

export function normalizeSearchResponse(response) {
  const camelized = camelizeKeys(response);
  let normalized = normalize(camelized, searchResponse);
  // The searchResponse does not have an id so after normalizr the data is behind
  // an undefined property. Let's change that here.
  normalized.entities.searchResponse = normalized.entities.searchResponse.undefined;
  return normalized;
}
