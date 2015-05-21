'use strict';

import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import {expect} from 'chai';
import SchoolTitle from '../SchoolTitle';

describe('SchoolTitle', function() {
  const name = {'official_name': 'River Valley High'};
  const yearsActive = {
    'beginYear': 1995,
    'endYear': 2010
  };
  let element;

  before(function() {
    element = TestUtils.renderIntoDocument(
      <SchoolTitle
        name={name}
        yearsActive={yearsActive}
      />
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
    expect(dom.textContent).to.equal(name.official_name);
  });

  it('should display the year school began operation', function() {
    const yearSpan = TestUtils.findRenderedDOMComponentWithTag(element, 'span');
    const dom = React.findDOMNode(yearSpan);
    expect(dom.textContent).to.contain(yearsActive.beginYear);
  });

  it('should display the year school ended operation', function() {
    const yearSpan = TestUtils.findRenderedDOMComponentWithTag(element, 'span');
    const dom = React.findDOMNode(yearSpan);
    expect(dom.textContent).to.contain(yearsActive.endYear);
  });

  it('should display an arrow between the school years', function() {
    const arrow = TestUtils.scryRenderedDOMComponentsWithClass(element, 'fa-long-arrow-right');
    expect(arrow.length).to.equal(1);
  });
});
