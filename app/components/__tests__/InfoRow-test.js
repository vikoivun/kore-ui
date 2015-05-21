'use strict';

import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import {expect} from 'chai';
import InfoRow from '../InfoRow';

describe('InfoRow', function() {

  let props = {
    boxContent: 'arkisto',
    className: 'test-class',
    items: [],
    name: 'Koulun nimet'
  };
  let element;

  describe('without items', () => {
    before(function() {
      element = TestUtils.renderIntoDocument(
        <InfoRow {...props} />
      );
    });

    it('should render without problems', function() {
      expect(element).to.be.ok;
    });

    it('should display boxContent inside info-box element', function() {
      const infoBox = TestUtils.findRenderedDOMComponentWithClass(element, 'info-box');
      const dom = React.findDOMNode(infoBox);
      expect(dom.textContent).to.equal(props.boxContent);
    });

    it('should display name inside info-name element', function() {
      const infoName = TestUtils.findRenderedDOMComponentWithClass(element, 'info-name');
      const dom = React.findDOMNode(infoName);
      expect(dom.textContent).to.equal(props.name);
    });

    it('should add the given className to the li element', function() {
      const liElement = TestUtils.findRenderedDOMComponentWithTag(element, 'li');
      const dom = React.findDOMNode(liElement);
      expect(dom.classList.contains(props.className)).to.be.true;
    });

    describe('initial state', function() {
      it('expanded should be false', function() {
        expect(element.state.expanded).to.be.false;
      });

      it('expandable should be falsy', function() {
        expect(element.state.expandable).to.not.be.ok;
      });
    });
  });

  describe('with items', () => {
    before(function() {
      props.items = [
        {name: 'Kamppi', boxContent: 'area'},
        {name: 'Alvar Aalto', boxContent: 'architect'}
      ];
      element = TestUtils.renderIntoDocument(
        <InfoRow {...props} />
      );
    });

    it('should add the expandable class to the li element', function() {
      const liElement = TestUtils.findRenderedDOMComponentWithTag(element, 'li');
      const dom = React.findDOMNode(liElement);
      expect(dom.classList.contains('expandable')).to.be.true;
    });

    describe('initial state', function() {
      it('expanded should be false', function() {
        expect(element.state.expanded).to.be.false;
      });

      it('expandable should be truthy', function() {
        expect(element.state.expandable).to.be.ok;
      });
    });
  });
});
