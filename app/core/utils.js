'use strict';

function* enumerate(obj) {
  for (let key of Object.keys(obj)) {
    yield [key, obj[key]];
  }
}

export default {
  enumerate: enumerate
};
