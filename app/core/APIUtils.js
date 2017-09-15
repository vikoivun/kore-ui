

import { Schema, arrayOf, normalize } from 'normalizr';
import { camelizeKeys } from 'humps';

const building = new Schema('buildings');
const principal = new Schema('principals');
const schoolBuilding = new Schema('schoolBuildings');
const schoolPrincipal = new Schema('schoolPrincipals');
const school = new Schema('schools');
const employer = new Schema('employer');
const employership = new Schema('employerships');
// We need to define a searchRespone shema so normalizr finds all entities from
// the search results.
const schoolSearchResponse = new Schema('schoolSearchResponse');
const buildingSearchResponse = new Schema('buildingSearchResponse');
const employershipSearchResponse = new Schema('employershipSearchResponse');

schoolBuilding.define({
  building,
  school,
});

schoolPrincipal.define({
  principal,
});

employer.define({
  school,
});

employership.define({
  principal,
  school,
});

principal.define({
  employers: arrayOf(employer),
});

school.define({
  buildings: arrayOf(schoolBuilding),
  principals: arrayOf(schoolPrincipal),
});

schoolSearchResponse.define({
  results: arrayOf(school),
});

buildingSearchResponse.define({
  results: arrayOf(schoolBuilding),
});

employershipSearchResponse.define({
  results: arrayOf(employership),
});

const resultsSchemas = {
  schools: [schoolSearchResponse, 'schoolSearchResponse'],
  buildings: [buildingSearchResponse, 'buildingSearchResponse'],
  employerships: [employershipSearchResponse, 'employershipSearchResponse'],
};

export function normalizeSchoolResponse(response) {
  const camelized = camelizeKeys(response);
  return normalize(camelized, school);
}

export function normalizeSearchResponse(response, resultsContent) {
  const camelized = camelizeKeys(response);
  const resultsSchema = resultsSchemas[resultsContent];
  const normalized = normalize(camelized, resultsSchema[0]);
  // The searchResponse does not have an id so after normalizr the data is behind
  // an undefined property. Let's change that here.
  normalized.entities.searchResponse = normalized.entities[resultsSchema[1]].undefined;
  return normalized;
}
