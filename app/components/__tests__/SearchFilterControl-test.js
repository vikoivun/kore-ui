'use strict';

import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import SearchFilterControl from '../SearchFilterControl';
import SearchActionCreators from '../../actions/SearchActionCreators';

const expect = chai.expect;
chai.use(sinonChai);

describe('SearchFilterControl', function() {
  let props = {
    name: 'gender',
    options: [],
    resource: 'gender',
    value: null
  };
  let element;
  let requestFilterStub;

  before(function() {
    requestFilterStub = sinon.stub(SearchActionCreators, 'requestFilterOptions');
    element = TestUtils.renderIntoDocument(
      <SearchFilterControl {...props} />
    );
  });

  after(function() {
    requestFilterStub.restore();
  });

  it('should render without problems', function() {
    expect(element).to.be.ok;
  });

  it('should display the component', function() {
    const component = TestUtils.findRenderedDOMComponentWithClass(element, 'filter');
    expect(component).to.exist;
  });

  it('should have render a React-Select element', function() {
    const component = TestUtils.findRenderedDOMComponentWithClass(element, 'Select');
    expect(component).to.exist;
  });

  it('should request for options', function() {
    expect(requestFilterStub).to.have.been.calledWith('gender');
  });

  describe('on handleChange', function() {
    let selectFilterStub;

    before(function() {
      selectFilterStub = sinon.stub(SearchActionCreators, 'selectFilter');
    });

    after(function() {
      selectFilterStub.restore();
    });

    it('should create an action', function() {
      element.handleChange(1);
      expect(selectFilterStub).to.have.been.called;
    });

    it('should send the resource and option to the action', function() {
      element.handleChange(1);
      expect(selectFilterStub).to.have.been.calledWith('gender', 1);
    });

    it('should send null option if it is empty to the action', function() {
      element.handleChange('');
      expect(selectFilterStub).to.have.been.calledWith('gender', null);
    });
  });

  describe('with options', function() {
    const propsWithOptions = {
      name: 'gender',
      options: [
        {
          id: 1,
          name: 'male'
        },
        {
          id: 2,
          name: 'female'
        },
        {
          id: 3,
          name: 'mixed'
        }
      ],
      resource: 'gender',
      value: null
    };

    beforeEach(function() {
      requestFilterStub.reset()
      element = TestUtils.renderIntoDocument(
        <SearchFilterControl {...propsWithOptions} />
      );
    });

    it('should not request for options', function() {
      expect(requestFilterStub).to.have.not.been.called;
    });
  });
});
