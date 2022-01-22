import React from 'react';
import { GxButton, GxIcon } from '@garpix/garpix-web-components-react';
import Text from '../../../components/Text';
import { color } from '../../../images';
import classNames from 'classnames';
import style from '../styles/index.module.scss';

const defaultItem = [1, 2, 3, 4, 5, 6];
const ColorsItems = ({ items = [], selectedColor, selectColorHandle }) => {

  return (
    <div className={style['prodpage-colors']}>
      <p className={style['prodpage-colors__name']}>
        <>
          <span>
            <Text text="color" />: &nbsp;
          </span>
          {selectedColor ? selectedColor.title : 'Выберите цвет'}
        </>
      </p>
      <ul className={style['prodpage-colors__items']}>
        {items.length === 0
          ? defaultItem.map((el, i) => {
              return (
                <li key={i} className={style['prodpage-colors__item']}>
                  <GxButton
                    disabled={'disabled'}
                    key={el.id}
                    className={classNames({
                      [style['prodpage-colors__btn']]: true,
                      sceleton: true,
                    })}
                    variant="text"
                    style={{ backgroundColor: 'gray', borderRadius: '1px' }}
                  ></GxButton>
                </li>
              );
            })
          : null}
        {items.map((el) => {
          return (
            <li key={el.id} className={style['prodpage-colors__item']}>
              <GxButton
                key={el.id}
                className={classNames({
                  [style['prodpage-colors__btn']]: true,
                  [style['active']]: (selectedColor && selectedColor.id === el.id) || el.selected,
                })}
                onClick={() => selectColorHandle(el)}
                variant="text"
                style={{ backgroundColor: el.color, borderRadius: '1px' }}
              ></GxButton>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default React.memo(ColorsItems);
