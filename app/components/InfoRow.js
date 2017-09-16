import _ from 'lodash';
import React from 'react';

function getInfoRow(item) {
  if (item.name) {
    return <InfoRow {...item} />;
  }
}

function getInitialState(props) {
  const childInfoRows = _.filter(props.items.map(getInfoRow));
  return {
    childInfoRows,
    expanded: false,
    expandable: Boolean(childInfoRows.length),
  };
}

class InfoRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = getInitialState(props);
    this.handleExpandClick = this.handleExpandClick.bind(this);
  }

  handleExpandClick() {
    this.setState({
      expanded: !this.state.expanded,
    });
  }

  getChildInfoRows() {
    if (!this.state.expanded) {
      return [];
    }
    return this.state.childInfoRows;
  }

  getExpandButton() {
    if (this.state.expandable) {
      let content;
      if (this.state.expanded) {
        content = <i className="fa fa-lg fa-chevron-up" />;
      } else {
        content = <i className="fa fa-lg fa-chevron-down" />;
      }
      return (
        <a className="button-expand" onClick={this.handleExpandClick}>
          {content}
        </a>
      );
    }
    return [];
  }

  getInfoBox() {
    if (this.props.boxContent) {
      return <div className="info-box">{this.props.boxContent}</div>;
    }
    return [];
  }

  getInfoName() {
    const infoNameClassName = this.props.boxContent ? 'info-name with-infobox' : 'info-name';
    const element = <div className={infoNameClassName}>{this.props.name}</div>;
    return element;
  }

  render() {
    let liClassName = 'info-row ';
    if (this.props.className) {
      liClassName += this.props.className;
    }
    if (this.state.expandable) {
      liClassName += ' expandable';
    }
    if (this.props.highlight) {
      liClassName += ' highlighted';
    }

    return (
      <div>
        <li className={liClassName}>
          {this.getExpandButton()}
          {this.getInfoBox()}
          {this.getInfoName()}
        </li>
        <div>
          {this.getChildInfoRows()}
        </div>
      </div>
    );
  }
}

InfoRow.propTypes = {
  boxContent: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.array,
  ]),
  className: React.PropTypes.string,
  highlight: React.PropTypes.bool,
  items: React.PropTypes.array,
  linkParams: React.PropTypes.object,
  linkTo: React.PropTypes.string,
  name: React.PropTypes.oneOfType([
    React.PropTypes.string.isRequired,
    React.PropTypes.array.isRequired,
  ]),
};

InfoRow.defaultProps = {
  items: [],
};

export default InfoRow;
