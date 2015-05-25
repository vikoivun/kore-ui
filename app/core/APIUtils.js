'use strict';

import {Schema, arrayOf, normalize} from 'normalizr';

const principal = new Schema('principals');
const schoolPrincipal = new Schema('schoolPrincipals');
const school = new Schema('schools');
// We need to define a searchRespone shema so normalizr finds all entities from
// the search results.
const searchResponse = new Schema('searchResponse');

schoolPrincipal.define({
  principal: principal
});

school.define({
  principals: arrayOf(schoolPrincipal)
});

searchResponse.define({
  results: arrayOf(school)
});

export function normalizeSchoolResponse(response) {
  return normalize(response, school);
}

export function normalizeSearchResponse(response) {
  let normalized = normalize(response, searchResponse);
  // The searchResponse does not have an id so after normalizr the data is behind
  // an undefined property. Let's change that here.
  normalized.entities.searchResponse = normalized.entities.searchResponse.undefined;
  return normalized;
}
