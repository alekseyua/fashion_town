import React from 'react';
import Line from './Line';
import TopBlockWrapper from './TopBlockWrapper';
import TopLine from './TopLine';
import style from '../styles/style.module.scss';

const TopBlock = ({ profit, ordersCount, proceeds, cost, currenssies }) => {
  return (
    <div className="cabinet_market_topblock">
      <TopBlockWrapper>
        <TopLine>
          <div className={style['cabinet_market_topblock__profit']}>Прибыль:</div>
          <div className={style['cabinet_market_topblock__profit_count']}>
            {profit ? profit : 0} {currenssies}
          </div>
        </TopLine>
        <Line>
          <div className={style['cabinet_market_topblock__orders']}>Всего заказов:</div>
          <div className={style['cabinet_market_topblock__orders_count']}>{ordersCount}</div>
        </Line>
        <Line>
          <div className={style['cabinet_market_topblock__proceeds']}>Выручка:</div>
          <div className={style['cabinet_market_topblock__proceeds_count']}>
            {proceeds ? proceeds : 0} {currenssies}
          </div>
        </Line>
        <Line>
          <div className={style['cabinet_market_topblock__cost']}>Себестоимость:</div>
          <div className={style['cabinet_market_topblock__cost_count']}>
            {cost ? cost : 0} {currenssies}
          </div>
        </Line>
      </TopBlockWrapper>
    </div>
  );
};

export default React.memo(TopBlock);
