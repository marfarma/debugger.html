"use strict";

const React = require("react");
const { DOM: dom, PropTypes } = React;

const { div } = dom;
const Isvg = React.createFactory(require("react-inlinesvg"));

require("./Accordion.css");

const Accordion = React.createClass({
  propTypes: {
    items: PropTypes.array
  },

  getInitialState: function() {
    return { opened: this.props.items.map(item => item.opened),
             created: [] };
  },

  handleHeaderClick: function(i) {
    const opened = [...this.state.opened];
    const created = [...this.state.created];
    const item = this.props.items[i];

    opened[i] = !opened[i];
    created[i] = true;

    if (opened[i] && item.onOpened) {
      item.onOpened();
    }

    this.setState({ opened, created });
  },

  render: function() {
    const { opened, created } = this.state;
    return div(
      { className: "accordion" },
      this.props.items.map((item, i) => {
        return div(
          { className: opened[i] ? "opened" : "",
            key: i },
          div({ className: "_header",
                onClick: () => this.handleHeaderClick(i) },
                Isvg({ src: "js/components/images/arrow.svg" }),
                item.header),

          (created[i] || opened[i]) ?
            div(
              { className: "_content",
                  style: { display: opened[i] ? "block" : "none" }
              },
              React.createElement(item.component, item.componentProps || {})
            ) :
            null
        );
      })
    );
  }
});

module.exports = Accordion;
