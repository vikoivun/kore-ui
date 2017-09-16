import React from 'react';
import { Link } from 'react-router';

class NavTab extends React.Component {
  render() {
    const isActive = this.context.router.isActive(
      this.props.to,
      this.props.params,
      this.props.query
    );
    const className = isActive ? 'active' : '';
    const link = (
      <Link {...this.props} />
    );
    return <li className={className}>{link}</li>;
  }
}

NavTab.contextTypes = {
  router: React.PropTypes.func.isRequired,
};

NavTab.propTypes = {
  params: React.PropTypes.object,
  query: React.PropTypes.object,
  to: React.PropTypes.oneOfType(
    [React.PropTypes.string, React.PropTypes.route]
  ).isRequired,
};

export default NavTab;
