import React from 'react';
import { shoppingIcon } from '../../images';
import style from './styles/index.module.scss';
import Button from '../Button';

const LinkToCatalog = ({ children, to = '#' }) => {
  return (
    <Button
      gxVariant={'link'}
      variant={'catalog-link'}
      className={style['link-catalog']}
      href={to}
      iconLeft={shoppingIcon}
    >
      {children}
    </Button>
  );
};

export default React.memo(LinkToCatalog);
