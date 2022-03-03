import React from 'react';
import { GxSpinner } from '@garpix/garpix-web-components-react';
import style from './spinner.module.scss';

const Spinner = ({ slot }) => {
  return (
    <div className={style["wrapper"]} slot={slot}>
      <GxSpinner className={style["spinner"]}/>
    </div>
  );
};
export default React.memo(Spinner);
