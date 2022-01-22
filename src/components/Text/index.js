import React from 'react';
import { useIntl } from 'react-intl';

const Text = ({ text }) => {
  const { formatMessage } = useIntl();
  return formatMessage({ id: text });
};

export default Text;
