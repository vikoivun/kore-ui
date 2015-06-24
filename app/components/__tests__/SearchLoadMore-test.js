'use strict';

import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import SearchLoadMore from '../SearchLoadMore';
import SearchActionCreators from '../../actions/SearchActionCreators';

const expect = chai.expect;
chai.use(sinonChai);

describe('SearchLoadMore', function() {
  const props = {
    urls: {
      buildings: null,
      employerships: null,
      schools: 'http://test.url'
    },
    fetchingData: false
  };
  let element;

  before(function() {
    element = TestUtils.renderIntoDocument(
      <SearchLoadMore {...props} />
    );
  });

  it('should render without problems', function() {
    expect(element).to.be.ok;
  });

  it('should display the component', function() {
    const component = TestUtils.findRenderedDOMComponentWithClass(element, 'search-load-more');
    expect(component).to.exist;
  });

  describe('on click', function() {
    let loadMoreActionSpy;

    before(function() {
      loadMoreActionSpy = sinon.stub(SearchActionCreators, 'requestLoadMore');
    });

    after(function() {
      loadMoreActionSpy.restore();
    });

    it('should create an action on click', function() {
      const component = TestUtils.findRenderedDOMComponentWithTag(element, 'button');
      TestUtils.Simulate.click(component);
      expect(loadMoreActionSpy).to.have.been.called;
    });

    it('should send the urls to the action on click', function() {
      const component = TestUtils.findRenderedDOMComponentWithTag(element, 'button');
      TestUtils.Simulate.click(component);
      expect(loadMoreActionSpy).to.have.been.calledWith(props.urls);
    });
  });
});
