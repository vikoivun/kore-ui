'use strict';

import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import {expect} from 'chai';
import SchoolTitle from '../SchoolTitle';

describe('SchoolTitle', function() {
  const name = {officialName: 'River Valley High'};
  let element;

  before(function() {
    element = TestUtils.renderIntoDocument(
      <SchoolTitle name={name} />
    );
  });

  it('should render without problems', function() {
    expect(element).to.be.ok;
  });

  it('should display the component', function() {
    const component = TestUtils.scryRenderedDOMComponentsWithClass(element, 'school-title');
    expect(component.length).to.equal(1);
  });

  it('should display school name in h1 tag', function() {
    const header = TestUtils.findRenderedDOMComponentWithTag(element, 'h1');
    const dom = React.findDOMNode(header);
    expect(dom.textContent).to.equal(name.officialName);
  });
});
