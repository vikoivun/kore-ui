'use strict';

import React from 'react';
import NavTab from './NavTab';

class Navbar extends React.Component {

  render() {
    return (
      <nav className="navbar navbar-inverse navbar-static-top">
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#navbar"
              aria-expanded="false"
              aria-controls="navbar"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand"><span className="coat-of-arms"/>Koulurekisteri</a>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
                <NavTab to="search">Etsi koulua</NavTab>
                <NavTab to="about">Tietoa palvelusta</NavTab>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
