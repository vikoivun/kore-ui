

import React from 'react';
import DocumentTitle from 'react-document-title';
import { RouteHandler } from 'react-router';
import './styles/app.less';
import Navbar from './components/Navbar';

class App extends React.Component {
  render() {
    return (
      <DocumentTitle title="Koulurekisteri">
        <div className="app">
          <Navbar />
          <RouteHandler {...this.props} />
          <div className="footer" />
        </div>
      </DocumentTitle>
    );
  }
}

export default App;
