import React from 'react';
import style from './styles/index.module.scss';

const HistoryHead = ({}) => {
  return (
    <div className={style['cabinet_history__top']}>
      <p className={style['cabinet_history__top_head']}>Отзыв</p>
      <p className={style['cabinet_history__top_head']}>Дата публикации и баллы</p>
      <p className={style['cabinet_history__top_head']}>Статус отзыва</p>
    </div>
  );
};

export default React.memo(HistoryHead);
