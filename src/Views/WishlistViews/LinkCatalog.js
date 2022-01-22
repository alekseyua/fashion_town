import React from 'react';
import { shoppingIcon } from '../../images';
import Button from '../Button';

const LinkCatalog = ({ to = '#', children }) => {
  return (
    <Button gxVariant={'link'} variant={'catalog-link'} href={to} iconLeft={shoppingIcon}>
      {children}
    </Button>
  );
};
export default React.memo(LinkCatalog);
