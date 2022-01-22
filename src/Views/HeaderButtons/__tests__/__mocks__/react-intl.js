import React from 'react';
const Intl = jest.genMockFromModule('react-intl'); // <-- This is the change

const intl = {
  formatMessage: ({defaultMessage}) => defaultMessage
};

Intl.injectIntl = (Node) => (props) => <Node {...props} intl={intl}/>;

module.exports = Intl;