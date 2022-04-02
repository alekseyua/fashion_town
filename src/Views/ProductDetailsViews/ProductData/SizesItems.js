import React, { useEffect, useState } from 'react';
import { GxButton, GxIcon } from '@garpix/garpix-web-components-react';
import { fire, hanger } from '../../../images';
import classNames from 'classnames';
import style from '../styles/index.module.scss';
import { ROLE } from '../../../const';
import { useStoreon } from 'storeon/react';


const defaultSizes = [1, 2, 3, 4, 5, 6];
const SizesItems = ({
  modalView, 
  in_stock_count,
  sizes,
  openTableModal,
  product_rc,
  collections, //boolen
  selectedCollection,
  listCollectionsHook = [],
  sizesn, 
  setSizesn,
  heandlerPopup,
  setIsOpen,
  currenssies,
  pricesHook,
}) => {
  const [selectedSizeList, setselectedSizeList] = useState(false);
  const { userPage } = useStoreon('userPage')
  const { role } = userPage.profile;
  const [ gropsSizes, setGropsSizes ] = useState([]);
  const [clickDelay, setClickDelay] = useState(null)
  useEffect(() => {
    let params = []
    params = sizesn.id? sizes.map(el=>el.id === sizesn.id?{...el, ...sizesn} : {...el, selected : false}) : sizes
    setGropsSizes(params)
    setClickDelay('')
    const delayClk = setTimeout(() => {
      setClickDelay(null)
    }, 700);
    return ()=>clearTimeout(delayClk)
  }, [sizes.length, sizesn.id])
  const sceletSizesRender = () => {
    return defaultSizes.map((el) => {
      return (
        <li key={el} className={style['prodpage-sizes__item']}>
          <GxButton
            disabled={'disabled'}
            className={classNames({
              [style['prodpage-sizes__size-button']]: true,
              sceleton: true,
            })}
            ></GxButton>
        </li>
      );
    });
  };
  const renderSizesSky = (data) => {
    return (
      <ul
        className={classNames({
          [style['prodpage-sizes__items']]: true,
          [style['prodpage-sizes__items-modal']]: modalView,
        })}
      >
        {data.length === 0 ? sceletSizesRender() : null}
        {data.map((el) => {
          return (
            <li key={el.id} className={style['prodpage-sizes__item']}>
              <GxButton
                disabled={clickDelay}
                onClick={() => setSizesn({...el, selected: true})}
                className={classNames({
                  [style['prodpage-sizes__size-button']]: true,
                  [style['active']]: el.selected,
                })}
              >
                {el.title}
              </GxButton>
            </li>
          );
        })}
      </ul>
    );
  };
  const renderListSizes = (data) => {
    return (
      <ul
        className={classNames({
          [style['prodpage-sizes__items']]: true,
          [style['prodpage-sizes__items-modal']]: modalView,
        })}
      >
        {data.length === 0 ? sceletSizesRender() : null}
        {data.items.map((el, i) => {
          return (
            <li key={el.size.uuid} className={style['prodpage-sizes__item']}>
              <GxButton
                disabled={el.redeemed}
                onClick={() => {
                  setselectedSizeList(el.size.uuid);
                  selectSizesHandle(el.size);
                }}
                className={classNames({
                  [style['prodpage-sizes__size-button']]: true,
                  [style['active']]: selectedSizeList === el.size.uuid,
                })}
              >
                {el.size.title}
              </GxButton>
            </li>
          );
        })}
      </ul>
    );
  };
  const renderGridSizes = (data) => {
    return (
      <React.Fragment>
        {data.items.map((ulEl, i) => {
          return (
            <ul
              key={i}
              className={classNames({
                [style['prodpage-sizes__items']]: true,
                [style['prodpage-sizes__items-modal']]: modalView,
              })}
            >
              {ulEl.map((liEl) => {
                return (
                  <li key={liEl.size.uuid} className={style['prodpage-sizes__item']}>
                    <GxButton
                      disabled={liEl.redeemed}
                      onClick={() => {
                        setselectedSizeList(liEl.size.uuid);
                        selectSizesHandle(liEl.size);
                      }}
                      className={classNames({
                        [style['prodpage-sizes__size-button']]: true,
                        [style['active']]: selectedSizeList === liEl.size.uuid,
                      })}
                    >
                      {liEl.size.title}
                    </GxButton>
                  </li>
                );
              })}
            </ul>
          );
        })}
      </React.Fragment>
    );
  };
  const loderForCollection = () => {
    return (
      <ul
        className={classNames({
          [style['prodpage-sizes__items']]: true,
          [style['prodpage-sizes__items-modal']]: modalView,
        })}
      >
        {sceletSizesRender()}
      </ul>
    );
  };
  const renderSizesFromCollectionOrSky = () => {
    // скорей всего модальное окно
    if (modalView) {
      return renderSizesSky(gropsSizes);
    }
    // с колекциями будим разбиратся данные не прокидывал но объявил
    if (selectedCollection) {
      if (!selectedCollection.is_grid) {
        return renderListSizes(selectedCollection);
      } else {
        return renderGridSizes(selectedCollection);
      }
    } else {
      if (!selectedCollection && collections.length) {
        return loderForCollection();
      }
      // не колекция 
      return renderSizesSky(gropsSizes);
    }
  };
  return (
    <div className={style['prodpage-sizes']}>
      {!modalView ? (
        <p className={style['prodpage-sizes__title']}>
          <GxButton
            onClick={openTableModal}
            className={style['prodpage-sizes__btn']}
            variant="text"
          >
            <GxIcon
              slot="icon-left"
              src={hanger}
              className={style['prodpage-sizes__icon']}
            ></GxIcon>
            Таблица размеров
          </GxButton>
        </p>
      ) : null}

            {/* добавляем кнопку для добавления сбора если сбор > 0 */}
      {(role === ROLE.DROPSHIPPER || role === ROLE.WHOLESALE)  ? (
        <React.Fragment>
          {/* Условие покупки */}
          <div className={style['prodpage-range__box']}>
            <p className={style['prodpage-range__title']}>общие условия выкупа*:</p>
            <p className={style['prodpage-range__condition']}>{product_rc}
            {
              role === ROLE.WHOLESALE && collections ?
              <div className={style['prodpage-range__condition-price']}>
               Стоимость ряда: {(pricesHook.price * sizes.length).toFixed(2)} {currenssies}
              </div>
              :null
            }
            </p>
            <div className={style['prodpage-range__wrap']}>
            {role === ROLE.DROPSHIPPER?
              <>
                «Данная модель реализуется производителем только размерным рядом. Для того, чтобы участвовать в сборе, необходимо выбрать нужный размер в одном из открытых сборов, добавить в корзину. Занятые размеры окрашены темно-серым цветом.
                Единовременно положить в корзину можно только одну единицу товара. Выбранный размер будет зарезервирован за Вами <span>после подтверждения оплаты</span>.
                Сбор завершён (и товары выкупаются на фирме) тогда, когда будут  заняты все размеры из ряда- об этом Вы получите уведомление в личном кабинете.»
              </>
              :role === ROLE.WHOLESALE?
              <>
                «Данная модель реализуется производителем  размерным рядом. В корзину положить можно только <span>целый размерный ряд</span>.»
              </>
              :null
              }
            </div>

          </div>
            {/* кнопка  Иформация по открытым сборам*/}
          {collections && listCollectionsHook.length !== 0 ?
          (<div className={style['prodpage-range__wrap-mb']}>
            <div className={style['prodpage-range__wrap-btn']}>
              <GxButton
                  onClick={()=>{
                    setIsOpen(true)
                    heandlerPopup() 
                  }}
                className={style['prodpage-range__button']}
              >
                Иформация по открытым сборам 
              </GxButton>
            </div>
          </div>
          ):null
}
        </React.Fragment>
      ) : 
          <React.Fragment>
          {/* не показываем кнопку для добавления сбора если сбор 0 */}

            <div className={style['prodpage-range__box']}>
              {/* <p className={style['prodpage-range__title']}>Условие покупки:</p>
              <p className={style['prodpage-range__condition']}>{product_rc}</p> */}
              <div className={style['prodpage-range__wrap']}>
              </div>
            </div>
            <div className={style['add-collection']}>
            </div>
          </React.Fragment>
      }
      {renderSizesFromCollectionOrSky()}
      {in_stock_count ? (
        <p className={style['prodpage-sizes__remainder']}>
          <GxIcon className={style['prodpage-sizes__remainder-btn']} src={fire}></GxIcon>
          Осталось:{in_stock_count} ед.
        </p>
      ) : null}

    </div>
  );
};

export default React.memo(SizesItems);
