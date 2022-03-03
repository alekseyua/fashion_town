import React from 'react';
import { redWomen } from '../../images';
import Text from '../../components/Text';
import style from './styles/leftSide.module.scss';

const LeftSide = ({ image = redWomen }) => {
  return (
    <div className={style['wrapper']}>
      <img className={style['wrapper__image']} src={image} alt={Text({ text: 'backgroundAuth' })} />
      <div className={style['wrapper__marcket-info']}>
        {/* todo: inner rich text */}
        <div className={style['wrapper__upper-title']}>
          ТОРГОВАЯ БИЗНЕС-ПЛАТФОРМА для Розничных, оптовых покупателей и дропшипперов
        </div>
        {/* todo: inner rich text */}
        <div className={style['wrapper__midle-title']}>FASHION TOWN</div>
        <div className={style['wrapper__line']}></div>
        {/* todo: inner rich text */}
        <div className={style['wrapper__lower-title']}>
          Для тех, кто хочет не только покупать, но и зарабатывать!
        </div>
      </div>
    </div>
  );
};
export default React.memo(LeftSide);
