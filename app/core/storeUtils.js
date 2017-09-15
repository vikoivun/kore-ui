

import _ from 'lodash';

function getAssociationData(associationObjects, getter) {
  return _.map(associationObjects, associationObject => getAssociationObject(associationObject, getter));
}

function getAssociationObject(associationObject, getter) {
  const object = getter(associationObject.id);
  return _.assign({}, object, associationObject);
}

function parseAssociationData(associationObjects, associationIds, objectName) {
  let associationObject;
  return _.map(associationIds, (id) => {
    associationObject = associationObjects[id];
    associationObject.id = associationObject[objectName];
    delete associationObject[objectName];
    return associationObject;
  });
}

export default {
  getAssociationData,
  getAssociationObject,
  parseAssociationData,
};
