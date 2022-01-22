import React from 'react';
import { GxButton } from '@garpix/garpix-web-components-react';
import style from '../index.module.scss';

const Catalog = ({ text, onClick = () => {} }) => {
  return (
    <GxButton full onClick={onClick} className={style['cabinet_market__catlink']}>
      {text}
    </GxButton>
  );
};

export default React.memo(Catalog);
