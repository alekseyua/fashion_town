import React from 'react';
import Text from '../../components/Text';
import classNames from 'classnames';
import style from './helpText.module.scss';

const HelpText = ({ addClass, children}) => {
  const customClassName = classNames({
    [style['wrapper']]: true,
    [style[addClass]]: !!addClass,
  });
  return <p className={customClassName}>{children}</p>;
};
export default React.memo(HelpText);
