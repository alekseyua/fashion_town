import React from 'react';
import style from './styles/index.module.scss';

const TrackDetails = ({ nubmerTrack = '80110156803221' }) => {
  return (
    <div className={style['cabinet_orders_details__track']}>
      Трек-номер для отслеживания:
      <span className={style['cabinet_orders_details__number']}>{nubmerTrack}</span>
    </div>
  );
};

export default React.memo(TrackDetails);
