import React from 'react';
import CheckBox from '../CheckBox';
import style from './styles/index.module.scss';

const Card = ({ thumb, selected, onSelectedPhoto, id }) => {
  return (
    <div className={style['export__card']}>
      <img src={thumb} alt="Photo" className={style['export__card_image']} />
      <div className={style['export__card_checkbox']}>
        <CheckBox
          checked={selected}
          onGx-change={(e) => {
            onSelectedPhoto(id, e.target.checked);
          }}
        />
      </div>
    </div>
  );
};

export default React.memo(Card);
