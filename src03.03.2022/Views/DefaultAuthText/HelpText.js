import React from 'react';
import Text from '../../components/Text';
import style from './helpText.module.scss';

const HelpText = ({ children }) => {
  return <p className={style['wrapper']}>{children}</p>;
};
export default React.memo(HelpText);
