import React, { useState } from 'react';
import { GxButton, GxTooltip, GxIcon, GxModal } from '@garpix/garpix-web-components-react';
import { fire, hanger } from '../../../images';
import classNames from 'classnames';
import style from '../styles/index.module.scss';
import MainFiltersCustom from '../../MainFiltersCustom';
import { ROLE } from '../../../const';
import { v4 } from 'uuid';

const defaultSizes = [1, 2, 3, 4, 5, 6];
const SizesItems = ({
  modalView,
  in_stock_count,
  sizes,
  openTableModal,
  selectedSize,
  selectedColor,
  selectSizesHandle,
  role_configuration,
  product_rc,
  collections = [],
  selectСollection,
  selectedCollection,
  addCollectionHandler,
  is_collection,
  setStatusSeletedItem,
  profile,
}) => {
  const [selectedSizeList, setselectedSizeList] = useState(false);
  const { role = { number: 2 } } = role_configuration;
  const { number } = role;

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
                /*  disabled={!el.enabled} */
                onClick={() => selectSizesHandle(el)}
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
    if (modalView) {
      return renderSizesSky(sizes);
    }
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
      return renderSizesSky(sizes);
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
            {/* добавляем кнопку для добавления сбора если сбор 0 */}
      {number === ROLE.DROPSHIPPER && !collections.length && is_collection ? (
          <React.Fragment>
            <div className={style['add-collection']}>
            <GxButton
                    onClick={() => addCollectionHandler(selectedSize, selectedColor)}
                    className={style['prodpage-range__button']}
                  >
                    +
            </GxButton>
            
            {!collections.length
            ?<div className={style['hand-arrow']}>👈🏻<span>Кнопка сбора "Размерный ряд"</span></div>
            :null}

            </div>
          </React.Fragment>
      )
      :(number === ROLE.DROPSHIPPER && collections.length ? (
        <React.Fragment>
          <div className={style['prodpage-range__box']}>
            <p className={style['prodpage-range__title']}>Условие покупки:</p>
            <p className={style['prodpage-range__condition']}>{product_rc}</p>
            <div className={style['prodpage-range__wrap']}>
              {/* <p className={style['prodpage-range__text']}>Размеры: s, m, l, xl </p>
              <p className={style['prodpage-range__text']}>Стоимость ряда: 140 ZL </p> */}
            </div>
          </div>
          <div className={style['prodpage-range__wrap-mb']}>
            <div className={style['prodpage-range__wrap-scroll']}>
              <MainFiltersCustom
                selectItem={selectСollection}
                seletedItem={selectedCollection}
                setStatusSeletedItem={setStatusSeletedItem}
                filters={collections.map((el, i) => {
                  return {
                    ...el,
                    title: `Сбор ${i + 1}`,
                    id: el.id,
                  };
                })}
              />
            </div>
            <div className={style['prodpage-range__wrap-btn']}>
              <GxButton
                onClick={() => addCollectionHandler(selectedSize, selectedColor)}
                className={style['prodpage-range__button']}
              >
                +
              </GxButton>
            </div>
          </div>
        </React.Fragment>
      ) : null)
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
