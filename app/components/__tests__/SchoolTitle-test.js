'use strict';

import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import { expect } from 'chai';
import SchoolTitle from '../SchoolTitle';

describe('SchoolTitle', function() {
  it('renders', () => {
    const name = {'official_name': 'River Valley High'};
    const yearsActive = {
      'beginYear': 1995,
      'endYear': 2010
    };

    const element = TestUtils.renderIntoDocument(
      <SchoolTitle
        name={name}
        yearsActive={yearsActive}
      />);
    expect(element).to.be.ok;
  });

  it('should always pass this test', function() {
    const a = 2;
    expect(a).to.equal(2);
  });
});
