import React from 'react';
import style from '../index.module.scss';
import RowBlock from './RowBlock';
import TopBlock from './TopBlock';
import ActivatedPromoCode from './ActivatedPromoCode';

const Block = ({
  discount,
  is_active,
  id,
  title,
  usage_count,
  deactivateHandleClick,
  changeHandleClick,
  deleteHandleClick,
}) => {
  //   discount: "12.0"
  // id: 1
  // is_active: true
  // title: "qweqweqweqw"
  // usage_count: 0
  return (
    <div className={style['cabinet-promocode-block']}>
      <TopBlock
        title={title}
        is_active={is_active}
        deactivateHandleClick={deactivateHandleClick}
        changeHandleClick={changeHandleClick}
        deleteHandleClick={deleteHandleClick}
      />
      <RowBlock
        nameOfStyle={'cabinet-promocode-block__discount'}
        parameter={'Скидка: '}
        value={`${discount} %`}
      />
      <RowBlock
        nameOfStyle={'cabinet-promocode-block__counter'}
        parameter={'Применение промокода - '}
        value={usage_count}
        lastParameter={' раз'}
      />
      <ActivatedPromoCode deactivateHandleClick={deactivateHandleClick} active={is_active} />
    </div>
  );
};
export default React.memo(Block);
