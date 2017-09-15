

import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import SearchLoadMore from '../SearchLoadMore';
import SearchActionCreators from '../../actions/SearchActionCreators';

const expect = chai.expect;
chai.use(sinonChai);

describe('SearchLoadMore', () => {
  const props = {
    urls: {
      buildings: null,
      employerships: null,
      schools: 'http://test.url',
    },
    fetchingData: false,
  };
  let element;

  before(() => {
    element = TestUtils.renderIntoDocument(
      <SearchLoadMore {...props} />,
    );
  });

  it('should render without problems', () => {
    expect(element).to.be.ok;
  });

  it('should display the component', () => {
    const component = TestUtils.findRenderedDOMComponentWithClass(element, 'search-load-more');
    expect(component).to.exist;
  });

  describe('on click', () => {
    let loadMoreActionSpy;

    before(() => {
      loadMoreActionSpy = sinon.stub(SearchActionCreators, 'requestLoadMore');
    });

    after(() => {
      loadMoreActionSpy.restore();
    });

    it('should create an action on click', () => {
      const component = TestUtils.findRenderedDOMComponentWithTag(element, 'button');
      TestUtils.Simulate.click(component);
      expect(loadMoreActionSpy).to.have.been.called;
    });

    it('should send the urls to the action on click', () => {
      const component = TestUtils.findRenderedDOMComponentWithTag(element, 'button');
      TestUtils.Simulate.click(component);
      expect(loadMoreActionSpy).to.have.been.calledWith(props.urls);
    });
  });
});
