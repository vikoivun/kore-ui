'use strict';

import React from 'react';
import {Link} from 'react-router';
import NavTab from './NavTab';

class Navbar extends React.Component {

  handleCollapse() {
    document.getElementById('navbar').classList.toggle('in');
  }

  render() {
    return (
      <nav className='navbar navbar-inverse navbar-static-top'>
        <div className='container'>
          <div className='navbar-header'>
            <button
              aria-controls='navbar'
              aria-expanded='false'
              className='navbar-toggle collapsed'
              data-target='#navbar'
              data-toggle='collapse'
              onClick={this.handleCollapse}
              type='button'
            >
              <span className='sr-only'>Toggle navigation</span>
              <span className='icon-bar'></span>
              <span className='icon-bar'></span>
              <span className='icon-bar'></span>
            </button>
            <Link className='navbar-brand' to='search'>
              <span className='coat-of-arms'/>
              Koulurekisteri
            </Link>
          </div>
          <div className='navbar-collapse collapse' id='navbar'>
            <ul className='nav navbar-nav'>
              <NavTab to='search'>Etsi koulua</NavTab>
              <NavTab to='about'>Tietoa palvelusta</NavTab>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
