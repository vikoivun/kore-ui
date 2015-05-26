'use strict';

import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import SearchViewControl from '../SearchViewControl';
import SearchActionCreators from '../../actions/SearchActionCreators';

const expect = chai.expect;
chai.use(sinonChai);

describe('SearchViewControl', function() {
  let props = {
    children: <i className='fa fa-lg fa-th-large'></i>,
    selected: false,
    view: 'grid',
    key: 'grid'
  };
  let element;

  before(function() {
    element = TestUtils.renderIntoDocument(
      <SearchViewControl {...props} />
    );
  });

  it('should render without problems', function() {
    expect(element).to.be.ok;
  });

  it('should display the component', function() {
    const component = TestUtils.findRenderedDOMComponentWithTag(element, 'button');
    expect(component).to.exist;
  });

  it('should have the class view-selector', function() {
    const component = TestUtils.findRenderedDOMComponentWithClass(element, 'view-selector');
    expect(component).to.exist;
  });

  describe('which is selected', function() {
    props.selected = true;

    it('should render the class selected', function() {
      const component = TestUtils.findRenderedDOMComponentWithClass(element, 'selected');
      expect(component).to.exist;
    });

  });

  describe('on click', function() {
    let selectViewStub;

    before(function() {
      selectViewStub = sinon.stub(SearchActionCreators, 'selectView');
    });

    after(function() {
      selectViewStub.restore();
    });

    it('should create an action', function() {
      const component = TestUtils.findRenderedDOMComponentWithTag(element, 'button');
      TestUtils.Simulate.click(component);
      expect(selectViewStub).to.have.been.called;
    });

    it('should send the view name to the action', function() {
      const component = TestUtils.findRenderedDOMComponentWithTag(element, 'button');
      TestUtils.Simulate.click(component);
      expect(selectViewStub).to.have.been.calledWith(props.view);
    });
  });
});
