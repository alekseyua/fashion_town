import React from 'react';
import { GxIcon } from '@garpix/garpix-web-components-react';
import classNames from 'classnames';
import style from '../styles/index.module.scss';

const Labels = ({ items = [] }) => {
  return (
    <ul className={style['prodpage-labels']}>
      {items.map((el, i) => {
        if(!el.isVisible) return null
        return (
          <li
            key={i}
            className={classNames({
              [style['prodpage-labels__item']]: true,
              [style[el.modifyClass]]: el.modifyClass,
            })}
          >
            <GxIcon src={el.icon}></GxIcon>
          </li>
        );
      })}
    </ul>
  );
};

export default React.memo(Labels);
