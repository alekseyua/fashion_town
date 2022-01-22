import React from 'react';
import { cartIcon } from '../../images';
import style from './styles/index.module.scss';
import Button from '../Button';

const ButtonToCatalog = ({ children, to = '#' }) => {
  return (
    <Button
      gxVariant={'link'}
      variant={'cabinet_default'}
      className={style["cabinet-inforeview__btn"]}
      href={to}
      iconLeft={cartIcon}
    >
      {children}
    </Button>
  );
};

export default React.memo(ButtonToCatalog);
