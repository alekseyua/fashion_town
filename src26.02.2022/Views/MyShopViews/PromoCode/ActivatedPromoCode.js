import React from 'react';
import style from '../index.module.scss';
import { GxButton } from '@garpix/garpix-web-components-react';

const ActivatedPromoCode = ({ deactivateHandleClick, active = false }) => {
  return (
    <div className={style['cabinet-promocode-block__bottom']}>
      {/* Если промокод не активирован - показать кнопку, иначе блок */}
      {active ? (
        <div className="cabinet-promocode-block__activated">Активирован</div>
      ) : (
        <GxButton
          onClick={deactivateHandleClick}
          variant="text"
          size="sm"
          className={style['cabinet-promocode-block__btn']}
        >
          Активировать
        </GxButton>
      )}
    </div>
  );
};
export default React.memo(ActivatedPromoCode);
