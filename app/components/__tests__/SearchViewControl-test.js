

import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import SearchViewControl from '../SearchViewControl';
import SearchActionCreators from '../../actions/SearchActionCreators';

const expect = chai.expect;
chai.use(sinonChai);

describe('SearchViewControl', () => {
  const props = {
    children: <i className="fa fa-lg fa-th-large" />,
    selected: false,
    view: 'grid',
    key: 'grid',
  };
  let element;

  before(() => {
    element = TestUtils.renderIntoDocument(
      <SearchViewControl {...props} />,
    );
  });

  it('should render without problems', () => {
    expect(element).to.be.ok;
  });

  it('should display the component', () => {
    const component = TestUtils.findRenderedDOMComponentWithTag(element, 'button');
    expect(component).to.exist;
  });

  it('should have the class view-selector', () => {
    const component = TestUtils.findRenderedDOMComponentWithClass(element, 'view-selector');
    expect(component).to.exist;
  });

  describe('which is selected', () => {
    props.selected = true;

    it('should render the class selected', () => {
      const component = TestUtils.findRenderedDOMComponentWithClass(element, 'selected');
      expect(component).to.exist;
    });
  });

  describe('on click', () => {
    let selectViewStub;

    before(() => {
      selectViewStub = sinon.stub(SearchActionCreators, 'selectView');
    });

    after(() => {
      selectViewStub.restore();
    });

    it('should create an action', () => {
      const component = TestUtils.findRenderedDOMComponentWithTag(element, 'button');
      TestUtils.Simulate.click(component);
      expect(selectViewStub).to.have.been.called;
    });

    it('should send the view name to the action', () => {
      const component = TestUtils.findRenderedDOMComponentWithTag(element, 'button');
      TestUtils.Simulate.click(component);
      expect(selectViewStub).to.have.been.calledWith(props.view);
    });
  });
});
