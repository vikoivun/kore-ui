/*eslint-disable no-var*/
'use strict';

jest.dontMock('../Navbar.react');
var React = require('react/addons');
var Navbar = require('../Navbar.react');
var TestUtils = React.addons.TestUtils;

describe('Navbar', function() {
  it('sets a correct class name', function() {
    var Component = TestUtils.renderIntoDocument(React.createElement(Navbar));
    var element = TestUtils.findRenderedDOMComponentWithClass(Component, 'navbar');
    expect(element).toBeDefined();
  });
});
