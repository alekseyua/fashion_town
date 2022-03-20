import React, { useState } from 'react';
import style from './styles/index.module.scss';
import { statusCancel } from '../../images';
import { GxIcon } from '@garpix/garpix-web-components-react';
import classNames from 'classnames';

const WarningBlock = ({ textWarning = 'warning', variant = "wrapper" }) => {
  // console.log('textWarning++++++', textWarning.props.dangerouslySetInnerHTML.__html)
  const [spolerActive, setSpolerActive] = useState(false)
  const heandleClickSpoler = () => {
    setSpolerActive(!spolerActive)
  }

  const classContext = classNames({
    [style['wrapper__text-content']]: spolerActive,
    [style['wrapper__text-content--disable']]: !spolerActive,
  })
  const classCross = classNames({
    [style['catalog-wrapper']]: !spolerActive,
    [style['catalog-wrapper--active']]: spolerActive,
  })
  return (
    <div 
      className={classCross}
      onClick={heandleClickSpoler}
    >
      <div className={style["arrow-8"]}></div>
      <GxIcon className={style['wrapper__icon']} src={statusCancel} alt={'cansel'} />
      {/* <span className={style['wrapper__text']}>{textWarning}</span> */}
      <span 
        className={style['wrapper__text']}
      >

      <span 
          className={style['wrapper__text-btn']}
       
      > 

      Товары в Каталоге выкупаются <strong strong >&quot; Под заказ &quot; </strong>, кроме раздела <strong>&quot; В наличии&quot; </strong>
      (с этого раздела товары сразу готовы к отправке Заказчику).В остальных случаях товар </span>
      
        <span className={style['wrapper__text-ellipsis']}>...</span>

        <span className={classContext}>не всегда в наличии на складе производителей или поставщиков.&nbsp; Некоторые модели необходимо <strong>ожидать </strong>
           в течении нескольких дней или даже недель - Вас будет <strong>информировать</strong> менеджер в комментариях к заказаному товару.
          У Вас будет <strong>возможность</strong> вести переписку, уточнять детали и сроки.&nbsp; С помощью нашего&nbsp; сайта
          <strong>Вы получаете доступ к огромному выбору товаров Европы и Импорта, редким и эксклюзивным коллекциям одежды, а также возможность развития и расширения бизнеса.</strong>
          <p>Просим принять во внимание, что ТБП Fashion Town не является производителем или поставщиком одежды,
          а всего лишь оказывает услугу по выкупу товара.Все фото в Каталоге <strong>не являются собственностью</strong>
          Компании Fashion Town,&nbsp; предоставляются производителями,&nbsp; поставщиками, либо принадлежат польским бутикам,&nbsp; включая описание к
          товарам.&nbsp; Цветовой оттенок товара может отличаться от представленного на фотографии, в том числе это зависит&nbsp; от настроек устройства, с которого
          просматривается Каталог.&nbsp; </p>
        </span>
      </span>
    </div>
  );
};

export default React.memo(WarningBlock);
